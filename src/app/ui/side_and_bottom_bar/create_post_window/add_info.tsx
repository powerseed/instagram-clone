type AddInfoProps = {
    mediaUrl: string,
    goPreviousStep: () => void,
    closeThisWindow: () => void
}

export default function AddInfo(props: AddInfoProps) {
    function handleShareClick() {
        props.closeThisWindow();
    }

    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className="flex justify-between items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]">
                <div className="cursor-pointer" onClick={props.goPreviousStep}>
                    <img src="/side_and_bottom_bar/create_post_window/left-arrow.svg" alt="Previous" width={28} height={28} />
                </div>

                <div>
                    Create new post
                </div>

                <div className="cursor-pointer text-sky-500 text-[14px]" onClick={handleShareClick}>
                    Share
                </div>
            </div>

            <div className="grow flex">
                <div className="flex justify-center items-center w-[calc(100%-340px)] border-r-[1px]">
                    <img src={props.mediaUrl} alt="" />
                </div>

                <div className="w-[340px]">
                    <div>

                    </div>

                    <div>

                    </div>

                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}