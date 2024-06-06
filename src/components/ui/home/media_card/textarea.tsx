import TextareaAutosize from 'react-textarea-autosize';
import data from '@emoji-mart/data'
import EmojiPicker from './emoji_picker';
import { MouseEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

type TextareaProps = {
    isEmojiPickerBeforeInputField: boolean,
    placeholder: string,
    handlePostClick: (text: string) => void
}

export type TextareaHandle = {
    addMentionStringToInputfield: (mentionString: string) => void;
    focusOnTextArea: () => void;
    clearTextarea: () => void;
};

const Textarea = forwardRef<TextareaHandle, TextareaProps>((props: TextareaProps, ref) => {
    let emojiPickerRef = useRef<HTMLDivElement>(null);
    let emojiButtonRef = useRef<HTMLButtonElement>(null);
    let textareaRef = useRef<HTMLTextAreaElement>(null);
    let [comment, setComment] = useState('');
    let [isEmojiPenalOpen, setIsEmojiPenalOpen] = useState(false);

    useEffect(() => {
        if (isEmojiPenalOpen) {
            let emojiPickerHeight = emojiPickerRef.current!.offsetHeight;
            let emojiPickerWidth = emojiPickerRef.current!.offsetWidth;
            let spaceToBottom = window.innerHeight - emojiButtonRef.current!.getBoundingClientRect().bottom;
            let spaceToRight = window.innerWidth - emojiButtonRef.current!.getBoundingClientRect().right;

            if (spaceToBottom > emojiPickerHeight) {
                emojiPickerRef.current!.style.top = '100%';
                emojiPickerRef.current!.style.bottom = 'unset';
            }
            else {
                emojiPickerRef.current!.style.top = 'unset';
                emojiPickerRef.current!.style.bottom = '100%';
            }

            if (spaceToRight > emojiPickerWidth) {
                emojiPickerRef.current!.style.left = '0';
                emojiPickerRef.current!.style.right = 'unset';
            }
            else {
                emojiPickerRef.current!.style.left = 'unset';
                emojiPickerRef.current!.style.right = '0';
            }
        }
    }, [isEmojiPenalOpen])

    useImperativeHandle(ref, () => {
        return {
            addMentionStringToInputfield(mentionString: string) {
                setComment(comment + mentionString);
            },
            focusOnTextArea() {
                textareaRef.current?.focus();
            },
            clearTextarea() {
                setComment('');
            }
        }
    });

    function onEmojiButtonClick() {
        setIsEmojiPenalOpen(!isEmojiPenalOpen);
    }

    function onEmojiSelect(emojiObject: any) {
        let sym = emojiObject.unified.split("-");
        let codesArray: number[] = [];
        sym.forEach((el: string) => codesArray.push(Number("0x" + el)));
        let emoji = String.fromCodePoint(...codesArray);
        setComment(comment + emoji);
    }

    function handleMouseOver(event: MouseEvent) {
        const image = event.target as HTMLImageElement;
        image.src = `/home/${image.id}-hover.svg`;
    }

    function handleMouseLeave(event: MouseEvent) {
        const image = event.target as HTMLImageElement;
        image.src = `/home/${image.id}.svg`;
    }

    return (
        <div className={`flex ${props.isEmojiPickerBeforeInputField ? 'flex-row-reverse' : ''} justify-between items-center text-[14px]`}>
            <div className='flex flex-1 space-x-2 mr-2'>
                <div className='flex-1'>
                    <TextareaAutosize
                        ref={textareaRef}
                        value={comment}
                        className='w-full focus:outline-none resize-none'
                        placeholder={props.placeholder}
                        maxRows={4}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {
                    comment &&
                    <div className='text-sky-600 hover:text-black cursor-pointer font-medium' onClick={() => props.handlePostClick(comment)}>
                        Post
                    </div>
                }
            </div>

            <div className='flex relative mr-2'>
                <button ref={emojiButtonRef} className='self-center' onClick={onEmojiButtonClick}>
                    <img id="emoji" src="/home/emoji.svg" alt="Emoji" width={24} height={24}
                        onMouseOver={(event) => handleMouseOver(event)}
                        onMouseLeave={(event) => handleMouseLeave(event)}
                    />
                </button>

                {
                    isEmojiPenalOpen && <div ref={emojiPickerRef} className='absolute z-[1]'>
                        <EmojiPicker data={data} onEmojiSelect={onEmojiSelect} closePenal={onEmojiButtonClick} />
                    </div>
                }
            </div>
        </div>
    )
});

Textarea.displayName = 'Textarea';
export default Textarea;