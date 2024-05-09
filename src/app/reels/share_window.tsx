import { ChangeEvent, createRef, useEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import { suggested_users_in_share } from "../content";
import SuggestedUserCard, { SuggestedUserCardHandle } from "../ui/home/media_card/suggested_user_card";

export default function ShareWindow({ closeThisMenu }: { closeThisMenu: () => void }) {
    const thisRef = useRef<HTMLDivElement>(null);
    let [searchContent, setSearchContent] = useState<string | undefined>(undefined);
    let [message, setMessage] = useState<string | undefined>(undefined);
    let [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    let suggestedUserRefs = useRef(suggested_users_in_share.map(() => createRef<SuggestedUserCardHandle>()));

    useEffect(() => {
        const wheelEventListener = (event: WheelEvent) => {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisMenu();
            }
        };

        document.addEventListener('wheel', wheelEventListener);

        function shareClickEventListener(event: Event) {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisMenu();
            }
        };

        document.addEventListener('click', shareClickEventListener);

        return () => {
            document.removeEventListener('wheel', wheelEventListener);
            document.removeEventListener('click', shareClickEventListener);
        }
    })

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchContent(event.target.value);
    }

    function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

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
        <div ref={thisRef} className="w-[343px] h-[543px] py-[15px] flex flex-col content-stretch justify-stretch bg-white text-[14px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div className={`h-full flex flex-col`}>
                <div className="relative flex justify-center items-center px-[30px] mt-2 mb-6">
                    <img className="absolute left-[30px]" src="/home/close-black.svg" alt="Close" width={24} height={24} onClick={closeThisMenu} />

                    <div className="font-[700] text-[16px]">
                        Share
                    </div>
                </div>

                <div className="flex items-center space-x-5 px-[30px] mb-[5px] max-h-36 overflow-auto overscroll-contain">
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

                        <div className="flex-1 text-[13px] flex items-center min-w-8">
                            <input className="outline-none w-full" type="text" placeholder="Search..." value={searchContent} onChange={handleSearchChange} />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="flex flex-1 flex-col py-3 overflow-y-auto overscroll-contain">
                    <div className="px-4 mb-[10px] font-medium text-[13px]">
                        Suggested
                    </div>

                    {
                        suggested_users_in_share
                            .map((user, index) => {
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
                                        isVisible={(!searchContent) || (user.nickname.includes(searchContent) || user.username.includes(searchContent))}
                                    />
                                )
                            })
                    }
                </div>

                <hr />

                <div className={`flex-0 flex flex-col items-center px-4`}>
                    <div className={`w-full text-[14px] ${styles.share_message_input}`}>
                        <input className={`outline-none w-full transition-all ${selectedUsers.length === 0 ? 'h-0' : 'h-[50px]'}`} type="text" placeholder="Write a message..." value={message} onChange={handleMessageChange} />
                    </div>

                    <div className={`flex justify-center items-center rounded-md w-full h-[32px] ${message ? 'bg-sky-500' : 'bg-sky-200'} text-[13px] font-medium text-gray-100`}>
                        Send
                    </div>
                </div>
            </div>
        </div>
    )
}