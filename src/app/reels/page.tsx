import VideoCard from "./video_card";
import { video_card_content } from "./content";

export default function Reels() {
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