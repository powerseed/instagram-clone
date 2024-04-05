'use client';

import { useEffect, useRef, useState } from "react";
import { logo, sidebar_buttons_group1 } from "./content";
import MoreMenu from "./more_menu";
import './style.css';

export default function Sidebar() {
    let [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenu = useRef<HTMLInputElement>(null);
    const moreButton = useRef<HTMLInputElement>(null);

    function handleMoreClick() {
        setIsMoreMenuOpen(!isMoreMenuOpen);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (isMoreMenuOpen && !moreMenu.current?.contains(event.target as Node) && !moreButton.current?.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        });
    })

    return (
        <div className="hidden md:flex flex-col pt-[8px] pb-[20px] px-[12px] border-r-[1px] h-screen w-[72px] xl:w-[244px]">
            <div className="h-[92px] mt-[14px]">
                <div className="button cursor-pointer p-[12px] rounded-lg hover:bg-gray-200 transition-colors xl:hidden">
                    <img className="transition-transform" src={`/side_and_bottom_bar/${logo.image_icon}`} alt="Instagram" width="24" height="24" />
                </div>

                <div className="hidden xl:block px-[12px] pt-[25px] pb-[19px]">
                    <img src={`/side_and_bottom_bar/${logo.text_icon}`} alt="Instagram" width='103' height='29' />
                </div>
            </div>

            <div className="grow flex-col space-y-2">
                {sidebar_buttons_group1.map(button => {
                    return (
                        <div className="button cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors" key={button.text}>
                            <div className="p-[12px]">
                                <img className="transition-transform" src={`/side_and_bottom_bar/${button.svg}`} alt={button.text} width='24' height='24' />
                            </div>
                            <div className="hidden xl:flex items-center">{button.text}</div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-col space-y-2">
                <div className="button cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors">
                    <div className="p-[12px]">
                        <img className="transition-transform" src={`/side_and_bottom_bar/threads.svg`} alt="Threads" width='24' height='24' />
                    </div>
                    <span className="hidden xl:flex items-center">Threads</span>
                </div>

                <div>
                    {isMoreMenuOpen &&
                        <div ref={moreMenu} className="absolute left-[60px] bottom-[20px] xl:left-[12px] xl:bottom-[72px]">
                            <MoreMenu />
                        </div>
                    }

                    <div ref={moreButton} className="button cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors" onClick={handleMoreClick}>
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