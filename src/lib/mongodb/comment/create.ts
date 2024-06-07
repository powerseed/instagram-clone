import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from "../connect";

let client;
let db: Db | undefined;
let collection: Collection | undefined;

async function init() {
    if (db) {
        return;
    }

    try {
        client = await clientPromise;
        db = await client.db();
        collection = db.collection('comment');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function createComment(userId: string, postId: string, createdOn: string, text: string) {
    try {
        if (collection === undefined) {
            await init();
        }

        const { insertedId } = await collection!.insertOne(
            {
                userId,
                postId: new ObjectId(postId),
                createdOn,
                text
            }
        )

        return { commentId: insertedId };
    } catch (error) {
        return {
            error: 'Failed to create comment. '
        }
    }
}