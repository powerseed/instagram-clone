"use client";
import React, { createContext, useState } from "react";

export const OverlayContext = createContext({
    isOverlayOpen: false,
    setIsOverlayOpen: (newValue: boolean) => { },
});

export default function OverlayContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (
        <OverlayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
            {children}
        </OverlayContext.Provider>
    )
}