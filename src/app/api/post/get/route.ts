import { getPosts } from "@/lib/mongodb/post/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await req.nextUrl.searchParams.get('userId');

        if (!userId) {
            throw new Error('User id is missing when fetch posts. ')
        }

        const { posts, error } = await getPosts([userId]);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ posts })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}