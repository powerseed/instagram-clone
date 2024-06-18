import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "../connect";

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

export async function getCommentCount(postId: string) {
    try {
        if (commentCollection === undefined) {
            await init();
        }

        const result = await commentCollection!
            .countDocuments(
                {
                    postId: {
                        $eq: new ObjectId(postId)
                    }
                }
            );

        return { commentCount: result };
    } catch (error) {
        return {
            error: 'Failed to fetch comment count. '
        }
    }
}