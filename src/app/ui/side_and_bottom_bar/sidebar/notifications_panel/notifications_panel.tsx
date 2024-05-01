import { useState } from 'react';
import styles from '../../styles.module.css';
import EntryPage from './notification_list';
import FollowRequest, { FollowRequestProps } from './follow_request';
import { ContentTypes } from './content_types';

export default function NotificationsPanel() {
    let [contentType, setContentType] = useState<ContentTypes>(ContentTypes.NOTIFICATION_LIST);
    let [followRequestProps, setFollowRequestProps] = useState<FollowRequestProps | undefined>(undefined);

    function goToSpecificNotification(contentType: ContentTypes, avatar: string, username: string, nickname: string) {
        switch (contentType) {
            case ContentTypes.FOLLOW_REQUEST:
                setFollowRequestProps({
                    avatar,
                    username,
                    nickname,
                    returnToList
                })
        }

        setContentType(contentType);
    }

    function returnToList() {
        setContentType(ContentTypes.NOTIFICATION_LIST);
    }

    return (
        <div className={`${styles.search_panel}  bg-white h-screen w-[400px] rounded-tr-2xl rounded-br-2xl border-r-[1px] border-slate-200 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]`}>
            {contentType === ContentTypes.NOTIFICATION_LIST && <EntryPage goToSpecificNotification={goToSpecificNotification} />}
            {contentType === ContentTypes.FOLLOW_REQUEST && <FollowRequest {...followRequestProps!} />}
        </div>
    )
}