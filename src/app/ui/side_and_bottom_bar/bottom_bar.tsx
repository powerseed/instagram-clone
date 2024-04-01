import { sidebar_buttons_group1, bottom_bar_buttons } from "./buttons";
import './style.css';

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 flex justify-around w-screen border-t-[1px] md:hidden">
            {sidebar_buttons_group1.map(button => {
                if (!bottom_bar_buttons.includes(button.text)) {
                    return;
                }

                return (
                    <div className="button p-[12px]">
                        <img className="transition-transform" src={`/side_and_bottom_bar/${button.svg}`} alt={button.text} width='24' height='24' />
                    </div>
                )
            })}
        </div>
    )
}