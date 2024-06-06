import { createComment } from "@/lib/mongodb/comment/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { commentId, error } = await createComment(body.userId, body.postId, body.createdOn, body.text);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ commentId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}