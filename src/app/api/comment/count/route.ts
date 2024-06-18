import { getCommentCount } from "@/lib/mongodb/comment/count";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const postId = await req.nextUrl.searchParams.get('postId');

        if (!postId) {
            throw new Error('Post id is missing when fetch comment count. ')
        }

        const { commentCount, error } = await getCommentCount(postId);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ commentCount })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}