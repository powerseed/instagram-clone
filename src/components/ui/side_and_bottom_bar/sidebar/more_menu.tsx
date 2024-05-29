import { signOut } from "next-auth/react";
import { more_menu_buttons } from "../content";

export default function MoreMenu() {
    return (
        <div className="bg-white text-[14px] h-[425px] w-[266px] p-[8px] rounded-2xl shadow-[0px_0.5px_10px_0.5px_rgba(0,0,0,0.3)]">
            <div>
                {more_menu_buttons.map(button => {
                    return (
                        <div className="cursor-pointer p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors" key={button.text}>
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
                <div className="cursor-pointer p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors">
                    Switch accounts
                </div>

                <hr className="h-[1px] my-[8px] mx-[-8px] border-t-0 bg-neutral-100 dark:bg-white/10" />

                <div className="cursor-pointer p-[16px] flex rounded-lg hover:bg-gray-200 transition-colors" onClick={() => signOut()}>
                    Log out
                </div>
            </div>
        </div>
    )
}