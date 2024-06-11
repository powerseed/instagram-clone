import { getComments } from "@/lib/mongodb/comment/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const postId = await req.nextUrl.searchParams.get('postId');
        const pageIndex = await req.nextUrl.searchParams.get('pageIndex');
        const pageSize = await req.nextUrl.searchParams.get('pageSize');

        if (!postId) {
            throw new Error('Post id is missing when fetch comments. ')
        }
        if (!pageIndex) {
            throw new Error('Page index is missing when fetch comments. ')
        }
        if (!pageSize) {
            throw new Error('Page size is missing when fetch comments. ')
        }

        const { comments, error } = await getComments(postId, parseInt(pageIndex), parseInt(pageSize));

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ comments })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}