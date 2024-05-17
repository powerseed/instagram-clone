import { useState } from "react";
import BottomBarButton from "./bottom_bar_button";
import BottomBarLink from "./bottom_bar_link";
import CreatePostWindow from "../create_post_window";

export default function BottomBar() {
    let [isCreatePostWindowOpen, setIsCreatePostWindowOpen] = useState(false);

    function onCreateClick() {
        setIsCreatePostWindowOpen(true);
    }

    return (
        <div className="fixed bottom-0 flex justify-around w-screen h-[var(--bottom-bar-height)] border-t-[1px] md:hidden bg-white">
            <BottomBarLink
                href='/'
                text='Home'
                unselected_icon='/side_and_bottom_bar/home.svg'
                selected_icon='/side_and_bottom_bar/home-selected.svg'
            />
            <BottomBarLink
                href='/explore'
                text='Explore'
                unselected_icon='/side_and_bottom_bar/explore.svg'
                selected_icon='/side_and_bottom_bar/explore-selected.svg'
            />
            <BottomBarLink
                href='/reels'
                text='Reels'
                unselected_icon='/side_and_bottom_bar/reels.svg'
                selected_icon='/side_and_bottom_bar/reels-selected.svg'
            />
            <div onClick={onCreateClick}>
                <BottomBarButton
                    text='Create'
                    unselected_icon='/side_and_bottom_bar/create.svg'
                    selected_icon='/side_and_bottom_bar/create.svg'
                />
            </div>
            <BottomBarLink
                href='/direct/inbox'
                text='Messages'
                unselected_icon='/side_and_bottom_bar/messages.svg'
                selected_icon='/side_and_bottom_bar/messages-selected.svg'
            />
            <BottomBarLink
                href='/profile'
                text='Profile'
                unselected_icon='/profile.png'
                selected_icon={undefined}
            />
            {
                isCreatePostWindowOpen && <CreatePostWindow closeThisWindow={() => setIsCreatePostWindowOpen(false)} />
            }
        </div>
    )
}