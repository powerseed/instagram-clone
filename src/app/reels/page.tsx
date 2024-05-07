'use client';

import VideoCard from "./video_card";
import { video_card_content } from "./content";
import { useEffect } from "react";

export default function Reels() {
    useEffect(() => {
        document.documentElement.classList.add("hide-scrollbar");

        return () => {
            document.documentElement.classList.remove('hide-scrollbar');
        }
    });

    return (
        <div className="mx-[32px] my-[32px] flex flex-col items-center space-y-4">
            {
                video_card_content.map((content) => {
                    return (
                        <VideoCard key={content.id} {...content} />
                    )
                })
            }
        </div>
    )
}