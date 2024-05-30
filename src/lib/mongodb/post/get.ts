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

export async function getPosts() {
    try {
        if (collection === undefined) {
            await init();
        }

        const result = await collection!
            .find({})
            .limit(10)
            .map((post) => {
                return {
                    ...post
                }
            })
            .toArray();

        return { posts: result };
    } catch (error) {
        return { error: 'Failed to fetch posts. ' }
    }
}