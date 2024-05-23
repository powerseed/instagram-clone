'use client';

import { useEffect, useRef, useState } from "react";
import { logo } from "../content";
import MoreMenu from "./more_menu";
import styles from '../styles.module.css';
import SidebarLink from "./sidebar_link";
import SidebarButton, { SidebarButtonHandle } from "./sidebar_button";
import SearchPanel from "./search_panel";
import NotificationsPanel from "./notifications_panel/notifications_panel";
import { usePathname } from "next/navigation";
import CreatePostWindow from "../create_post_window/create_post_window";

export default function Sidebar() {
    let [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    let [isCollapsed, setIsCollapsed] = useState(false);
    let [isSearchOpen, setIsSearchOpen] = useState(false);
    let [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    let [isCreatePostWindowOpen, setIsCreatePostWindowOpen] = useState(false);

    const moreMenuRef = useRef<HTMLInputElement>(null);
    const moreButtonRef = useRef<HTMLInputElement>(null);
    const searchPanelRef = useRef<SidebarButtonHandle>(null);
    const notificationsPanelRef = useRef<SidebarButtonHandle>(null);

    const currentPath = usePathname();

    function handleMoreClick() {
        setIsMoreMenuOpen(!isMoreMenuOpen);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (isMoreMenuOpen && !moreMenuRef.current?.contains(event.target as Node) && !moreButtonRef.current?.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        });

        window.addEventListener('resize', () => {
            setIsCollapsedByWindowWidth();
        });
    }, [])

    useEffect(() => {
        if (currentPath.includes('/direct')) {
            setIsCollapsed(true);
        }
        else {
            setIsCollapsedByWindowWidth();
        }
    }, [currentPath])

    function setIsCollapsedByWindowWidth() {
        if (window.innerWidth < 1280) {
            setIsCollapsed(true);
        }
        else {
            if (isSearchOpen || isNotificationsOpen) {
                setIsCollapsed(true);
            }
            else {
                setIsCollapsed(false);
            }
        }
    }

    function onSearchClick(isOpening: boolean) {
        if (isOpening) {
            setIsCollapsed(true);
            setIsNotificationsOpen(false);
            notificationsPanelRef.current!.setIsSelectedFalse();
        }
        else {
            if (window.innerWidth > 1280 && !currentPath.includes('/direct')) {
                setIsCollapsed(false);
            }
            else {
                setIsCollapsed(true);
            }
        }

        setIsSearchOpen(isOpening);
    }

    function onNotificationsClick(isOpening: boolean) {
        if (isOpening) {
            setIsCollapsed(true);
            setIsSearchOpen(false);
            searchPanelRef.current!.setIsSelectedFalse();
        }
        else {
            if (window.innerWidth > 1280 && !currentPath.includes('/direct')) {
                setIsCollapsed(false);
            }
            else {
                setIsCollapsed(true);
            }
        }

        setIsNotificationsOpen(isOpening);
    }

    function onCreateClick() {
        setIsCreatePostWindowOpen(true);
    }

    function onLinkClick() {
        setIsSearchOpen(false);
        searchPanelRef.current?.setIsSelectedFalse();
        setIsNotificationsOpen(false);
        notificationsPanelRef.current?.setIsSelectedFalse();
    }

    return (
        <div className="fixed hidden md:block z-[var(--bars-z-index)]">
            <div className={`z-[0] absolute flex flex-col bg-white pt-[8px] pb-[20px] px-[12px] border-r-[1px] h-screen ${isCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-full-width)]'} transition-all duration-300`}>
                <div className="h-[92px] mt-[14px]">
                    {
                        isCollapsed ?
                            <div className={`${styles.button} cursor-pointer p-[12px] rounded-lg hover:bg-gray-200 transition-colors`}>
                                <img className="transition-transform" src={`/side_and_bottom_bar/${logo.image_icon}`} alt="Instagram" width="24" height="24" />
                            </div>
                            :
                            <div className="px-[12px] pt-[25px] pb-[19px]">
                                <img src={`/side_and_bottom_bar/${logo.text_icon}`} alt="Instagram" width='103' height='29' />
                            </div>
                    }
                </div>

                <div className="grow flex-col">
                    <SidebarLink
                        href='/'
                        text='Home'
                        unselected_icon='/side_and_bottom_bar/home.svg'
                        selected_icon='/side_and_bottom_bar/home-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onLinkClick}
                    />
                    <SidebarButton
                        ref={searchPanelRef}
                        text='Search'
                        unselected_icon='/side_and_bottom_bar/search.svg'
                        selected_icon='/side_and_bottom_bar/search-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onSearchClick}
                    />
                    <SidebarLink
                        href='/explore'
                        text='Explore'
                        unselected_icon='/side_and_bottom_bar/explore.svg'
                        selected_icon='/side_and_bottom_bar/explore-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onLinkClick}
                    />
                    <SidebarLink
                        href='/reels'
                        text='Reels'
                        unselected_icon='/side_and_bottom_bar/reels.svg'
                        selected_icon='/side_and_bottom_bar/reels-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onLinkClick}
                    />
                    <SidebarLink
                        href='/direct/inbox'
                        text='Messages'
                        unselected_icon='/side_and_bottom_bar/messages.svg'
                        selected_icon='/side_and_bottom_bar/messages-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onLinkClick}
                    />
                    <SidebarButton
                        ref={notificationsPanelRef}
                        text='Notifications'
                        unselected_icon='/side_and_bottom_bar/notifications.svg'
                        selected_icon='/side_and_bottom_bar/notifications-selected.svg'
                        isCollapsed={isCollapsed}
                        onClick={onNotificationsClick}
                    />
                    <SidebarButton
                        text='Create'
                        unselected_icon='/side_and_bottom_bar/create.svg'
                        selected_icon='/side_and_bottom_bar/create.svg'
                        isCollapsed={isCollapsed}
                        onClick={onCreateClick}
                    />
                    <SidebarLink
                        href='/walterwhite'
                        text='Profile'
                        unselected_icon='/profile.png'
                        selected_icon={undefined}
                        isCollapsed={isCollapsed}
                        onClick={onLinkClick}
                    />
                </div>

                <div className="flex-col space-y-2">
                    <div className={`${styles.button} overflow-hidden cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`}>
                        <div className="p-[12px] shrink-0">
                            <img className="transition-transform w-[24px] h-[24px]" src={`/side_and_bottom_bar/threads.svg`} alt="Threads" />
                        </div>
                        <span className={`shrink-0 items-center ${isCollapsed ? 'hidden' : 'flex'}`}>Threads</span>
                    </div>

                    <div>
                        {isMoreMenuOpen &&
                            <div ref={moreMenuRef} className={`absolute left-[60px] bottom-[20px] ${isCollapsed ? '' : 'left-[12px] bottom-[72px]'}`}>
                                <MoreMenu />
                            </div>
                        }

                        <div ref={moreButtonRef} className={`${styles.button} overflow-hidden cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`} onClick={handleMoreClick}>
                            <div className="p-[12px] shrink-0">
                                <img className="transition-transform w-[24px] h-[24px]" src={`/side_and_bottom_bar/more.svg`} alt="More" />
                            </div>
                            <span className={`shrink-0 ${isCollapsed ? 'hidden' : 'flex'} items-center ${isMoreMenuOpen ? 'font-bold' : ''}`}>More</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`z-[-1] absolute top-0 ${isSearchOpen ? 'left-[73px]' : 'left-[-400px]'} transition-all duration-300`}>
                <SearchPanel />
            </div>

            <div className={`z-[-1] absolute top-0 ${isNotificationsOpen ? 'left-[73px]' : 'left-[-400px]'} transition-all duration-300`}>
                <NotificationsPanel />
            </div>

            {
                isCreatePostWindowOpen && <CreatePostWindow closeThisWindow={() => setIsCreatePostWindowOpen(false)} />
            }
        </div>
    )
}