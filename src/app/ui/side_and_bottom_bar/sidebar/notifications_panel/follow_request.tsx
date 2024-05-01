import { suggestions_for_you } from "./content"
import { ContentTypes } from "./content_types"

export type FollowRequestProps = {
    avatar: string,
    username: string,
    nickname: string,
    returnToList: () => void
}

export default function FollowRequest(props: FollowRequestProps) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-5 pt-4">
                <div className="w-[48px] h-[48px] cursor-pointer rounded-full hover:bg-gray-100 flex justify-center items-center" onClick={props.returnToList}>
                    <img src="/side_and_bottom_bar/left-arrow.svg" alt="" width={24} height={24} />
                </div>

                <div className="text-[16px] font-[600]">
                    {ContentTypes.FOLLOW_REQUEST}
                </div>

                <div className="w-[48px] h-[48px]">
                </div>
            </div>

            <div className="flex items-center h-[60px] hover:bg-gray-100 px-5 space-x-2">
                <div>
                    <img className="avatar" src={props.avatar} alt="avatar" width={44} height={44} />
                </div>

                <div className='flex flex-col grow text-[13px]'>
                    <div className='font-bold leading-tight'>
                        {props.username}
                    </div>

                    <div className='text-gray-400 leading-tight'>
                        {props.nickname}
                    </div>
                </div>

                <div className="flex text-[14px] font-[500] space-x-2">
                    <div className="w-[83px] h-[32px] bg-sky-500 hover:bg-sky-600 rounded-lg text-white flex justify-center items-center cursor-pointer">
                        Confirm
                    </div>

                    <div className="w-[83px] h-[32px] bg-gray-200 hover:bg-gray-300 rounded-lg flex justify-center items-center cursor-pointer">
                        Delete
                    </div>
                </div>
            </div>

            <div className="px-5 space-y-6">
                <div className="text-[15px] font-[500]">
                    Suggested for you
                </div>

                <div className="flex flex-col space-y-5">
                    {
                        suggestions_for_you.map(suggestion => {
                            return (
                                <div className="flex space-x-2 items-center">
                                    <div>
                                        <img className="avatar" src={suggestion.avatar} alt="avatar" width={44} height={44} />
                                    </div>

                                    <div className='flex flex-col grow text-[13px]'>
                                        <div className='font-[500] leading-tight'>
                                            {suggestion.username}
                                        </div>

                                        <div className='text-gray-400 leading-tight'>
                                            {suggestion.nickname}
                                        </div>

                                        <div className='text-[12px] text-gray-400 leading-tight'>
                                            Suggested for you
                                        </div>
                                    </div>

                                    <div className="flex text-[14px] font-[500] space-x-2">
                                        <div className="w-[83px] h-[32px] bg-sky-500 hover:bg-sky-600 rounded-lg text-white flex justify-center items-center cursor-pointer">
                                            Follow
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="text-[13px] font-[500] text-sky-500 flex justify-center">
                    See All Suggestions
                </div>
            </div>
        </div>
    )
}