import { useState } from 'react';
import styles from './styles.module.css';

export default function SearchPanel() {
    let [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
    let [searchContent, setSearchContent] = useState<string>('');

    function handleInputFocus() {
        setIsSearchInputFocused(true);
    }

    function handleInputChange(value: string) {
        setSearchContent(value);
    }

    function handleRemoveClick() {
        setSearchContent('');
        setIsSearchInputFocused(false);
    }

    return (
        <div className={`${styles.search_panel} flex flex-col bg-white h-screen w-[400px] rounded-tr-2xl rounded-br-2xl border-r-[1px] border-slate-200 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]`}>
            <div className='flex flex-col pt-[23px] px-[15px] space-y-8'>
                <div className='text-[24px] font-[600] pl-[10px]'>
                    Search
                </div>

                <div className='h-[40px] rounded-lg px-4 bg-gray-200 flex justify-center items-center space-x-2'>
                    {
                        !isSearchInputFocused &&
                        <img src="/side_and_bottom_bar/search.svg" alt="" width={20} height={20} />
                    }

                    <input className='outline-none bg-gray-200 w-11/12' placeholder='Search'
                        value={searchContent}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onClick={handleInputFocus}
                    />

                    {
                        isSearchInputFocused &&
                        <img className='cursor-pointer' src="/side_and_bottom_bar/close-circle.svg" alt="" width={20} height={20} onClick={handleRemoveClick} />
                    }
                </div>
            </div>

            <div className='grow flex flex-col pt-[25px] px-6 space-y-6'>
                <hr className='mx-[-25px]' />

                <div className='flex justify-between font-[500]'>
                    <div className='text-[15px]'>
                        Recent
                    </div>

                    <div className='text-[13px] text-sky-500 cursor-pointer'>
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