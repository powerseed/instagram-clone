'use client';

import BottomInfoSection from "@/components/ui/bottom_info_section";
import { useEffect, useRef } from "react";

export default function Signin() {
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const imageCount: number = 4;
    let currentImageIndex = 0;

    useEffect(() => {
        (imageContainerRef.current?.children[currentImageIndex] as HTMLImageElement).style.opacity = '1';

        setInterval(() => {
            const nextImageIndex = (currentImageIndex + 1) % imageCount;
            (imageContainerRef.current?.children[currentImageIndex] as HTMLImageElement).style.opacity = '0';
            (imageContainerRef.current?.children[nextImageIndex] as HTMLImageElement).style.opacity = '1';
            currentImageIndex = nextImageIndex;
        }, 5000)
    }, []);

    return (
        <div className="flex flex-col w-full h-screen justify-between">
            <div className="flex justify-center mt-10 space-x-4">
                <div className="hidden md:block w-[380.319px] h-[581.146px] bg-[url('/signin/background.png')] bg-[length:468.32px_634.15px] bg-[left_-46px_top]">
                    <div ref={imageContainerRef} className="relative mt-[27px] ml-[112px]">
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/1.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/2.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/3.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/4.png" alt="" width={250} height={538.84} />
                    </div>
                </div>

                <div>

                </div>
            </div>

            <BottomInfoSection />
        </div>
    )
}