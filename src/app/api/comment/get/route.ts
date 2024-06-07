import { getComments } from "@/lib/mongodb/comment/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const postId = await req.nextUrl.searchParams.get('postId');

        if (!postId) {
            throw new Error('Post id is missing when fetch comments. ')
        }

        const { comments, error } = await getComments(postId);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ comments })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}