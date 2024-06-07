import { useEffect, useRef, useState } from "react";
import Textarea, { TextareaHandle } from "@/components/ui/home/media_card/textarea";
import { predefined_comments } from "@/app/(main)/content";
import Comment from "@/components/ui/home/media_card/comment";
import { useSession } from "next-auth/react";
import { Comment as CommentType } from '@/lib/types';

type CommentWindowProps = {
    postId: string,
    closeThisMenu: () => void
}

export default function CommentWindow(props: CommentWindowProps) {
    const thisRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);
    const { data: session } = useSession();
    let [comments, setComments] = useState<CommentType[]>([]);
    let [error, setError] = useState<string | undefined>(undefined);
    let [refreshComments, setRefreshComments] = useState(true);

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
    })

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
        <div ref={thisRef} className="w-[343px] h-[480px] py-[25px] flex flex-col space-y-4 content-stretch justify-stretch bg-white text-[14px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div className="relative flex justify-center items-center px-[30px]">
                <img className="absolute left-[30px]" src="/home/close-black.svg" alt="Close" width={24} height={24} onClick={props.closeThisMenu} />

                <div className="font-[700] text-[16px]">
                    Comments
                </div>
            </div>

            <div className="grow overflow-y-auto overscroll-contain px-[30px]">
                {
                    comments.map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                username={comment.username}
                                avatar={comment.avatarUrl}
                                content={comment.text}
                                created_on={comment.createdOn}
                                like_count={comment.likeCount}
                                reply_count={comment.replyCount}
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
                                created_on={comment.createdOn}
                                like_count={comment.likeCount}
                                reply_count={comment.replyCount}
                                onReplyClick={placeUsernameInInputField}
                            />
                        )
                    })
                }
            </div>

            <div className="px-[30px]">
                <div className="pl-[15px] py-[5px] border-[1px] rounded-3xl">
                    <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={false} placeholder="Add a comment..." handlePostClick={postComment} />
                </div>
            </div>
        </div>
    )
}