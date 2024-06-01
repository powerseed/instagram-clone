import { uploadMedia } from "@/lib/aws/s3/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const key = formData.get('key') as string;
        const file = formData.get('file') as File;

        const { error } = await uploadMedia(key, file);

        if (error) {
            throw new Error(error)
        }

        return NextResponse.json({});
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}