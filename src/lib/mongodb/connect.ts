import { MongoClient } from "mongodb";

let mongoClient = new MongoClient(process.env.MONGODB_URI as string);
let clientPromise = mongoClient.connect();

export default clientPromise;
