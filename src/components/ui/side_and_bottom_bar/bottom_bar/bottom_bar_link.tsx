import Link from 'next/link';
import styles from '../styles.module.css';
import { usePathname } from 'next/navigation';

type BottomBarLinkPorps = {
    text: string,
    href: string,
    unselected_icon: string,
    selected_icon: string | undefined
}

export default function BottomBarLink(props: BottomBarLinkPorps) {
    const currentPath = usePathname();

    return (
        <Link href={props.href}>
            <div className={`${styles.button} cursor-pointer p-[12px]`}>
                <img
                    className={`transition-transform ${props.selected_icon ? '' : (currentPath === props.href ? 'rounded-full border-[2px] border-black' : '')}`}
                    src={`${props.selected_icon ? (currentPath === props.href ? props.selected_icon : props.unselected_icon) : props.unselected_icon}`}
                    alt={props.text}
                    width={24}
                    height={24}
                />
            </div>
        </Link>
    )
}