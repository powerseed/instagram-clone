import { Link } from 'lucide-react';
import styles from './styles.module.css';

type BottomBarButtonPorps = {
    text: string,
    unselected_icon: string,
    selected_icon: string
}

export default function BottomBarButton(props: BottomBarButtonPorps) {
    return (
        <div className={`${styles.button} cursor-pointer p-[12px]`} key={props.text}>
            <img className="transition-transform" src={`${props.unselected_icon}`} alt={props.text} width='24' height='24' />
        </div>
    )
}