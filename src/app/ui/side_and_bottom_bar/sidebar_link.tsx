import Link from 'next/link';
import styles from './styles.module.css';
import { usePathname } from 'next/navigation';

type SidebarLinkProps = {
    href: string,
    text: string,
    unselected_icon: string,
    selected_icon: string | undefined,
}

export default function SidebarLink(props: SidebarLinkProps) {
    const currentPath = usePathname();

    return (
        <Link href={props.href}>
            <div className='h-[56px]'>
                <div className={`${styles.button} cursor-pointer flex rounded-lg hover:bg-gray-200 transition-colors`}>
                    <div className="p-[12px]">
                        <img
                            className={`transition-transform ${props.selected_icon ? '' : (currentPath === props.href ? 'rounded-full border-[2px] border-black' : '')}`}
                            src={`${props.selected_icon ? (currentPath === props.href ? props.selected_icon : props.unselected_icon) : props.unselected_icon}`}
                            alt={props.text}
                            width='24'
                            height='24' />
                    </div>
                    <div className="hidden xl:flex items-center">{props.text}</div>
                </div>
            </div>
        </Link >
    )
}