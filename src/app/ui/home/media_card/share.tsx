import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import ShareUserCard from "./share_user_card";
import { suggested_users_in_share } from "@/app/content";

export default function Share({ closeShareWindow }: { closeShareWindow: Function }) {
    let shareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let closeShareEventListener = (event: MouseEvent) => {
            var clickedElement = document.elementFromPoint(event.clientX, event.clientY);

            if (!(shareRef.current?.contains(clickedElement))) {
                closeShareWindow();
            }
        };

        document.addEventListener('click', closeShareEventListener);

        return () => {
            document.removeEventListener('click', closeShareEventListener);
        }
    });

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/70 z-30">
            <div className="fixed top-0 md:top-1/2 left-0 md:left-1/2 w-screen md:w-[550px] h-screen md:h-[520px] md:translate-y-[-50%] md:translate-x-[-50%] bg-white md:rounded-xl">
                <div ref={shareRef} className={`h-full flex flex-col ${styles.popup_scaling_down}`}>
                    <div className="flex flex-0 justify-center items-center h-11">
                        <div className="font-bold">
                            Share
                        </div>

                        <div className="absolute top-0 right-0 translate-y-[25%] translate-x-[-25%] w-[30px] h-[30px] cursor-pointer"
                            onClick={() => closeShareWindow()}
                        >
                            <img src="/home/close-black.svg" alt="Close" />
                        </div>
                    </div>

                    <hr />

                    <div className="flex flex-0 h-10 items-center space-x-5 px-4">
                        <div className="font-medium">
                            To:
                        </div>

                        <div className="text-[13px]">
                            <input className="outline-none" type="text" placeholder="Search..." />
                        </div>
                    </div>

                    <hr />

                    <div className="flex flex-1 flex-col py-3 overflow-scroll">
                        <div className="px-4 mb-[10px] font-medium text-[13px]">
                            Suggested
                        </div>

                        {
                            suggested_users_in_share.map(user => {
                                return (
                                    <div className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer">
                                        <ShareUserCard
                                            avatar={user.avatar}
                                            nickname={user.nickname}
                                            username={user.username}
                                            isVerified={user.isVerified}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <hr />

                    <div className="flex flex-0 items-center px-4 h-16">
                        <div className="flex justify-center items-center rounded-md w-full h-[32px] bg-sky-200 text-[13px] font-medium text-gray-100">Send</div>
                    </div>
                </div>
            </div>

        </div>
    )
}