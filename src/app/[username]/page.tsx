'use client';

import { useState } from "react"

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
        <div className="w-full h-[calc(100vh-var(--bottom-bar-height))] flex flex-col">
            <div className="flex px-5 py-5 justify-between items-center">
                <img src="/profile.jpg" alt="avatar" width={77} height={77} />

                <div className="h-full flex flex-col justify-between">
                    <div className="text-[20px] py-2">
                        walterwhite
                    </div>

                    <div className="flex text-[13px] space-x-2">
                        <div className="font-[500] bg-gray-300 px-5 py-1 rounded-md">
                            Edit profile
                        </div>

                        <div className="font-[500] bg-gray-300 px-5 py-1 rounded-md">
                            View archive
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-4 font-[500] text-[14px] border-b-[1px]">
                WalterWhite
            </div>

            <div className="py-3 flex justify-evenly text-[14px] border-b-[1px]">
                <div className="flex flex-col items-center">
                    <div>
                        {postCount}
                    </div>

                    <div className="text-gray-400">
                        posts
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div>
                        {followerCount}
                    </div>

                    <div className="text-gray-400">
                        followers
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div>
                        {followingCount}
                    </div>

                    <div className="text-gray-400">
                        following
                    </div>
                </div>
            </div>

            <div className="py-3 flex justify-evenly border-b-[1px]">
                <img src={tabSelected === Tabs.POSTS ? `/profile/posts-selected.svg` : `/profile/posts-unselected.svg`}
                    alt="Posts"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.POSTS)}
                />

                <img src={tabSelected === Tabs.SAVE ? `/profile/save-selected.svg` : `/profile/save-unselected.svg`}
                    alt="Saves"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.SAVE)}
                />

                <img src={tabSelected === Tabs.PHOTO ? `/profile/photo-selected.svg` : `/profile/photo-unselected.svg`}
                    alt="Photos"
                    width={24}
                    height={24}
                    onClick={() => handleTabClick(Tabs.PHOTO)}
                />
            </div>

            <div className="grow flex justify-center items-center">
                <div className="max-w-[350px] flex flex-col items-center space-y-3">
                    <div className="flex justify-center items-center rounded-full w-[65px] h-[65px] border-[2px] border-black">
                        <img src="/profile/camera.svg" alt="" width={50} height={50} />
                    </div>

                    <div className="text-[30px] font-[800] text-center">
                        Share Photos
                    </div>

                    <div className="text-center text-[14px]">
                        When you share photos, they will appear on your profile.
                    </div>

                    <div className="text-center text-[14px] font-[500] text-sky-500">
                        <a href="">Share your first photo</a>
                    </div>
                </div>
            </div>
        </div>
    )
}