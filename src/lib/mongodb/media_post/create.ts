import { Collection, Db } from "mongodb";
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
        collection = db.collection('media_post');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function createMediaPost(postId: string, mediaKey: string) {
    try {
        if (collection === undefined) {
            await init();
        }

        const { insertedId } = await collection!.insertOne(
            {
                postId,
                mediaKey
            }
        )

        return { postId: insertedId };
    } catch (error) {
        return {
            error: 'Failed to create media_post. '
        }
    }
}