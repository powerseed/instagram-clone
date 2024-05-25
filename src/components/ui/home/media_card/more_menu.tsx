import { MouseEvent, useContext, useEffect, useRef } from "react";
import styles from './styles.module.css';
import { OverlayContext } from "@/app/overlay_context_provider";

export default function MoreMenu({ closeMoreMenu }: { closeMoreMenu: Function }) {
    let moreMenuRef = useRef<HTMLDivElement>(null);
    const { setIsOverlayOpen } = useContext(OverlayContext);

    useEffect(() => {
        setIsOverlayOpen(true);

        let closeMenuEventListener = (event: Event) => {
            if (!moreMenuRef.current?.contains(event.target as Node)) {
                closeMoreMenu();
            }
        };

        document.addEventListener('click', closeMenuEventListener);

        return () => {
            setIsOverlayOpen(false);
            document.removeEventListener('click', closeMenuEventListener);
        }
    })

    function handleMouseDown(event: MouseEvent) {
        let target = event.target as HTMLDivElement;
        target.style.backgroundColor = 'rgb(209 213 219)';

        if (target.id === 'report') {
            target.style.borderRadius = '1rem 1rem 0 0';
        }
        else if (target.id === 'cancel') {
            target.style.borderRadius = '0 0 1rem 1rem';
        }
    }

    function handleMouseUp(event: MouseEvent) {
        let target = event.target as HTMLDivElement;
        target.style.backgroundColor = 'rgb(255 255 255)';
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 !my-0 w-screen h-screen bg-black/70 z-[var(--menus-z-index)]">
            <div className="fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
                <div ref={moreMenuRef} className={`${styles.popup_scaling_down} flex flex-col justify-evenly rounded-2xl w-[400px] h-[336px] bg-white opacity-100 text-[14px] divide-y divide-solid`}>
                    <div id="report" className="flex-1 flex items-center justify-center cursor-pointer text-red-600 font-semibold"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        Report
                    </div>

                    <div id="go-to-post" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        Go to post
                    </div>

                    <div id="share-to" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        Share to...
                    </div>

                    <div id="copy-link" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        Copy link
                    </div>

                    <div id="embed" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        Embed
                    </div>

                    <div id="about-this-account" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                    >
                        About this account
                    </div>

                    <div id="cancel" className="flex-1 flex items-center justify-center cursor-pointer"
                        onMouseDown={(event) => handleMouseDown(event)}
                        onMouseUp={(event) => handleMouseUp(event)}
                        onClick={() => closeMoreMenu()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}