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
import { useInView } from "react-intersection-observer";

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
    const { data: session } = useSession();
    const { setIsOverlayOpen } = useContext(OverlayContext);

    let thisRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);
    let commentsContainer = useRef<HTMLDivElement>(null);

    let [comments, setComments] = useState<CommentType[]>([]);
    let [pageIndex, setPageIndex] = useState<number>(0);
    const pageSize: number = 10;

    const { ref: infiniteScrollingAnchorRef, inView: isInfiniteScrollingAnchorRefInView } = useInView()

    useEffect(() => {
        setIsOverlayOpen(true);

        let closeCommentEventListener = (event: MouseEvent) => {
            var clickedElement = document.elementFromPoint(event.clientX, event.clientY);

            if (!(thisRef.current?.contains(clickedElement))) {
                props.closeCommentPanel();
            }
        };

        document.addEventListener('click', closeCommentEventListener);

        return () => {
            setIsOverlayOpen(false);
            document.removeEventListener('click', closeCommentEventListener);
        }
    }, []);

    useEffect(() => {
        if (isInfiniteScrollingAnchorRefInView) {
            getComments();
        }
    }, [isInfiniteScrollingAnchorRefInView])

    async function getComments() {
        try {
            const response = await fetch(`/api/comment/get?postId=${props.postId}&pageIndex=${pageIndex}&pageSize=${pageSize}`);

            if (!response.ok) {
                throw new Error();
            }

            let { comments: newComments } = await response.json();

            setComments([...comments, ...newComments]);
            setPageIndex(pageIndex + 1);
        }
        catch (error) {
            console.log(`Some internal error occurred, please try again later. `)
        }
    }

    function placeUsernameInInputField(mentionString: string) {
        textareaRef.current!.addMentionStringToInputfield(mentionString);
        textareaRef.current!.focusOnTextArea();
    }

    async function postComment(text: string) {
        const createdOn = new Date();

        let response = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user?.id,
                postId: props.postId,
                createdOn,
                text
            }),
        });

        if (!response.ok) {
            alert('Failed to create the comment. ');
        }
        else {
            textareaRef.current?.clearTextarea();

            const { commentId } = await response.json();

            const newComment: CommentType = {
                id: commentId,
                avatarUrl: session?.user?.image || '/profile.jpg',
                username: session?.user?.name!,
                isVerified: false,
                createdOn: createdOn.toString(),
                text,
                likeCount: 0,
                replyCount: 0
            }

            setComments([newComment, ...comments]);
            commentsContainer.current?.scroll({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div className={`${styles.popup_scaling_down} fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/70 z-[var(--windows-z-index)]`}>
            <div ref={thisRef} className='h-full flex max-h-full sm:max-h-[calc(100vh-50px)] max-w-full sm:max-w-[calc(100%-128px)]'>
                <div className="hidden sm:flex flex-1 h-full bg-black items-center">
                    <img className="w-full h-full object-contain" src={props.images[0]} />
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

                    <div ref={commentsContainer} className={`grow overflow-y-auto overscroll-contain px-[15px] ${styles.comment_list}`}>
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
                        <div ref={infiniteScrollingAnchorRef} className="invisible w-full h-[1px]"></div>
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