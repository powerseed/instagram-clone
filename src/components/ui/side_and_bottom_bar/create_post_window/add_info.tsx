import { useState } from "react";

type AddInfoProps = {
    mediaUrl: string,
    goPreviousStep: () => void,
    closeThisWindow: () => void
}

export default function AddInfo(props: AddInfoProps) {
    const charLimit = 2200;
    let [charCount, setCharCount] = useState<number>(0);

    function handleShareClick() {
        props.closeThisWindow();
    }

    function handleTextareaInput(event: React.FormEvent<HTMLTextAreaElement>) {
        const target = event.currentTarget!;
        setCharCount(target.value.length);
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
                    <img className="h-full rounded-bl-2xl" src={props.mediaUrl} alt="Cropped Image" />
                </div>

                <div className="w-[340px] flex flex-col">
                    <div className="flex px-4 py-3 items-center space-x-2">
                        <img src="/profile.jpg" alt="" width={36} height={36} />

                        <div className="font-[500]">
                            walterwhite
                        </div>
                    </div>

                    <div className="grow px-4">
                        <textarea className="w-full h-full resize-none outline-none placeholder:text-gray-300 placeholder:text-[15px]"
                            placeholder="Write a caption..."
                            maxLength={charLimit}
                            onInput={handleTextareaInput}
                        />
                    </div>

                    <div className="text-[12px] text-gray-400 flex justify-end px-4 py-2">
                        {charCount}/{charLimit}
                    </div>
                </div>
            </div>
        </div>
    )
}