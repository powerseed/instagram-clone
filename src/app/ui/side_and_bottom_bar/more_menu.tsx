import { more_menu_buttons } from "./buttons";

export default function MoreMenu() {
    return (
        <div className="text-[14px] h-[425px] w-[266px] p-[8px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div>
                {more_menu_buttons.map(button => {
                    return (
                        <div className="p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors">
                            <div className="mr-[12px]">
                                <img className="transition-transform" src={`/side_and_bottom_bar/${button.svg}`} alt={button.text} width='18' height='18' />
                            </div>
                            <div>{button.text}</div>
                        </div>
                    )
                })}
            </div>

            <hr className="h-[6px] my-[8px] mx-[-8px] border-t-0 bg-neutral-100 dark:bg-white/10" />

            <div>
                <div className="p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors">
                    Switch accounts
                </div>

                <hr className="h-[1px] my-[8px] mx-[-8px] border-t-0 bg-neutral-100 dark:bg-white/10" />

                <div className="p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors">
                    Log out
                </div>
            </div>
        </div>
    )
}