import styles from '../styles.module.css';
import { forwardRef, useImperativeHandle, useState } from 'react';

type SidebarButtonProps = {
    text: string,
    unselected_icon: string,
    selected_icon: string | undefined,
    isCollapsed: boolean,
    onClick: (isOpening: boolean) => void
}

export type SidebarButtonHandle = {
    setIsSelectedFalse: () => void;
};

const SidebarButton = forwardRef<SidebarButtonHandle, SidebarButtonProps>((props: SidebarButtonProps, ref) => {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        const newValue = !isSelected;
        props.onClick(newValue);
        setIsSelected(newValue);
    }

    useImperativeHandle(ref, () => {
        return {
            setIsSelectedFalse() {
                setIsSelected(false);
            }
        }
    })

    return (
        <div className='h-[56px] overflow-hidden'>
            <div className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`} onClick={handleClick}>
                <div className="shrink-0 p-[12px]">
                    <img
                        className='w-[24px] h-[24px] transition-transform'
                        src={`${isSelected ? props.selected_icon : props.unselected_icon}`}
                        alt={props.text} />
                </div>
                <div className={`shrink-0 items-center ${props.isCollapsed ? 'hidden' : 'flex'}`}>{props.text}</div>
            </div>
        </div>
    )
});

SidebarButton.displayName = 'SidebarButton';
export default SidebarButton;