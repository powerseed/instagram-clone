import styles from './styles.module.css';

export default function NotificationsPanel() {
    return (
        <div className={`${styles.search_panel} flex flex-col bg-white h-screen w-[400px] rounded-tr-2xl rounded-br-2xl border-r-[1px] border-slate-200 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]`}>
            <div className='flex flex-col pt-[23px] px-[15px]'>
                Notifications
            </div>

            <div>

            </div>
        </div>
    )
}