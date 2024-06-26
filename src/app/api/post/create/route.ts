import { createPost } from "@/lib/mongodb/post/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { postId, error } = await createPost(body.userId, body.createdOn, body.text, body.mediaUrl);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ postId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}