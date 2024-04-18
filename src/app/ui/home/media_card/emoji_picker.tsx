import Picker from '@emoji-mart/react'
import { useEffect, useRef } from 'react'

export default function EmojiPicker({ data, onEmojiSelect, closePenal }: { data: any, onEmojiSelect: Function, closePenal: Function }) {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const eventListener = (event: Event) => {
            if (!pickerRef.current?.contains(event.target as Node)) {
                closePenal();
            }
        };

        document.addEventListener('click', eventListener);

        return () => {
            document.removeEventListener('click', eventListener);
        }
    })

    return (
        <div ref={pickerRef}>
            <Picker data={data} onEmojiSelect={onEmojiSelect} />
        </div>
    )
}