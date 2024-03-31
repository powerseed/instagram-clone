import { logo, buttons_group1, buttons_group2 } from "./buttons";

export default function Sidebar() {
    return (
        <div className="flex flex-col pt-[8px] pb-[20px] px-[12px] border-r-[1px] h-screen w-[72px] xl:w-[244px]">
            <div className="h-[92px] p-[12px] mt-[14px]">
                <img className="xl:hidden" src={logo.image_icon} alt="Instagram" />
                <img className="hidden xl:block" src={logo.text_icon} alt="Instagram" width='103px' height='29px' />
            </div>

            <div className="grow">
                {buttons_group1.map(button => {
                    return (
                        <div className="flex">
                            <div className="p-[12px] my-[4px]">
                                <img src={button.svg} alt={button.text} width='24px' height='24px' />
                            </div>
                            <div className="hidden xl:flex items-center">{button.text}</div>
                        </div>
                    )
                })}
            </div>

            <div>
                {buttons_group2.map(button => {
                    return (
                        <div className="flex">
                            <div className="p-[12px] my-[4px]">
                                <img src={button.svg} alt={button.text} width='24px' height='24px' />
                            </div>
                            <span className="hidden xl:flex items-center">{button.text}</span>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}