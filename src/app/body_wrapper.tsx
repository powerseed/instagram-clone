"use client";

import { useContext } from "react";
import { OverlayContext } from "./overlay_context_provider";
import BottomBar from "./ui/side_and_bottom_bar/bottom_bar/bottom_bar";
import Sidebar from "./ui/side_and_bottom_bar/sidebar/sidebar";

export default function BodyWrapper({
    inter,
    children,
}: Readonly<{
    inter: any,
    children: React.ReactNode;
}>) {
    const { isOverlayOpen } = useContext(OverlayContext);

    return (
        <body className={`${inter.className} ${isOverlayOpen ? 'overflow-hidden' : 'overflow-visible'}`}>
            <div className="flex">
                <Sidebar />
                <div className="main ml-auto">
                    {children}
                </div>
            </div>
            <BottomBar />
        </body>
    )
}