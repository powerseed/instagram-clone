import { createPost } from "@/lib/mongodb/post/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { error } = await createPost(body.text);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({});
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}