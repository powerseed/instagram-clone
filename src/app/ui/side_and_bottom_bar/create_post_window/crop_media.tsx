import { useEffect } from "react"

type CropMediaProps = {
    mediaUrl: string,
    goPreviousStep: () => void,
    goNextStep: () => void,
}

export default function CropMedia(props: CropMediaProps) {
    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className="flex justify-between items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]">
                <div className="cursor-pointer" onClick={props.goPreviousStep}>
                    <img src="/side_and_bottom_bar/create_post_window/left-arrow.svg" alt="Previous" width={28} height={28} />
                </div>

                <div>
                    Crop
                </div>

                <div className="cursor-pointer text-sky-500 text-[14px]" onClick={props.goNextStep}>
                    Next
                </div>
            </div>

            <div className="grow flex justify-center items-center">
                <img src={props.mediaUrl} alt="" />
            </div>
        </div>
    )
}