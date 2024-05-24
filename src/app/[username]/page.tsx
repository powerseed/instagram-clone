'use client';

import { useState } from "react"
import SharePhotos from "./share_photos";
import Saved from "./saved";
import Tagged from "./tagged";

enum Tabs {
    POSTS,
    SAVE,
    PHOTO
}

export default function Profile() {
    let [postCount, setPostCount] = useState<number>(0);
    let [followerCount, setFollowerCount] = useState<number>(0);
    let [followingCount, setFollowingCount] = useState<number>(30);
    let [tabSelected, setTabSelected] = useState<Tabs>(Tabs.POSTS);

    function handleTabClick(tabClicked: Tabs) {
        setTabSelected(tabClicked);
    }

    return (
        <div className="w-full max-w-[935px] h-[calc(100vh-var(--bottom-bar-height))] flex flex-col">
            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[1fr_2fr] grid-rows-[auto_auto_auto] sm:grid-rows-[auto_auto_auto_auto_auto] mt-[20px]">
                <div className="col-start-1	row-start-1 row-end-2 sm:row-end-4 ml-[16px] sm:ml-0 mr-[28px] flex justify-center">
                    <img className="sm:w-[150px] sm:h-[150px]" src="/profile.jpg" alt="avatar" />
                </div>

                <div className="col-start-2	row-start-1 row-end-2 flex flex-wrap items-center sm:mb-[20px]">
                    <div className="mr-5 text-[20px] py-2">
                        walterwhite
                    </div>

                    <div className="flex text-[13px] space-x-2">
                        <div className="font-[500] bg-gray-200 hover:bg-gray-300 px-5 py-1 h-fit rounded-md cursor-pointer">
                            Edit profile
                        </div>

                        <div className="font-[500] bg-gray-200 hover:bg-gray-300 px-5 py-1 h-fit rounded-md cursor-pointer">
                            View archive
                        </div>

                        <div className="hidden sm:block cursor-pointer">
                            <img src="/profile/config.svg" alt="Configuration" width={24} height={24} />
                        </div>
                    </div>
                </div>

                <div className="col-start-1	sm:col-start-2 col-end-3 row-start-2 sm:row-start-3 row-end-3 sm:row-end-4 px-5 sm:px-0 py-4 sm:py-0 font-[500] text-[14px] border-b-[1px] sm:border-none flex items-center">
                    WalterWhite
                </div>

                <div className="col-start-1 sm:col-start-2 col-end-3 row-start-3 sm:row-start-2 row-end-4 sm:row-end-3 py-2 sm:py-0 sm:mb-[20px] flex justify-evenly sm:justify-start sm:space-x-8 items-center text-[14px] border-b-[1px] sm:border-none font-[500]">
                    <div className="flex flex-col sm:flex-row sm:space-x-1 items-center">
                        <div>
                            {postCount}
                        </div>

                        <div className="text-gray-400 sm:text-black">
                            posts
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-1 items-center">
                        <div>
                            {followerCount}
                        </div>

                        <div className="text-gray-400 sm:text-black">
                            followers
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-1 items-center">
                        <div>
                            {followingCount}
                        </div>

                        <div className="text-gray-400 sm:text-black">
                            following
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden sm:flex mx-8">
                <div className="my-12 flex flex-col justify-center items-center space-y-3 cursor-pointer">
                    <div className="flex justify-center items-center rounded-full w-[85px] h-[85px] border-[1px]">
                        <img src="/profile/plus.svg" alt="" width={48} height={48} />
                    </div>

                    <div className="text-[12px] font-[500]">
                        New
                    </div>
                </div>
            </div>

            <div className="py-3 flex justify-evenly border-b-[1px]">
                <img className="cursor-pointer"
                    src={tabSelected === Tabs.POSTS ? `/profile/posts-selected.svg` : `/profile/posts-unselected.svg`}
                    alt="Posts"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.POSTS)}
                />

                <img className="cursor-pointer"
                    src={tabSelected === Tabs.SAVE ? `/profile/save-selected.svg` : `/profile/save-unselected.svg`}
                    alt="Saves"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.SAVE)}
                />

                <img className="cursor-pointer"
                    src={tabSelected === Tabs.PHOTO ? `/profile/photo-selected.svg` : `/profile/photo-unselected.svg`}
                    alt="Photos"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.PHOTO)}
                />
            </div>

            <div className="grow flex justify-center items-center">
                <div className="max-w-[350px] flex flex-col items-center space-y-3">
                    {tabSelected === Tabs.POSTS && <SharePhotos />}
                    {tabSelected === Tabs.SAVE && <Saved />}
                    {tabSelected === Tabs.PHOTO && <Tagged />}
                </div>
            </div>
        </div>
    )
}