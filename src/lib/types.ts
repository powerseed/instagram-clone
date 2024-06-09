export type Post = {
    id: string,
    avatarUrl: string
    username: string
    isVerified: false,
    createdOn: string,
    text: string | undefined,
    mediaUrls: string[],
    likedBy: string | undefined,
    commentNumber: number
}

export type Comment = {
    id: string,
    avatarUrl: string
    username: string
    isVerified: false,
    createdOn: Date,
    text: string,
    likeCount: number,
    replyCount: number
}
