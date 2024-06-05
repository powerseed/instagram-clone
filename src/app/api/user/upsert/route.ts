import { upsertUser } from "@/lib/mongodb/user/upsert";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { error } = await upsertUser(body.userId, body.username, body.avatarUrl);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({});
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}