import ReactTimeAgo from "react-time-ago";
import MoreMenu from "./more_menu";
import { useState } from "react";
import styles from './styles.module.css';

type HeaderProps = {
    avatarUrl: string,
    username: string,
    isVerified: boolean,
    created_on: Date,
    isDisplayedInComment: boolean
}

export default function Header(props: HeaderProps) {
    let [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    return (
        <div className="flex justify-between w-full">
            <div className="flex space-x-2">
                <div className="avatar-container flex items-center justify-center w-[42px] h-[42px]">
                    <img className="avatar" src={props.avatarUrl} alt="avatar" width={38} height={38} />
                </div>

                <div className="flex flex-col text-[12px] justify-center">
                    <div className="flex space-x-1">
                        <div className="font-semibold">
                            {props.username}
                        </div>

                        {
                            props.isVerified &&
                            <div className="w-[15px] h-[15px]">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="verified" className={`${styles.icon} glyph`} fill="#0000ff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" style={{ fill: '#19BDFF' }}></path></g></svg>
                            </div>
                        }

                        {
                            !props.isDisplayedInComment &&
                            <div className={`text-gray-400 ${styles.create_date}`}>
                                <ReactTimeAgo date={props.created_on} timeStyle="twitter" />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <img className='cursor-pointer' src="/home/three-dot-button.svg" alt="more" width={24} height={24} onClick={() => setIsMoreMenuOpen(true)} />
            </div>

            {
                isMoreMenuOpen && <MoreMenu closeMoreMenu={() => setIsMoreMenuOpen(false)} />
            }
        </div>
    )
}