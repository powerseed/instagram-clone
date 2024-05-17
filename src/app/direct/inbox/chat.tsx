import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Textarea from "@/app/ui/home/media_card/textarea";
import Message from "./message";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"

type Message = {
    text: string,
    created_on: Date,
    isFromCurrentUser: boolean
}

type MessageDetailProps = {
    id: number,
    avatar: string,
    nickname: string,
    username: string,
    last_active_on: Date,
    messages: Message[]
}

export default function Chat(props: MessageDetailProps) {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    let [isInfoColumnOpen, setIsInfoColumnOpen] = useState(false);

    return (
        <div className="flex w-full h-full">
            <div className="flex-1 flex flex-col basis-2/3 min-w-[308px]">
                <div className="flex justify-between h-[75px] px-[15px] border-b-[1px]">
                    <div className="py-[15px] flex space-x-2 cursor-pointer">
                        <div className='flex justify-center items-center'>
                            <img className='avatar' src={props.avatar} width={44} height={44} />
                        </div>

                        <div className='flex flex-col text-[15px] justify-center'>
                            <div className="font-[600]">
                                {props.nickname}
                            </div>

                            <div className='text-[12px] text-gray-400'>
                                Active <ReactTimeAgo date={props.last_active_on} timeStyle="twitter" />
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <img className="cursor-pointer" src="/direct/phone.svg" alt="" width={28} height={28} />
                        <img className="cursor-pointer" src="/direct/camera.svg" alt="" width={28} height={28} />
                        <img className="cursor-pointer" src={`${isInfoColumnOpen ? '/direct/info-selected.svg' : '/direct/info-unselected.svg'}`} alt="" width={28} height={28} onClick={() => setIsInfoColumnOpen(!isInfoColumnOpen)} />
                    </div>
                </div>

                <div className="px-[20px] flex-1 flex flex-col justify-between overflow-y-auto">
                    <div className="flex flex-col mt-8">
                        <div className="flex justify-center">
                            <img src={props.avatar} alt="avatar" className="rounded-full" width={96} height={96} />
                        </div>

                        <div className="mt-[15px] text-center text-[20px] font-[400]">
                            {props.nickname}
                        </div>

                        <div className="text-center text-[13px] text-gray-500">
                            {props.username} &#183; Instagram
                        </div>

                        <div className="mt-[15px] flex justify-center">
                            <div className="text-center w-[110px] rounded-lg bg-gray-200 hover:bg-gray-300 text-[13px] font-[500] py-[6px] cursor-pointer">
                                View profile
                            </div>
                        </div>
                    </div>

                    <div>
                        {props.messages.map((message, index) => {
                            return (
                                <Message key={index} {...message} avatar={props.avatar} />
                            )
                        })}
                    </div>
                </div>

                <div className="flex py-[10px] px-[20px] mx-4 mb-4 rounded-full border-[1px]">
                    <div className="flex-1">
                        <Textarea isEmojiPickerBeforeInputField={true} placeholder="Message..." />
                    </div>

                    <div className="flex space-x-3">
                        <img className="cursor-pointer" src="/direct/microphone.svg" alt="" width={24} height={24} />
                        <img className="cursor-pointer" src="/direct/image.svg" alt="" width={24} height={24} />
                        <img className="cursor-pointer" src="/direct/heart.svg" alt="" width={24} height={24} />
                    </div>
                </div>
            </div>

            {
                isInfoColumnOpen && <div className="flex flex-col shrink-1 max-w-[380px] min-w-[250px] basis-1/3 border-l-[1px]">
                    <div className="px-[20px] h-[75px] border-b-[1px] text-[20px] font-[500] flex items-center">
                        Details
                    </div>

                    <div className="h-[68px] px-[20px] flex space-x-4 border-b-[1px] items-center">
                        <div>
                            <img src='/direct/bell.svg' alt="" width={24} height={24} />
                        </div>

                        <div className="flex-1 text-[15px]">
                            Mute messages
                        </div>

                        <Switch />
                    </div>

                    <div className="py-[20px] grow border-b-[1px]">
                        <div className="px-[20px] mb-[5px] font-[500]">
                            Members
                        </div>

                        <div>
                            <div className={`px-[25px] py-[5px] flex hover:bg-gray-100 cursor-pointer space-x-1`}>
                                <div className='flex justify-center items-center w-[65.5px] h-[65.5px]'>
                                    <img className='avatar' src={props.avatar} width={56} height={56} />
                                </div>

                                <div className='flex flex-col text-[14px] justify-center'>
                                    <div className="font-[500]">
                                        {props.username}
                                    </div>

                                    <div className='text-[12px] text-gray-400'>
                                        {props.nickname}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-[20px] py-[20px] text-red-500 text-[16px] space-y-5">
                        <div className="cursor-pointer">
                            Report
                        </div>

                        <div className="cursor-pointer">
                            Block
                        </div>

                        <div className="cursor-pointer">
                            Delete chat
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}