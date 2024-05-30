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
        collection = db.collection('post');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function createPost(text: string) {
    try {
        if (collection === undefined) {
            await init();
        }

        await collection!.insertOne(
            {
                text: text
            }
        )

        return {};
    } catch (error) {
        return {
            error: 'Failed to create post. '
        }
    }
}