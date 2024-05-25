'use client';

import VideoCard from "./video_card";
import { video_card_content } from "@/app/content";
import styles from './styles.module.css';
import { useState } from "react";
import OperationButtons from "./operation_buttons";

export default function Reels() {
    let [isMuted, setIsMuted] = useState(true);
    function switchMute() {
        setIsMuted(!isMuted);
    }

    return (
        <div className={`${styles.hide_scroll} h-[calc(100vh-var(--bottom-bar-height))] md:h-screen mx-0 sm:mx-[32px] py-0 sm:py-[32px] snap-y snap-mandatory overflow-y-auto`}>
            {
                (video_card_content).map((content) => {
                    return (
                        <div key={content.id} className="flex justify-center snap-center h-full sm:mb-4">
                            <div className="sm:aspect-[0.56] sm:mr-6">
                                <VideoCard key={content.id} {...content} isMuted={isMuted} switchMute={switchMute} />
                            </div>

                            <div className="hidden sm:flex items-end">
                                <OperationButtons {...content} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}