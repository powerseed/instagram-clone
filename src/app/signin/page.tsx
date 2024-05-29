'use client';

import BottomInfoSection from "@/components/ui/bottom_info_section";
import { ClientSafeProvider, LiteralUnion, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { getProviders, signIn } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index";

export default function Signin() {
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>();

    const imageCount: number = 4;
    let currentImageIndex = 0;

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProviders(providers);
        }

        fetchProviders();
    }, []);

    useEffect(() => {
        (imageContainerRef.current?.children[currentImageIndex] as HTMLImageElement).style.opacity = '1';

        const setIntervalFunction = setInterval(() => {
            const nextImageIndex = (currentImageIndex + 1) % imageCount;
            (imageContainerRef.current?.children[currentImageIndex] as HTMLImageElement).style.opacity = '0';
            (imageContainerRef.current?.children[nextImageIndex] as HTMLImageElement).style.opacity = '1';
            currentImageIndex = nextImageIndex;
        }, 5000)

        return () => {
            clearInterval(setIntervalFunction);
        }
    }, []);

    const { data: session } = useSession();
    if (session && session.user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col w-full h-screen justify-between">
            <div className="flex justify-center mt-10 space-x-8">
                <div className="hidden md:block w-[380.319px] h-[581.146px] bg-[url('/signin/background.png')] bg-[length:468.32px_634.15px] bg-[left_-46px_top]">
                    <div ref={imageContainerRef} className="relative mt-[27px] ml-[112px]">
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/1.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/2.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/3.png" alt="" width={250} height={538.84} />
                        <img className="absolute opacity-0 transition-all duration-1000" src="/signin/4.png" alt="" width={250} height={538.84} />
                    </div>
                </div>

                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col items-center space-y-8 w-[350px] h-[408px] border-[1px]">
                        <div className="mt-10">
                            <img src="/signin/instagram-logo.svg" alt="" width={175} height={51} />
                        </div>

                        <div className="flex flex-col items-center space-y-4 text-[14px] text-[#385185] font-[500]">
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <div key={provider.name} className="flex items-center space-x-2 cursor-pointer" onClick={() => signIn(provider.id)}>
                                        <div>
                                            <img src={`/signin/${provider.name.toLowerCase()}-logo.png`} alt="" width={20} height={20} />
                                        </div>

                                        <div>
                                            Log in with {provider.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4 text-[14px]">
                        <div>
                            Get the app.
                        </div>

                        <div className="flex space-x-2">
                            <img src="/signin/google.png" alt="" width={134} height={40} />
                            <img src="/signin/microsoft.png" alt="" width={111} height={40} />
                        </div>
                    </div>
                </div>

            </div>

            <BottomInfoSection />
        </div>
    )
}