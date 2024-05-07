'use client';
import { MouseEvent, useRef, useState } from "react"
import LikeButton from "../ui/home/media_card/like_button";
import { InView } from "react-intersection-observer";

type VideoCardProps = {
    video_src: string,
    comment_count: number,
    avatar: string,
    username: string,
    text: string,
    tags: string[],
    notation: string,
    isMuted: boolean,
    switchMute: () => void
}

export default function VideoCard(props: VideoCardProps) {
    let videoRef = useRef<HTMLVideoElement>(null);
    let muteButtonRef = useRef<HTMLDivElement>(null);
    let playButtonRef = useRef<HTMLDivElement>(null);
    let infoSectionRef = useRef<HTMLDivElement>(null);

    function handleMuteClick() {
        props.switchMute();
    }

    function handlePlayClick() {
        playVideo();
    }

    function handleOverlayClick(event: MouseEvent) {
        if (muteButtonRef.current?.contains(event.target as Node) ||
            playButtonRef.current?.contains(event.target as Node) ||
            infoSectionRef.current?.contains(event.target as Node)) {
            return;
        }

        if (videoRef.current?.paused) {
            playVideo();
        }
        else {
            pauseVideo();
        }
    }

    function playVideo() {
        playButtonRef.current!.style.scale = '1.2';
        setTimeout(() => {
            playButtonRef.current!.style.scale = '0';
        }, 200)

        videoRef.current?.play();
    }

    function pauseVideo() {
        playButtonRef.current!.style.scale = '1.2';
        setTimeout(() => {
            playButtonRef.current!.style.scale = '1';
        }, 300)

        videoRef.current?.pause();
    }

    function handleIsInViewChange(isInView: boolean) {
        if (isInView) {
            playVideo();
        }
        else {
            pauseVideo()
        }
    }

    return (
        <InView as="div" className="flex space-x-6" threshold={1} onChange={(inView, entry) => handleIsInViewChange(inView)}>
            <div className="relative max-w-[410px] aspect-[0.56] flex items-center bg-black rounded-md" onClick={handleOverlayClick}>
                <video ref={videoRef} muted={props.isMuted} loop>
                    <source src={props.video_src} type="video/mp4" />
                </video>

                <div className="absolute top-2 right-2 flex justify-end mt-3 mr-3">
                    <div ref={muteButtonRef} className="bg-gray-400/30 hover:bg-gray-400/50 rounded-full px-2 py-2 cursor-pointer" onClick={handleMuteClick}>
                        <img src={`${props.isMuted ? '/reels/volume-off.svg' : '/reels/volume-on.svg'}`} alt="Mute" width={16} height={16} />
                    </div>
                </div>

                <div className="absolute left-0 right-0 flex justify-center h-[70px]">
                    <div ref={playButtonRef} className="w-[70px] rounded-full bg-black/50 flex justify-center items-center cursor-pointer transition-all duration-300" onClick={handlePlayClick}>
                        <img src='/reels/play.svg' alt="Play" width={24} height={24} />
                    </div>
                </div>

                <div ref={infoSectionRef} className="absolute w-full bottom-0 flex flex-col space-y-4 px-4 py-4 text-white text-[14px]">
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

                        <div className="flex space-x-1 font-[500] flex-wrap">
                            {props.tags.map((tag) => {
                                return (
                                    <span key={tag}>#{tag}</span>
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

            <div className="flex flex-col justify-end items-center text-[12px] space-y-6 pb-2">
                <div className="flex flex-col space-y-1 cursor-pointer items-center">
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
        </InView>
    )
}