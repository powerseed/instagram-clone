import { useEffect, useRef, useState } from "react";
import Textarea, { TextareaHandle } from "@/components/ui/home/media_card/textarea";
import Comment from "@/components/ui/home/media_card/comment";
import { useSession } from "next-auth/react";
import { Comment as CommentType } from '@/lib/types';
import { useInView } from "react-intersection-observer";

type CommentWindowProps = {
    postId: string,
    closeThisMenu: () => void
}

export default function CommentWindow(props: CommentWindowProps) {
    const { data: session } = useSession();

    const thisRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);
    let commentsContainer = useRef<HTMLDivElement>(null);
    const { ref: infiniteScrollingAnchorRef, inView: isInfiniteScrollingAnchorRefInView } = useInView()

    let [comments, setComments] = useState<CommentType[]>([]);
    let [pageIndex, setPageIndex] = useState<number>(0);
    const pageSize: number = 10;

    useEffect(() => {
        const wheelEventListener = (event: WheelEvent) => {
            if (!thisRef.current?.contains(event.target as Node)) {
                props.closeThisMenu();
            }
        };

        document.addEventListener('wheel', wheelEventListener);

        function commentClickEventListener(event: Event) {
            if (!thisRef.current?.contains(event.target as Node)) {
                props.closeThisMenu();
            }
        };

        if (!document.onclick) {
            document.addEventListener('click', commentClickEventListener);
        }

        return () => {
            document.removeEventListener('wheel', wheelEventListener);
            document.removeEventListener('click', commentClickEventListener);
        }
    }, [])

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
                avatarUrl: session?.user.image || '/profile.jpg',
                username: session?.user.name!,
                isVerified: false,
                createdOn: createdOn.toString(),
                text,
                likeCount: 0,
                replyCount: 0
            };

            setComments([newComment, ...comments]);
            commentsContainer.current?.scroll({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div ref={thisRef} className="w-[343px] h-[480px] py-[25px] flex flex-col space-y-4 content-stretch justify-stretch bg-white text-[14px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div className="relative flex justify-center items-center px-[30px]">
                <img className="absolute left-[30px]" src="/home/close-black.svg" alt="Close" width={24} height={24} onClick={props.closeThisMenu} />

                <div className="font-[700] text-[16px]">
                    Comments
                </div>
            </div>

            <div ref={commentsContainer} className="grow overflow-y-auto overscroll-contain px-[30px]">
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

            <div className="px-[30px]">
                <div className="pl-[15px] py-[5px] border-[1px] rounded-3xl">
                    <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={false} placeholder="Add a comment..." handlePostClick={postComment} />
                </div>
            </div>
        </div>
    )
}