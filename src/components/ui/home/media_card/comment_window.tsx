import { useContext, useEffect, useRef, useState } from "react";
import Header from "./header";
import OperationButtons from "./operation_buttons";
import ReactTimeAgo from "react-time-ago";
import Textarea, { TextareaHandle } from "./textarea";
import styles from './styles.module.css';
import './media_slider_in_card_styles.css';
import Comment from "./comment";
import { predefined_comments } from './content';
import { OverlayContext } from "@/app/(main)/overlay_context_provider";
import { useSession } from "next-auth/react";
import { Comment as CommentType } from '@/lib/types';

type CommentProps = {
    postId: string,
    avatar: string,
    username: string,
    isVerified: boolean,
    createdOn: string,
    images: string[],
    closeCommentPanel: () => void
}

export default function CommentWindow(props: CommentProps) {
    let commentRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);
    const { setIsOverlayOpen } = useContext(OverlayContext);
    const { data: session } = useSession();
    let [comments, setComments] = useState<CommentType[]>([]);
    let [error, setError] = useState<string | undefined>(undefined);
    let [refreshComments, setRefreshComments] = useState(true);

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

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`/api/comment/get?postId=${props.postId}`);

                if (!response.ok) {
                    throw new Error();
                }

                let { comments } = await response.json();

                setComments(comments);
                setError(undefined);
            }
            catch (error) {
                setError(`Some internal error occurred, please try again later. `)
            }
        }

        getComments();
    }, [refreshComments]);

    function placeUsernameInInputField(mentionString: string) {
        textareaRef.current!.addMentionStringToInputfield(mentionString);
        textareaRef.current!.focusOnTextArea();
    }

    async function postComment(text: string) {
        let response = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user?.id,
                postId: props.postId,
                createdOn: new Date,
                text
            }),
        });

        if (!response.ok) {
            alert('Failed to create the comment. ');
        }
        else {
            textareaRef.current?.clearTextarea();
            setRefreshComments(!refreshComments);
        }
    }

    return (
        <div className={`${styles.popup_scaling_down} fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/70 z-[var(--windows-z-index)]`}>
            <div ref={commentRef} className='h-full flex max-h-full sm:max-h-[calc(100vh-50px)] max-w-full sm:max-w-[calc(100%-128px)]'>
                <div className="hidden sm:flex flex-1 h-full bg-black items-center">
                    <img className="max-w-full max-h-full" src={props.images[0]} />
                </div>

                <div className="flex-1 bg-white flex flex-col max-w-[500px] min-w-[290px] rounded-tr-md rounded-br-md">
                    <div className="flex sm:hidden justify-center items-center border-b-[1px] mb-2 py-2">
                        <img className="absolute left-0 mx-2 cursor-pointer" src="/home/left-arrow.svg" alt="" width={22} height={22} onClick={props.closeCommentPanel} />

                        <div className="text-[14px] font-[500]">
                            Comments
                        </div>
                    </div>

                    <div className="py-2 border-b-[1px] px-[15px]">
                        <Header
                            avatarUrl={props.avatar}
                            username={props.username}
                            isVerified={props.isVerified}
                            createdOn={props.createdOn}
                            isDisplayedInComment={true}
                        />
                    </div>

                    <div className={`grow overflow-y-auto overscroll-contain px-[15px] ${styles.comment_list}`}>
                        {
                            comments.map((comment) => {
                                return (
                                    <Comment
                                        key={comment.id}
                                        username={comment.username}
                                        avatar={comment.avatarUrl}
                                        content={comment.text}
                                        createdOn={comment.createdOn}
                                        likeCount={comment.likeCount}
                                        replyCount={comment.replyCount}
                                        onReplyClick={placeUsernameInInputField}
                                    />
                                )
                            })
                        }
                        {
                            predefined_comments.map((comment, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        username={comment.username}
                                        avatar={comment.avatarUrl}
                                        content={comment.text}
                                        createdOn={comment.createdOn}
                                        likeCount={comment.likeCount}
                                        replyCount={comment.replyCount}
                                        onReplyClick={placeUsernameInInputField}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="px-[15px] border-t-[1px] py-3">
                        <OperationButtons
                            images={props.images}
                            isDisplayedInComment={true}
                        />
                    </div>

                    <div className="px-[15px] text-[12px] text-gray-400 py-2">
                        <ReactTimeAgo date={Date.parse(props.createdOn)} timeStyle="twitter" />
                    </div>

                    <div className="px-[15px] border-t-[1px] py-3">
                        <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={true} placeholder="Add a comment..." handlePostClick={postComment} />
                    </div>
                </div>
            </div>

            <div className="hidden sm:block fixed top-[20px] right-[20px] w-[20px] h-[20px] cursor-pointer">
                <img src="/home/close-white.svg" alt="Close" />
            </div>
        </div>
    )
}