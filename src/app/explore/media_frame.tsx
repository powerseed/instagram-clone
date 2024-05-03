import { useState } from "react"
import MediaCard from "./media_card"

type Media = {
    src: string,
    tag: string,
    comment_number: number,
    type: 'image' | 'movie'
}

type MediaFrameProps = {
    is_flex_reversed: boolean,
    medias: Media[]
}

export default function MediaFrame(props: MediaFrameProps) {
    let [isOverlayDisplayed, setIsOverlayDisplayed] = useState(false);

    function handleMouseEnter() {
        setIsOverlayDisplayed(true);
    }

    function handleMouseLeave() {
        setIsOverlayDisplayed(false);
    }
    
    return (
        <div className={`flex justify-between w-full h-[642px] ${props.is_flex_reversed ? 'flex-row-reverse' : ''}`}>
            <div className={`relative w-[calc(33.3333%-0.125rem)] flex cursor-pointer`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img className="object-cover w-full h-full" src={props.medias[0].src} alt="" />

                <div className="absolute top-4 right-4">
                    <img className="w-[20px] h-[20px]" src={`${props.medias[0].type === 'image' ? '/explore/image.svg' : '/explore/play.svg'}`} alt="" />
                </div>

                {
                    isOverlayDisplayed &&
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30">
                        <div className="flex space-x-1 text-[14px] text-white font-[700]">
                            <div>
                                <img className="w-[22px] h-[22px]" src='/explore/comment.svg' alt="" />
                            </div>

                            <div>
                                {props.medias[0].comment_number}
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className={`w-[calc(66.6666%-0.125rem)] flex flex-wrap place-content-between`}>
                {
                    props.medias.slice(1, props.medias.length).map((media, index) => {
                        return (
                            <MediaCard key={index} src={media.src} type={media.type} comment_number={media.comment_number} />
                        )
                    })
                }
            </div>
        </div>
    )
}