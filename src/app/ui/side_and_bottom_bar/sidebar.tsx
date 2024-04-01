import { logo, buttons_group1, buttons_group2 } from "./buttons";
import './style.css';

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col pt-[8px] pb-[20px] px-[12px] border-r-[1px] h-screen w-[72px] xl:w-[244px]">
            <div className="h-[92px] mt-[14px]">
                <div className="button p-[12px] rounded-lg hover:bg-gray-200 transition-colors xl:hidden">
                    <img className="transition-transform" src={`/side_and_bottom_bar/${logo.image_icon}`} alt="Instagram" width="24" height="24" />
                </div>

                <div className="hidden xl:block px-[12px] pt-[25px] pb-[19px]">
                    <img src={`/side_and_bottom_bar/${logo.text_icon}`} alt="Instagram" width='103' height='29' />
                </div>
            </div>

            <div className="grow flex-col space-y-2">
                {buttons_group1.map(button => {
                    return (
                        <div className="button flex rounded-lg hover:bg-gray-200 transition-colors">
                            <div className="p-[12px]">
                                <img className="transition-transform" src={`/side_and_bottom_bar/${button.svg}`} alt={button.text} width='24' height='24' />
                            </div>
                            <div className="hidden xl:flex items-center">{button.text}</div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-col space-y-2">
                {buttons_group2.map(button => {
                    return (
                        <div className="button flex rounded-lg hover:bg-gray-200 transition-colors">
                            <div className="p-[12px]">
                                <img className="transition-transform" src={`/side_and_bottom_bar/${button.svg}`} alt={button.text} width='24' height='24' />
                            </div>
                            <span className="hidden xl:flex items-center">{button.text}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}