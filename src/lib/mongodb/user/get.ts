import { Collection, Db } from "mongodb";
import clientPromise from "../connect";
import { Following } from "@/lib/types";

let client;
let db: Db | undefined;
let userCollection: Collection | undefined;

async function init() {
    if (db) {
        return;
    }

    try {
        client = await clientPromise;
        db = await client.db();
        userCollection = db.collection('user');
    }
    catch (error) {
        throw new Error('Failed to connect to database. ')
    }
}

export async function getUsers(userId: string) {
    try {
        if (userCollection === undefined) {
            await init();
        }

        const result = await userCollection!
            .find(
                {
                    userId: {
                        $ne: userId
                    }
                }
            )
            .limit(10)
            .map((document) => {
                const user: Following = {
                    id: document.userId,
                    avatarUrl: document.avatarUrl,
                    username: document.username,
                };

                return user;
            })
            .toArray();

        return { users: result };
    } catch (error) {
        return {
            error: 'Failed to fetch users. '
        }
    }
}