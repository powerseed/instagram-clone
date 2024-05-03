import { useState } from "react"

type MediaCardProps = {
    src: string,
    type: 'image' | 'movie',
    comment_number: number
}

export default function MediaCard(props: MediaCardProps) {
    let [isOverlayDisplayed, setIsOverlayDisplayed] = useState(false);

    function handleMouseEnter() {
        setIsOverlayDisplayed(true);
    }

    function handleMouseLeave() {
        setIsOverlayDisplayed(false);
    }

    return (
        <div className="relative w-[calc(50%-0.125rem)] h-[calc(50%-0.125rem)] cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img className="object-cover w-full h-full" src={props.src} alt="" />

            <div className="absolute top-4 right-4">
                <img className="w-[20px] h-[20px]" src={`${props.type === 'image' ? '/explore/image.svg' : '/explore/play.svg'}`} alt="" />
            </div>

            {
                isOverlayDisplayed &&
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30">
                    <div className="flex space-x-1 text-[14px] text-white font-[700]">
                        <div>
                            <img className="w-[22px] h-[22px]" src='/explore/comment.svg' alt="" />
                        </div>

                        <div>
                            {props.comment_number}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}