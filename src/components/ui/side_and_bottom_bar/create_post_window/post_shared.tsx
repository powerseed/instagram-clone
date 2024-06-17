type PostSharedProps = {
    headerHeightInPx: number,
    mainHeightInPx: number,
}

export default function PostShared(props: PostSharedProps) {
    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className={`flex justify-center items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]`} style={{ height: props.headerHeightInPx + 'px' }}>
                Post shared
            </div>

            <div className='flex justify-center items-center' style={{ height: props.mainHeightInPx + 'px' }}>
                <div className="flex flex-col items-center space-y-3">
                    <img src="/create_post/post_shared.gif" alt="Post Shared" width={96} height={96} />

                    <div className="text-[20px]">
                        Your post has been shared.
                    </div>
                </div>
            </div>
        </div>
    )
}