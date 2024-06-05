export type Post = {
    avatarUrl: string
    username: string
    isVerified: false,
    created_on: Date,
    text: string | undefined,
    mediaUrls: string[],
    likedBy: string | undefined,
    commentNumber: number
}