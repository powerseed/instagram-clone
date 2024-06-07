import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "../connect";
import { Comment } from "@/lib/types";

let client;
let db: Db | undefined;
let commentCollection: Collection | undefined;

async function init() {
    if (db) {
        return;
    }

    try {
        client = await clientPromise;
        db = await client.db();
        commentCollection = db.collection('comment');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function getComments(postId: string) {
    try {
        if (commentCollection === undefined) {
            await init();
        }

        const result = await commentCollection!
            .aggregate([
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userId',
                        foreignField: 'userId',
                        pipeline: [
                            {
                                $project: {
                                    avatarUrl: 1,
                                    username: 1
                                }
                            }
                        ],
                        as: 'comment_user'
                    }
                },
                {
                    $match: {
                        postId: {
                            $eq: new ObjectId(postId)
                        }
                    }
                }
            ])
            .limit(10)
            .map((document) => {
                const comment: Comment = {
                    id: document._id,
                    avatarUrl: document.comment_user[0].avatarUrl,
                    username: document.comment_user[0].username,
                    isVerified: false,
                    createdOn: new Date(document.createdOn),
                    text: document.text,
                    likeCount: 0,
                    replyCount: 0
                }

                return comment;
            })
            .toArray();

        return { comments: result };
    } catch (error) {
        return {
            error: 'Failed to fetch comments. '
        }
    }
}