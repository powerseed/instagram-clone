"use client";

import { useContext } from "react";
import { OverlayContext } from "./overlay_context_provider";
import BottomBar from "./ui/side_and_bottom_bar/bottom_bar/bottom_bar";
import Sidebar from "./ui/side_and_bottom_bar/sidebar/sidebar";
import { usePathname } from "next/navigation";

export default function BodyWrapper({
    inter,
    children,
}: Readonly<{
    inter: any,
    children: React.ReactNode;
}>) {
    const { isOverlayOpen } = useContext(OverlayContext);
    let pathname = usePathname();

    return (
        <body className={`${inter.className} ${isOverlayOpen ? 'overflow-hidden' : 'overflow-visible'}`}>
            <Sidebar />

            <div className={`ml-auto flex justify-center ${pathname === '/direct/inbox' ? 'w-[var(--main-width-collapsed-sidebar)]' : 'w-[var(--main-width-collapsed-sidebar)] xl:w-[var(--main-width-full-sidebar)]'}`}>
                {children}
            </div>

            <BottomBar />
        </body>
    )
}