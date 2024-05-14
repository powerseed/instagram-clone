'use client';

import ReactTimeAgo from 'react-time-ago';
import { messages } from './content';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default function Inbox() {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    return (
        <div className="flex w-full h-screen">
            <div className="w-[104px] lg:w-[397px] border-r-[1px] border-gray-300">
                <div className="px-[25px] pt-[40px] flex justify-center lg:justify-between">
                    <div className="hidden lg:flex items-center space-x-2  cursor-pointer">
                        <div className="text-[20px] font-[700]">
                            walterwhite
                        </div>

                        <div>
                            <img src="/direct/down-arrow.svg" alt="more" width={15} height={15} />
                        </div>
                    </div>

                    <div className="cursor-pointer">
                        <img src="/direct/edit.svg" alt="edit" width={30} height={30} />
                    </div>
                </div>

                <div className="flex flex-col pt-[20px]">
                    <div className="hidden lg:flex px-[25px] justify-between">
                        <div className="text-[15px] font-[700]">
                            Messages
                        </div>

                        <div className="text-[13px] font-[600] text-gray-500 cursor-pointer">
                            Requests
                        </div>
                    </div>

                    <div className='mt-2'>
                        {
                            messages.map((message) => {
                                return (
                                    <div key={message.id} className='px-[25px] py-[5px] flex hover:bg-gray-100 cursor-pointer space-x-1'>
                                        <div className='flex justify-center items-center w-[65.5px] h-[65.5px]'>
                                            <img className='avatar' src={message.avatar} width={56} height={56} />
                                        </div>

                                        <div className='hidden lg:flex flex-col text-[14px] justify-center'>
                                            <div>
                                                {message.nickname}
                                            </div>

                                            <div className='text-[12px] text-gray-400'>
                                                Active <ReactTimeAgo date={message.last_active_on} timeStyle="twitter" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="grow flex justify-center items-center">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
                    </div>

                    <div className="mt-[15px] text-center text-[20px] font-[400]">
                        Your messages
                    </div>

                    <div className="text-center text-[14px] text-gray-500">
                        Send a message to start a chat.
                    </div>

                    <div className="mt-[15px] flex justify-center">
                        <div className="text-center w-[130px] rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-[13px] font-[500] py-[5px] cursor-pointer">
                            Send message
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}