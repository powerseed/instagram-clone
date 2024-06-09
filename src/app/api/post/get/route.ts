import { getPosts } from "@/lib/mongodb/post/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await req.nextUrl.searchParams.get('userId');
        const pageIndex = await req.nextUrl.searchParams.get('pageIndex');
        const pageSize = await req.nextUrl.searchParams.get('pageSize');

        if (!userId) {
            throw new Error('User id is missing when fetch posts. ')
        }
        if (!pageIndex) {
            throw new Error('Page index is missing when fetch posts. ')
        }
        if (!pageSize) {
            throw new Error('Page size is missing when fetch posts. ')
        }

        const { posts, error } = await getPosts([userId], parseInt(pageIndex), parseInt(pageSize));

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ posts })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}