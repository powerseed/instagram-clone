import TextareaAutosize from 'react-textarea-autosize';
import data from '@emoji-mart/data'
import EmojiPicker from './emoji_picker';
import { MouseEvent, useEffect, useRef, useState } from 'react';

export default function Textarea({ isEmojiPickerBeforeInputField }: { isEmojiPickerBeforeInputField: boolean }) {
    let emojiPickerRef = useRef<HTMLDivElement>(null);
    let emojiButtonRef = useRef<HTMLButtonElement>(null);
    let [comment, setComment] = useState('');
    let [isEmojiPenalOpen, setIsEmojiPenalOpen] = useState(false);

    useEffect(() => {
        if (isEmojiPenalOpen) {
            let emojiPickerHeight = emojiPickerRef.current!.offsetHeight;
            let space = window.innerHeight - emojiButtonRef.current!.getBoundingClientRect().bottom;

            if (space > emojiPickerHeight) {
                emojiPickerRef.current!.style.top = '100%';
                emojiPickerRef.current!.style.bottom = 'unset';
            }
            else {
                emojiPickerRef.current!.style.top = 'unset';
                emojiPickerRef.current!.style.bottom = '100%';
            }
        }
    }, [isEmojiPenalOpen])

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
        <div className={`flex ${ isEmojiPickerBeforeInputField ? 'flex-row-reverse' : ''} justify-between items-center text-[14px]`}>
            <div className='flex flex-1 space-x-2 mr-2'>
                <div className='flex-1'>
                    <TextareaAutosize
                        value={comment}
                        className='w-full focus:outline-none resize-none'
                        placeholder='Add a comment...'
                        maxRows={4}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {
                    comment && <div className='text-sky-600 hover:text-black cursor-pointer font-medium'>
                        Post
                    </div>
                }
            </div>

            <div className='flex relative  mr-2'>
                <button ref={emojiButtonRef} className='self-center' onClick={onEmojiButtonClick}>
                    <img id="emoji" src="/home/emoji.svg" alt="Emoji" width={24} height={24}
                        onMouseOver={(event) => handleMouseOver(event)}
                        onMouseLeave={(event) => handleMouseLeave(event)}
                    />
                </button>

                {
                    isEmojiPenalOpen && <div ref={emojiPickerRef} className='absolute z-10'>
                        <EmojiPicker data={data} onEmojiSelect={onEmojiSelect} closePenal={onEmojiButtonClick} />
                    </div>
                }
            </div>
        </div>
    )
}