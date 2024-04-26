'use client';

import { useEffect, useRef, useState } from "react";
import { logo } from "./content";
import MoreMenu from "./more_menu";
import styles from './styles.module.css';
import SidebarLink from "./sidebar_link";
import SidebarButton from "./sidebar_button";

export default function Sidebar() {
    let [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenuRef = useRef<HTMLInputElement>(null);
    const moreButtonRef = useRef<HTMLInputElement>(null);

    function handleMoreClick() {
        setIsMoreMenuOpen(!isMoreMenuOpen);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (isMoreMenuOpen && !moreMenuRef.current?.contains(event.target as Node) && !moreButtonRef.current?.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        });
    })

    return (
        <div className="fixed hidden md:flex flex-col pt-[8px] pb-[20px] px-[12px] border-r-[1px] h-screen w-[72px] xl:w-[280px]">
            <div className="h-[92px] mt-[14px]">
                <div className={`${styles.button} cursor-pointer p-[12px] rounded-lg hover:bg-gray-200 transition-colors xl:hidden`}>
                    <img className="transition-transform" src={`/side_and_bottom_bar/${logo.image_icon}`} alt="Instagram" width="24" height="24" />
                </div>

                <div className="hidden xl:block px-[12px] pt-[25px] pb-[19px]">
                    <img src={`/side_and_bottom_bar/${logo.text_icon}`} alt="Instagram" width='103' height='29' />
                </div>
            </div>

            <div className="grow flex-col">
                <SidebarLink
                    href='/'
                    text='Home'
                    unselected_icon='/side_and_bottom_bar/home.svg'
                    selected_icon='/side_and_bottom_bar/home-selected.svg'
                />
                <SidebarButton
                    text='Search'
                    unselected_icon='/side_and_bottom_bar/search.svg'
                    selected_icon='/side_and_bottom_bar/search-selected.svg'
                />
                <SidebarLink
                    href='/explore'
                    text='Explore'
                    unselected_icon='/side_and_bottom_bar/explore.svg'
                    selected_icon='/side_and_bottom_bar/explore-selected.svg'
                />
                <SidebarLink
                    href='/reels'
                    text='Reels'
                    unselected_icon='/side_and_bottom_bar/reels.svg'
                    selected_icon='/side_and_bottom_bar/reels-selected.svg'
                />
                <SidebarLink
                    href='/messages'
                    text='Messages'
                    unselected_icon='/side_and_bottom_bar/messages.svg'
                    selected_icon='/side_and_bottom_bar/messages-selected.svg'
                />
                <SidebarButton
                    text='Notifications'
                    unselected_icon='/side_and_bottom_bar/notifications.svg'
                    selected_icon='/side_and_bottom_bar/notifications-selected.svg'
                />
                <SidebarButton
                    text='Create'
                    unselected_icon='/side_and_bottom_bar/create.svg'
                    selected_icon='/side_and_bottom_bar/create.svg'
                />
                <SidebarLink
                    href='/profile'
                    text='Profile'
                    unselected_icon='/profile.png'
                    selected_icon={undefined}
                />
            </div>

            <div className="flex-col space-y-2">
                <div className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`}>
                    <div className="p-[12px]">
                        <img className="transition-transform" src={`/side_and_bottom_bar/threads.svg`} alt="Threads" width='24' height='24' />
                    </div>
                    <span className="hidden xl:flex items-center">Threads</span>
                </div>

                <div>
                    {isMoreMenuOpen &&
                        <div ref={moreMenuRef} className="absolute left-[60px] bottom-[20px] xl:left-[12px] xl:bottom-[72px]">
                            <MoreMenu />
                        </div>
                    }

                    <div ref={moreButtonRef} className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`} onClick={handleMoreClick}>
                        <div className="p-[12px]">
                            <img className="transition-transform" src={`/side_and_bottom_bar/more.svg`} alt="More" width='24' height='24' />
                        </div>
                        <span className={`hidden xl:flex items-center ${isMoreMenuOpen ? 'font-bold' : ''}`}>More</span>
                    </div>
                </div>
            </div>
        </div>
    )
}