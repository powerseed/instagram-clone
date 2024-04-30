import styles from './styles.module.css';

export default function NotificationsPanel() {
    return (
        <div className={`${styles.search_panel} flex flex-col bg-white h-screen w-[400px] rounded-tr-2xl rounded-br-2xl border-r-[1px] border-slate-200 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]`}>
            <div className='px-6 py-5 text-[24px] font-[700]'>
                Notifications
            </div>

            <div className='flex px-5 h-[60px] hover:bg-gray-100 items-center space-x-3 cursor-pointer'>
                <div className=''>
                    <img className="avatar" src='/home/mitchmackieyyc.jpg' alt="avatar" width={44} height={44} />
                </div>

                <div className='flex flex-col grow text-[13px]'>
                    <div className='font-bold leading-tight'>
                        Follow request
                    </div>

                    <div className='text-gray-400 leading-tight'>
                        mitchmackieyyc
                    </div>
                </div>

                <div className='flex items-center space-x-[-10px]'>
                    <div>
                        <img src="/side_and_bottom_bar/blue-dot.svg" alt="blue-dot" width={40} height={40} />
                    </div>

                    <div>
                        <img src="/side_and_bottom_bar/right-arrow.svg" alt="right-arrow" width={30} height={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}