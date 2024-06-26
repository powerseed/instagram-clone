import { MouseEvent, useEffect, useState } from "react";
import LikeButton from "@/components/ui/home/media_card/like_button";
import MoreMenu from "./more_menu";
import CommentWindow from "./comment_window";
import ShareWindow from "./share_window";

enum OperationsOnButtonsForPost {
    HOVER,
    LEAVE
}

type OperationButtonsProps = {
    postId: string,
    avatar: string
}

export default function OperationButtons(props: OperationButtonsProps) {
    let [isCommentOpen, setIsCommentOpen] = useState(false);
    let [isShareOpen, setIsShareOpen] = useState(false);
    let [isSaved, setIsSaved] = useState(false);
    let [isMoreOpen, setIsMoreOpen] = useState(false);
    let [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        getCommentCount();
    }, []);

    async function getCommentCount() {
        try {
            const response = await fetch(`/api/comment/count?postId=${props.postId}`);

            if (!response.ok) {
                throw new Error();
            }

            let { commentCount } = await response.json();

            setCommentCount(commentCount);
        }
        catch (error) {
            console.log(error)
        }
    }

    function onButtonsForPostHoverOrLeave(event: MouseEvent, operation: OperationsOnButtonsForPost) {
        let img = event.target! as HTMLImageElement;

        if (img.id === 'save' && isSaved) {
            return;
        }

        let newSrc;
        switch (operation) {
            case OperationsOnButtonsForPost.HOVER:
                newSrc = `/home/${img.id}-hover.svg`;
                break;
            case OperationsOnButtonsForPost.LEAVE:
                newSrc = `/home/${img.id}.svg`;
                break;
        }
        img.src = newSrc;
    }

    return (
        <div className="flex flex-col items-center text-[12px] space-y-6 pb-2">
            <div className="flex flex-col space-y-1 cursor-pointer items-center">
                <LikeButton />
                <div>Likes</div>
            </div>

            <div className="relative flex flex-col justify-center items-center cursor-pointer space-y-1">
                <div>
                    <img id="comment" className="cursor-pointer" src="/home/comment.svg" alt="Comment" width={24} height={24}
                        onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                        onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                        onClick={() => setIsCommentOpen(!isCommentOpen)}
                    />
                </div>

                <div>
                    {
                        Intl.NumberFormat('en-US', {
                            notation: "compact",
                            maximumFractionDigits: 1
                        }).format(commentCount)
                    }
                </div>

                {
                    isCommentOpen &&
                    <div className="absolute bottom-0 right-full 2xl:left-full mx-4">
                        <CommentWindow closeThisMenu={() => setIsCommentOpen(false)} postId={props.postId} />
                    </div>
                }
            </div>

            <div className="relative cursor-pointer">
                <img id="share-post" className="cursor-pointer" src="/home/share-post.svg" alt="Share Post" width={24} height={24}
                    onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                    onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                    onClick={() => setIsShareOpen(!isShareOpen)}
                />

                {
                    isShareOpen &&
                    <div className="absolute bottom-0 right-full 2xl:left-full mx-4">
                        <ShareWindow closeThisMenu={() => setIsShareOpen(false)} />
                    </div>
                }
            </div>

            <div className="cursor-pointer">
                <img id="save" className="cursor-pointer" src={isSaved ? `/home/save-selected.svg` : `/home/save.svg`} alt="Save" width={24} height={24}
                    onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                    onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                    onClick={() => setIsSaved(!isSaved)}
                />
            </div>

            <div className="relative cursor-pointer">
                <img id="three-dot-button" className="cursor-pointer" src="/home/three-dot-button.svg" alt="More" width={24} height={24}
                    onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                    onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                />
                {
                    isMoreOpen &&
                    <div className="absolute bottom-full right-0 lg:left-0">
                        <MoreMenu closeThisMenu={() => setIsMoreOpen(false)} />
                    </div>
                }
            </div>

            <div className="cursor-pointer rounded-md border-[1px] border-black">
                <img className="rounded-md" src={props.avatar} alt="avatar" width={24} height={24} />
            </div>
        </div>
    )
}