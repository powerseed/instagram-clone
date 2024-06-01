import { createMediaPost } from "@/lib/mongodb/media_post/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { postId, error } = await createMediaPost(body.postId, body.mediaKey);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ postId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}