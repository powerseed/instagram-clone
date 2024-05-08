import { useEffect, useRef } from "react";

export default function MoreMenu({ closeThisMenu }: { closeThisMenu: () => void }) {
    const thisRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('wheel', closeThisMenu);

        const clickEventListener = (event: Event) => {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisMenu();
            }
        };

        document.addEventListener('click', clickEventListener);

        return () => {
            document.removeEventListener('wheel', closeThisMenu);
            document.removeEventListener('click', clickEventListener);
        }
    })

    return (
        <div ref={thisRef} className="w-[295px] h-[366px] px-[10px] py-[10px] flex flex-col content-stretch justify-stretch bg-white text-[14px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer text-red-500">
                Report
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer text-sky-500">
                Follow
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer">
                Go to post
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer">
                Share to...
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer">
                Copy link
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer">
                Embed
            </div>

            <div className="px-[15px] grow flex items-center rounded-md hover:bg-gray-100 cursor-pointer">
                About this account
            </div>
        </div>
    )
}