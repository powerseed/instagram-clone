import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function uploadMedia(key: string, file: File) {
    try {
        let client = new S3Client({
            region: process.env.AWS_REGION as string,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            }
        });

        var arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
            ContentType: file.type,
            Body: buffer,
        });

        await client.send(command);

        return {};
    } catch (error) {
        return {
            error: 'Failed to upload media to AWS S3. '
        }
    }
}