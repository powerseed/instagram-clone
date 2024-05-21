import { useContext, useEffect, useRef } from "react";
import Header from "./header";
import OperationButtons from "./operation_buttons";
import ReactTimeAgo from "react-time-ago";
import Textarea, { TextareaHandle } from "./textarea";
import styles from './styles.module.css';
import './media_slider_in_card_styles.css';
import Comment from "./comment";
import { comments } from '../../../content';
import { OverlayContext } from "@/app/overlay_context_provider";

type CommentProps = {
    avatar: string,
    username: string,
    isVerified: boolean,
    created_on: Date,
    annotation: string | undefined,
    images: string[],
    closeCommentPanel: Function
}

export default function CommentWindow(props: CommentProps) {
    let commentRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);
    const { setIsOverlayOpen } = useContext(OverlayContext);

    useEffect(() => {
        setIsOverlayOpen(true);

        let closeCommentEventListener = (event: MouseEvent) => {
            var clickedElement = document.elementFromPoint(event.clientX, event.clientY);

            if (!(commentRef.current?.contains(clickedElement))) {
                props.closeCommentPanel();
            }
        };

        document.addEventListener('click', closeCommentEventListener);

        return () => {
            setIsOverlayOpen(false);
            document.removeEventListener('click', closeCommentEventListener);
        }
    });

    function placeUsernameInInputField(mentionString: string) {
        textareaRef.current!.addMentionStringToInputfield(mentionString);
        textareaRef.current!.focusOnTextArea();
    }

    return (
        <div className={`${styles.popup_scaling_down} fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/70 z-[var(--windows-z-index)]`}>
            <div ref={commentRef} className={`${styles.comment_panel} h-full flex`}>
                <div className="flex-1 h-full bg-black flex items-center">
                    <img className="max-w-full max-h-full" src={`/home/${props.images[0]}`} />
                </div>

                <div className="flex-1 bg-white flex flex-col px-[15px] py-[10px] max-w-[500px] min-w-[405px] rounded-tr-md rounded-br-md">
                    <div>
                        <Header
                            avatar={props.avatar}
                            username={props.username}
                            isVerified={props.isVerified}
                            created_on={props.created_on}
                            annotation={props.annotation}
                            isDisplayedInComment={true}
                        />
                    </div>

                    <hr className="mx-[-15px] mt-2" />

                    <div className={`grow overflow-y-auto overscroll-contain ${styles.comment_list}`}>
                        {
                            comments.map((comment, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        username={comment.username}
                                        avatar={comment.avatar}
                                        content={comment.content}
                                        created_on={comment.created_on}
                                        like_count={comment.like_count}
                                        reply_count={comment.reply_count}
                                        onReplyClick={placeUsernameInInputField}
                                    />
                                )
                            })
                        }
                    </div>

                    <hr className="mx-[-15px] mb-4" />

                    <div className="mb-4">
                        <OperationButtons
                            images={props.images}
                            isDisplayedInComment={true}
                        />
                    </div>


                    <div className="mb-2 text-[12px] text-gray-400">
                        <ReactTimeAgo date={props.created_on} timeStyle="twitter" />
                    </div>

                    <hr className="mb-3 mx-[-15px]" />

                    <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={true} placeholder="Add a comment..." />
                </div>
            </div>

            <div className="fixed top-[20px] right-[20px] w-[20px] h-[20px] cursor-pointer">
                <img src="/home/close-white.svg" alt="Close" />
            </div>
        </div>
    )
}