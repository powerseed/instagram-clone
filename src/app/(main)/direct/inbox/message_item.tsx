import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

type MessageItemProps = {
    id: number,
    avatar: string,
    nickname: string,
    lastActiveOn: Date,
    isSelected: boolean,
    selectThisMessageItem: (selectedMessageItemId: number) => void
}

export default function MessageItem (props: MessageItemProps) {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    function handleClick() {
        props.selectThisMessageItem(props.id);
    }
    
    return (
        <div className={`px-[25px] py-[5px] flex hover:bg-gray-100 ${props.isSelected ? 'bg-gray-100' : 'bg-white'} cursor-pointer space-x-1`} onClick={handleClick}>
            <div className='flex justify-center items-center w-[65.5px] h-[65.5px]'>
                <img className='avatar' src={props.avatar} width={56} height={56} />
            </div>

            <div className='hidden lg:flex flex-col text-[14px] justify-center'>
                <div>
                    {props.nickname}
                </div>

                <div className='text-[12px] text-gray-400'>
                    Active <ReactTimeAgo date={props.lastActiveOn} timeStyle="twitter" />
                </div>
            </div>
        </div>
    )
}