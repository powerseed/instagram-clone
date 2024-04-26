import BottomBarButton from "./bottom_bar_button";
import BottomBarLink from "./bottom_bar_link";

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 flex justify-around w-screen border-t-[1px] md:hidden bg-white">
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
            <BottomBarButton
                text='Create'
                unselected_icon='/side_and_bottom_bar/create.svg'
                selected_icon='/side_and_bottom_bar/create.svg'
            />
            <BottomBarLink
                href='/messages'
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
        </div>
    )
}