import { forwardRef, useImperativeHandle, useState } from "react"
import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

type MessageItemProps = {
    id: number,
    avatar: string,
    nickname: string,
    last_active_on: Date,
    isSelected: boolean,
    selectThisMessageItem: (selectedMessageItemId: number) => void
}

export type MessageItemHandle = {
    unselect: () => void
}

const MessageItem = forwardRef<MessageItemHandle, MessageItemProps>((props: MessageItemProps, ref) => {
    // let [isSelected, setIsSelected] = useState(false);
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    function handleClick() {
        props.selectThisMessageItem(props.id);
        // setIsSelected(true);
    }

    // useImperativeHandle(ref, () => {
    //     return {
    //         unselect() {
    //             setIsSelected(false);
    //         }
    //     }
    // });
    
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
                    Active <ReactTimeAgo date={props.last_active_on} timeStyle="twitter" />
                </div>
            </div>
        </div>
    )
})

MessageItem.displayName = 'MessageItem';
export default MessageItem;