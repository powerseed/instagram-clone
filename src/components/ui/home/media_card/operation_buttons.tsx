import { MouseEvent, useState } from "react";
import LikeButton from "./like_button";
import Share from "./share";

enum OperationsOnButtonsForPost {
    HOVER,
    LEAVE
}

type OperationButtonsProps = {
    avatar?: string,
    username?: string,
    isVerified?: boolean,
    created_on?: Date,
    annotation?: string,
    images: string[],
    isDisplayedInComment: boolean,
    onCommentClick?: () => void
}

export default function OperationButtons(props: OperationButtonsProps) {
    let [isShareOpen, setIsShareOpen] = useState(false);
    let [isSaved, setIsSaved] = useState(false);

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

    function onSaveClick() {
        setIsSaved(!isSaved);
    }

    return (
        <div className='flex justify-between'>
            <div className='flex space-x-4'>
                <LikeButton />

                {
                    !props.isDisplayedInComment &&
                    <div>
                        <img id="comment" className="cursor-pointer" src="/home/comment.svg" alt="Comment" width={24} height={24}
                            onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                            onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                            onClick={props.onCommentClick}
                        />
                    </div>
                }

                <div>
                    <img id="share-post" className="cursor-pointer" src="/home/share-post.svg" alt="Share Post" width={24} height={24}
                        onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                        onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                        onClick={() => setIsShareOpen(true)}
                    />

                    {
                        isShareOpen && <Share closeShareWindow={() => setIsShareOpen(false)} />
                    }
                </div>
            </div>

            <div>
                <img id="save" className="cursor-pointer" src={isSaved ? `/home/save-selected.svg` : `/home/save.svg`} alt="Save" width={24} height={24}
                    onMouseOver={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.HOVER)}
                    onMouseLeave={(event) => onButtonsForPostHoverOrLeave(event, OperationsOnButtonsForPost.LEAVE)}
                    onClick={onSaveClick}
                />
            </div>
        </div>
    )
}