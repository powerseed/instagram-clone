import { getUsers } from "@/lib/mongodb/user/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await req.nextUrl.searchParams.get('userId');

        if (!userId) {
            throw new Error('User id is missing when fetch users. ')
        }

        const { users, error } = await getUsers(userId);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}