import ReactTimeAgo from "react-time-ago"
import LikeButton from "./like_button"

type CommentProps = {
    username: string,
    avatar: string,
    content: string,
    created_on: Date,
    like_count: number,
    reply_count: number
}

export default function Comment(props: CommentProps) {
    return (
        <div className="flex space-x-4 my-5">
            <div className="flex items-start w-[35px] h-[35px] flex-none">
                <img className="rounded-full" src={props.avatar} alt="" />
            </div>

            <div className="flex flex-col grow space-y-2">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                        <div className="text-[14px]">
                            <div className="inline font-medium">{props.username}</div>
                            <div className="inline"> {props.content}</div>
                        </div>

                        <div className="flex text-[12px] space-x-3 text-gray-500">
                            <div className="cursor-pointer">
                                <ReactTimeAgo date={props.created_on} timeStyle="twitter" />
                            </div>

                            <div className="font-medium cursor-pointer">
                                {props.like_count} like{props.like_count == 1 ? '' : 's'}
                            </div>

                            <div className="font-medium cursor-pointer">
                                Reply
                            </div>
                        </div>
                    </div>

                    <div className="w-[14px] h-[14px] flex-none">
                        <LikeButton />
                    </div>
                </div>

                {
                    props.reply_count > 0 &&
                    <div className="flex text-[12px] font-medium text-gray-500 ml-[5px]">
                        <div className="flex items-center space-x-2">
                            <div className="w-[24px] h-[1px] border-[0.5px] border-gray-500"></div>
                            <div>
                                view replies (1)
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}