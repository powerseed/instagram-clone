'use client';
import { MouseEvent, useRef, useState } from "react"
import LikeButton from "../ui/home/media_card/like_button";

type VideoCardProps = {
    video_src: string,
    comment_count: number,
    avatar: string,
    username: string,
    text: string,
    tags: string[],
    notation: string
}

export default function VideoCard(props: VideoCardProps) {
    let [isMuted, setIsMuted] = useState(false);
    let [isPlaying, setIsPlaying] = useState(false);
    let videoRef = useRef<HTMLVideoElement>(null);
    let muteButtonRef = useRef<HTMLDivElement>(null);
    let playButtonRef = useRef<HTMLDivElement>(null);
    let infoSectionRef = useRef<HTMLDivElement>(null);

    function handleMuteClick() {
        setIsMuted(!isMuted);
    }

    function handlePlayClick() {
        setIsPlaying(true);
        videoRef.current?.play();
    }

    function handleOverlayClick(event: MouseEvent) {
        if (muteButtonRef.current?.contains(event.target as Node) ||
            playButtonRef.current?.contains(event.target as Node) ||
            infoSectionRef.current?.contains(event.target as Node)) {
            return;
        }

        if (isPlaying) {
            setIsPlaying(false);
            videoRef.current?.pause();
        }
        else {
            setIsPlaying(true);
            videoRef.current?.play();
        }
    }

    return (
        <div className="flex w-max space-x-6" >
            <div className="relative max-w-[410px] aspect-[0.56] flex items-center bg-black rounded-md">
                <video ref={videoRef} muted={isMuted} loop>
                    <source src={props.video_src} type="video/mp4" />
                </video>

                <div className="absolute top-0 left-0 w-full h-full rounded-md flex flex-col justify-between" onClick={handleOverlayClick}>
                    <div className="flex justify-end mt-3 mr-3">
                        <div ref={muteButtonRef} className="bg-gray-400/30 hover:bg-gray-400/50 rounded-full px-2 py-2 cursor-pointer" onClick={handleMuteClick}>
                            <img src={`${isMuted ? '/reels/volume-on.svg' : '/reels/volume-off.svg'}`} alt="Mute" width={16} height={16} />
                        </div>
                    </div>

                    <div className="flex justify-center h-[70px]">
                        {
                            !isPlaying &&
                            <div ref={playButtonRef} className="w-[70px] rounded-full bg-black/50 flex justify-center items-center cursor-pointer" onClick={handlePlayClick}>
                                <img src='/reels/play.svg' alt="Play" width={24} height={24} />
                            </div>
                        }
                    </div>

                    <div ref={infoSectionRef} className="flex flex-col space-y-4 px-4 py-4 text-white text-[14px]">
                        <div className="flex space-x-3 items-center">
                            <div>
                                <img className="rounded-full" src={props.avatar} alt="" width={32} height={32} />
                            </div>

                            <div className="font-[500]">
                                {props.username}
                            </div>

                            <div className="px-1 py-1 rounded-md font-[500] border-gray-500 border-[1px]">
                                Follow
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <div>
                                {props.text}
                            </div>

                            <div className="flex space-x-1 font-[500]">
                                {props.tags.map((tag) => {
                                    return (
                                        <span>#{tag}</span>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="flex space-x-1">
                            <img src="/reels/music.svg" alt="" width={13} height={13} />

                            <div>
                                {props.username}
                            </div>

                            <div>
                                {props.notation}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-end items-center text-[12px] space-y-6 pb-2">
                <div className="flex flex-col space-y-1 cursor-pointer">
                    <LikeButton />
                    <div>Likes</div>
                </div>

                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                    <div>
                        <img src="/home/comment.svg" alt="comment" width={24} height={24} />
                    </div>

                    <div>
                        {
                            Intl.NumberFormat('en-US', {
                                notation: "compact",
                                maximumFractionDigits: 1
                            }).format(props.comment_count)
                        }
                    </div>
                </div>

                <div className="cursor-pointer">
                    <img src="/home/share-post.svg" alt="" width={24} height={24} />
                </div>

                <div className="cursor-pointer">
                    <img src="/home/save.svg" alt="" width={24} height={24} />
                </div>

                <div className="cursor-pointer">
                    <img src="/home/three-dot-button.svg" alt="" width={24} height={24} />
                </div>

                <div className="cursor-pointer rounded-md border-[1px] border-black">
                    <img className="rounded-md" src={props.avatar} alt="avatar" width={24} height={24} />
                </div>
            </div>
        </div >
    )
}