import { MouseEvent, useState } from "react";

export default function LikeButton() {
    let [isLiked, setIsLiked] = useState(false);

    function handleMouseOver(event: MouseEvent) {
        let img = event.target! as HTMLImageElement;

        if (isLiked) {
            return;
        }

        img.src = `/home/${img.id}-hover.svg`;
    }

    function handleMouseLeave(event: MouseEvent) {
        let img = event.target! as HTMLImageElement;

        if (isLiked) {
            return;
        }

        img.src = `/home/${img.id}.svg`;

        scaleImgUpThenDown(img);
    }

    function scaleImgUpThenDown(img: HTMLImageElement) {
        img.style.scale = '1.2';
        setTimeout(() => {
            img.style.scale = '1';
        }, 100)
    }

    function handleClick(event: MouseEvent) {
        setIsLiked(!isLiked);
        scaleImgUpThenDown(event.target as HTMLImageElement);
    }

    return (
        <img id="like" className='transition-all cursor-pointer' src={isLiked ? `/home/like-selected.svg` : `/home/like.svg`} alt="Like" width={24} height={24}
            onMouseOver={(event) => handleMouseOver(event)}
            onMouseLeave={(event) => handleMouseLeave(event)}
            onClick={(event) => handleClick(event)}
        />
    )
}