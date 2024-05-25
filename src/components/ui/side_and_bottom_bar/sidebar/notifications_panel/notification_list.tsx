import { ContentTypes } from "./content_types"
import { notifications } from './content'

type NotificationListProps = {
    goToSpecificNotification: (contentType: ContentTypes, avatar: string, username: string, nickname: string) => void,
}

export default function NotificationList(props: NotificationListProps) {
    function handleNotificationClick(avatar: string, username: string, nickname: string) {
        props.goToSpecificNotification(ContentTypes.FOLLOW_REQUEST, avatar, username, nickname);
    }

    return (
        <div className='flex flex-col'>
            <div className='px-6 py-5 text-[24px] font-[700]'>
                Notifications
            </div>

            <div className="flex flex-col space-y-1">
                {
                    notifications.map((notification) => {
                        return (
                            <div key={notification.username} className='flex px-5 h-[60px] hover:bg-gray-100 items-center space-x-3 cursor-pointer'
                                onClick={() => handleNotificationClick(notification.avatar, notification.username, notification.nickname)}
                            >
                                <div>
                                    <img className="avatar" src={notification.avatar} alt="avatar" width={44} height={44} />
                                </div>

                                <div className='flex flex-col grow text-[13px]'>
                                    <div className='font-bold leading-tight'>
                                        {notification.content_type}
                                    </div>

                                    <div className='text-gray-400 leading-tight'>
                                        {notification.username}
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
                        )
                    })
                }
            </div>
        </div>
    )
}