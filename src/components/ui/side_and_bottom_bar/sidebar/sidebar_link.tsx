import Link from 'next/link';
import styles from '../styles.module.css';
import { usePathname } from 'next/navigation';

type SidebarLinkProps = {
    href: string,
    text: string,
    unselected_icon: string,
    selected_icon: string | undefined,
    isCollapsed: boolean,
    onClick: () => void
}

export default function SidebarLink(props: SidebarLinkProps) {
    const currentPath = usePathname();

    return (
        <Link href={props.href} onClick={props.onClick}>
            <div className='h-[56px] overflow-hidden'>
                <div className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`}>
                    <div className="shrink-0 p-[12px]">
                        <img
                            className={`w-[24px] h-[24px] transition-transform rounded-full ${props.selected_icon ? '' : (currentPath === props.href ? 'border-[2px] border-black' : '')}`}
                            src={`${props.selected_icon ? (currentPath === props.href ? props.selected_icon : props.unselected_icon) : props.unselected_icon}`}
                            alt={props.text} />
                    </div>
                    <div className={`shrink-0 items-center ${props.isCollapsed ? 'hidden' : 'flex'}`}>{props.text}</div>
                </div>
            </div>
        </Link >
    )
}