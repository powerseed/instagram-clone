'use client';

import VideoCard from "./video_card";
import { video_card_content } from "./content";
import styles from './styles.module.css';

export default function Reels() {
    return (
        <div className={`${styles.hide_scroll} mx-[32px] py-[32px] h-screen flex flex-col items-center space-y-4 snap-y snap-mandatory overflow-scroll`}>
            {
                (video_card_content).map((content) => {
                    return (
                        <div key={content.id} className="snap-center">
                            <VideoCard key={content.id} {...content} />
                        </div>
                    )
                })
            }
        </div>
    )
}