'use client';
import { MouseEvent, useEffect, useRef, useState } from "react"
import { InView } from "react-intersection-observer";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

type VideoCardProps = {
    video_src: string,
    avatar: string,
    username: string,
    text: string,
    tags: string[],
    notation: string,
    isMuted: boolean,
    switchMute: () => void
}

export default function VideoCard(props: VideoCardProps) {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    let videoRef = useRef<HTMLVideoElement>(null);
    let muteButtonRef = useRef<HTMLDivElement>(null);
    let playButtonRef = useRef<HTMLDivElement>(null);
    let infoSectionRef = useRef<HTMLDivElement>(null);
    let textRef = useRef<HTMLDivElement>(null);

    let [isFollowing, setIsFollowing] = useState(false);
    let [isTextExpanded, setIsTextExpanded] = useState(false);
    let [isTextOverflowing, setIsTextOverflowing] = useState(false);

    useEffect(() => {
        const isTextOverflowing = textRef.current!.clientHeight < textRef.current!.scrollHeight;
        setIsTextOverflowing(isTextOverflowing);
    }, [])

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

    function handleTextClick() {
        if (!isTextExpanded) {
            setIsTextOverflowing(false);
        }

        setIsTextExpanded(!isTextExpanded)
    }

    function handleTextClickTransitionEnd() {
        if (!isTextExpanded) {
            setIsTextOverflowing(true);
        }
    }

    return (
        <InView as="div" className="relative h-full flex items-center bg-black rounded-none sm:rounded-md" threshold={0.8} onChange={(inView) => handleIsInViewChange(inView)} onClick={handleOverlayClick}>
            <video ref={videoRef} muted={props.isMuted} loop playsInline>
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
                <div className="flex space-x-2 items-center font-[500]">
                    <div className="cursor-pointer">
                        <img className="rounded-full" src={props.avatar} alt="" width={32} height={32} />
                    </div>

                    <div className='cursor-pointer'>
                        {props.username}
                    </div>

                    <div className="text-[20px]">
                        &#183;
                    </div>

                    <div className="px-1 py-1 rounded-md border-gray-500 border-[1px] cursor-pointer" onClick={() => setIsFollowing(!isFollowing)}>
                        {isFollowing ? "Following" : "Follow"}
                    </div>
                </div>

                <div className={`flex transition-all duration-500 cursor-pointer leading-[18px] ${isTextExpanded ? 'max-h-[246px] overflow-y-scroll' : 'max-h-[18px] overflow-hidden'}`}
                    onClick={handleTextClick} onTransitionEnd={handleTextClickTransitionEnd}>

                    <div ref={textRef} className="flex flex-col space-y-4">
                        <div className="whitespace-pre-wrap">
                            {props.text}
                        </div>

                        {
                            props.tags.length > 0 && <div className="flex space-x-1 font-[500] flex-wrap">
                                {props.tags.map((tag) => {
                                    return (
                                        <a href="#" key={tag}>#{tag}</a>
                                    )
                                })}
                            </div>
                        }
                    </div>

                    {
                        isTextOverflowing && <div className="shrink-0">... more</div>
                    }
                </div>

                <div className="flex items-center space-x-1 cursor-pointer">
                    <img src="/reels/music.svg" alt="" width={13} height={13} />

                    <div>
                        {props.username}
                    </div>

                    <div>
                        &#183;
                    </div>

                    <div>
                        {props.notation}
                    </div>
                </div>
            </div>
        </InView>
    )
}