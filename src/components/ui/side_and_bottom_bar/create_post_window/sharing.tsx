type SharingProps = {
    headerHeightInPx: number,
    mainHeightInPx: number,
}

export default function Sharing(props: SharingProps) {
    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className={`flex justify-center items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]`} style={{ height: props.headerHeightInPx + 'px' }}>
                Sharing
            </div>

            <div className='flex justify-center items-center' style={{ height: props.mainHeightInPx + 'px' }}>
                <div>
                    <img src="/create_post/sharing.gif" alt="sharing" width={96} height={96} />
                </div>
            </div>
        </div>
    )
}