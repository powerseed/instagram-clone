import styles from './styles.module.css';
import { useState } from 'react';

type SidebarButtonProps = {
    text: string,
    unselected_icon: string,
    selected_icon: string | undefined,
}

export default function SidebarButton(props: SidebarButtonProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className='h-[56px]'>
            <div className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`}>
                <div className="p-[12px]">
                    <img
                        className='transition-transform'
                        src={`${isSelected ? props.selected_icon : props.unselected_icon}`}
                        alt={props.text}
                        width='24'
                        height='24' />
                </div>
                <div className="hidden xl:flex items-center">{props.text}</div>
            </div>
        </div>
    )
}