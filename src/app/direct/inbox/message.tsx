import { useSession } from "next-auth/react";
import { useState } from "react"

type MessageProps = {
    avatar: string,
    created_on: Date,
    text: string,
    isFromCurrentUser: boolean
}

export default function Message(props: MessageProps) {
    let [isButtonGroupDisplayed, setIsButtonGroupDisplayed] = useState(false);
    let [isReplyTagDisplayed, setIsReplyTagDisplayed] = useState(false);
    let [isReactTagDisplayed, setIsReactTagDisplayed] = useState(false);
    let [isMoreTagDisplayed, setIsMoreTagDisplayed] = useState(false);

    const { data: session } = useSession();
    if (!session) {
        return;
    }

    function handleMouseEnter() {
        setIsButtonGroupDisplayed(true);
    }

    function handleMouseLeave() {
        setIsButtonGroupDisplayed(false);
    }

    return (
        <div className={`w-full my-[20px] flex space-x-2 ${props.isFromCurrentUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="self-end cursor-pointer shrink-0">
                <img className="rounded-full" src={props.isFromCurrentUser ? (session.user?.image ? session.user?.image : '/profile.jpg') : props.avatar} alt="avatar" width={28} height={28} />
            </div>

            <div className="px-3 py-2 max-w-[564px] text-wrap bg-[#efefef] text-[14px] rounded-2xl whitespace-pre">
                {props.text}
            </div>

            <div className={`self-center flex shrink-0 ${isButtonGroupDisplayed ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative" onMouseEnter={() => { setIsReactTagDisplayed(true) }} onMouseLeave={() => { setIsReactTagDisplayed(false) }}>
                    <img className='cursor-pointer' src="/home/emoji.svg" alt="Emoji" width={24} height={24} />
                    {
                        isReactTagDisplayed && <div className="absolute w-[60px] h-[30px] flex justify-center items-center left-0 top-0 -translate-x-[18px] -translate-y-[40px] text-white text-[14px] rounded-lg bg-black">
                            React
                        </div>
                    }
                </div>

                <div className="relative" onMouseEnter={() => { setIsReplyTagDisplayed(true) }} onMouseLeave={() => { setIsReplyTagDisplayed(false) }}>
                    <img className='cursor-pointer' src="/direct/reply.svg" alt="Emoji" width={24} height={24} />

                    {
                        isReplyTagDisplayed && <div className="absolute w-[60px] h-[30px] flex justify-center items-center left-0 top-0 -translate-x-[18px] -translate-y-[40px] text-white text-[14px] rounded-lg bg-black">
                            Reply
                        </div>
                    }
                </div>

                <div className="relative" onMouseEnter={() => { setIsMoreTagDisplayed(true) }} onMouseLeave={() => { setIsMoreTagDisplayed(false) }}>
                    <img className='cursor-pointer' src="/direct/three-dots-vertical.svg" alt="Emoji" width={24} height={24} />
                    {
                        isMoreTagDisplayed && <div className="absolute w-[60px] h-[30px] flex justify-center items-center left-0 top-0 -translate-x-[18px] -translate-y-[40px] text-white text-[14px] rounded-lg bg-black">
                            More
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}