import { useSession } from "next-auth/react";
import BottomBarLink from "./bottom_bar_link";

export default function BottomBar() {
    const { data: session } = useSession();

    if (!session) {
        return;
    }

    return (
        <div className="fixed bottom-0 flex justify-around w-screen h-[var(--bottom-bar-height)] border-t-[1px] md:hidden bg-white z-[var(--bars-z-index)]">
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
            <BottomBarLink
                href='/direct/inbox'
                text='Messages'
                unselected_icon='/side_and_bottom_bar/messages.svg'
                selected_icon='/side_and_bottom_bar/messages-selected.svg'
            />
            <BottomBarLink
                href={'/' + session.user?.name}
                text='Profile'
                unselected_icon={session.user?.image ? session.user?.image : '/profile.jpg'}
                selected_icon={undefined}
            />
        </div>
    )
}