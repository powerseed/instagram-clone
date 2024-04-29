import styles from './styles.module.css';

export default function SearchPanel() {
    return (
        <div className={`${styles.search_panel} flex flex-col h-screen w-[400px] rounded-tr-2xl rounded-br-2xl border-r-[1px] border-slate-200 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]`}>
            <div className='flex flex-col pt-[23px] px-[15px] space-y-8'>
                <div className='text-[24px] font-[600] pl-[10px]'>
                    Search
                </div>

                <div className='h-[40px] rounded-lg p-[5px] bg-gray-200 flex justify-center items-center'>
                    <input className='outline-none bg-gray-200 w-11/12' placeholder='Search' />
                </div>
            </div>

            <div className='grow flex flex-col pt-[25px] px-6 space-y-6'>
                <hr className='mx-[-25px]' />

                <div className='flex justify-between font-[500]'>
                    <div className='text-[15px]'>
                        Recent
                    </div>

                    <div className='text-[13px] text-sky-500'>
                        Clear all
                    </div>
                </div>

                <div className='flex grow justify-center items-center'>
                    <div className='text-gray-500 text-[14px] font-medium'>
                        No recent searches.
                    </div>
                </div>
            </div>
        </div>
    )
}