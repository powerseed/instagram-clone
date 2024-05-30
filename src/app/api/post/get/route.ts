import { getPosts } from "@/lib/mongodb/post/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { posts, error } = await getPosts();

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ posts })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}