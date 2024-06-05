import { Collection, Db } from "mongodb";
import clientPromise from "../connect";
import { Post } from "@/lib/types";

let client;
let db: Db | undefined;
let postCollection: Collection | undefined;

async function init() {
    if (db) {
        return;
    }

    try {
        client = await clientPromise;
        db = await client.db();
        postCollection = db.collection('post');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function getPosts(userIds: string[]) {
    try {
        if (postCollection === undefined) {
            await init();
        }

        const result = await postCollection!
            .aggregate([
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userId',
                        foreignField: 'userId',
                        as: 'post_user'
                    }
                },
                {
                    $lookup: {
                        from: 'media_post',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'post_media'
                    }
                },
                {
                    $lookup: {
                        from: 'comment',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'post_comment'
                    }
                },
                {
                    $match: {
                        userId: {
                            $in: userIds
                        }
                    }
                }
            ])
            .limit(10)
            .map((document) => {
                const post: Post = {
                    avatarUrl: document.post_user[0].avatarUrl,
                    username: document.post_user[0].username,
                    isVerified: false,
                    created_on: new Date(document.createdOn),
                    text: document.text,
                    mediaUrls: [],
                    likedBy: undefined,
                    commentNumber: 0
                }

                document.post_media.forEach((post_media: any) => {
                    post.mediaUrls.push(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${post_media.mediaKey}`);
                });

                post.commentNumber = document.post_comment.length;

                return post;
            })
            .toArray();

        return { posts: result };
    } catch (error) {
        return {
            error: 'Failed to fetch posts. '
        }
    }
}