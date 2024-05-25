import { useEffect, useRef } from "react";
import Textarea, { TextareaHandle } from "@/components/ui/home/media_card/textarea";
import { comments } from "@/app/content";
import Comment from "@/components/ui/home/media_card/comment";

export default function CommentWindow({ closeThisMenu }: { closeThisMenu: () => void }) {
    const thisRef = useRef<HTMLDivElement>(null);
    let textareaRef = useRef<TextareaHandle>(null);

    useEffect(() => {
        const wheelEventListener = (event: WheelEvent) => {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisMenu();
            }
        };

        document.addEventListener('wheel', wheelEventListener);

        function commentClickEventListener(event: Event) {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisMenu();
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

    function placeUsernameInInputField(mentionString: string) {
        textareaRef.current!.addMentionStringToInputfield(mentionString);
        textareaRef.current!.focusOnTextArea();
    }

    return (
        <div ref={thisRef} className="w-[343px] h-[480px] py-[25px] flex flex-col space-y-4 content-stretch justify-stretch bg-white text-[14px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div className="relative flex justify-center items-center px-[30px]">
                <img className="absolute left-[30px]" src="/home/close-black.svg" alt="Close" width={24} height={24} onClick={closeThisMenu} />

                <div className="font-[700] text-[16px]">
                    Comments
                </div>
            </div>

            <div className="overflow-y-auto overscroll-contain px-[30px]">
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

            <div className="px-[30px]">
                <div className="pl-[15px] py-[5px] border-[1px] rounded-3xl">
                    <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={false} placeholder="Add a comment..." />
                </div>
            </div>
        </div>
    )
}