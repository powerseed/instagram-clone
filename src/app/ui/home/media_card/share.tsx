import { createRef, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import SuggestedUserCard, { SuggestedUserCardHandle } from "./suggested_user_card";
import { suggested_users_in_share } from "@/app/content";

export default function Share({ closeShareWindow }: { closeShareWindow: Function }) {
    let shareRef = useRef<HTMLDivElement>(null);
    let suggestedUserRefs = useRef(suggested_users_in_share.map(() => createRef<SuggestedUserCardHandle>()));
    let [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

    function handleRemoveClick(userToRemove: string) {
        handleRemoveUser(userToRemove);
        const userCard = suggestedUserRefs.current?.find(ref => userToRemove === ref.current!.getNickName());
        userCard!.current!.setCheckedFalse();
    }

    function handleAddUser(nickname: string) {
        setSelectedUsers([...selectedUsers, nickname]);
    }

    function handleRemoveUser(nickname: string) {
        let copy = [...selectedUsers];
        let index = copy.indexOf(nickname);
        copy.splice(index, 1);
        setSelectedUsers(copy);
    }

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

                    <div className="flex items-center space-x-5 px-4 mt-[5px] min-h-8">
                        <div className="font-medium">
                            To:
                        </div>

                        <div className="flex space-x-1 flex-wrap">
                            {
                                selectedUsers.map((selectedUser, index) => {
                                    return (
                                        <div key={index} className="mb-[8px] pl-[12px] pr-[6px] py-[2px] flex justify-center items-center space-x-1 rounded-xl bg-sky-100 text-blue-500 text-[14px] font-medium">
                                            <div>
                                                {selectedUser}
                                            </div>

                                            <div className="w-[25px] h-[25px] cursor-pointer" onClick={(e) => handleRemoveClick(selectedUser)}>
                                                <img src="/home/close-blue.svg" alt="" />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className="flex-1 text-[13px] flex items-center">
                                <input className="outline-none w-full" type="text" placeholder="Search..." />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="flex flex-1 flex-col py-3 overflow-scroll">
                        <div className="px-4 mb-[10px] font-medium text-[13px]">
                            Suggested
                        </div>

                        {
                            suggested_users_in_share.map((user, index) => {
                                return (
                                    <SuggestedUserCard
                                        ref={suggestedUserRefs.current[index]}
                                        key={user.username}
                                        avatar={user.avatar}
                                        nickname={user.nickname}
                                        username={user.username}
                                        isVerified={user.isVerified}
                                        addUser={handleAddUser}
                                        removeUser={handleRemoveUser}
                                    />
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