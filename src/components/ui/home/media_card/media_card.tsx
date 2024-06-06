'use client';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './media_slider_in_card_styles.css';
import Header from './header';
import OperationButtons from './operation_buttons';
import Textarea, { TextareaHandle } from './textarea';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import CommentWindow from "./comment_window";

type MediaCardProps = {
    postId: string,
    avatarUrl: string,
    username: string,
    isVerified: boolean,
    created_on: Date,
    text: string | undefined,
    mediaUrls: string[],
    likedBy: string | undefined,
    commentNumber: number
}

export default function MediaCard(props: MediaCardProps) {
    const { data: session } = useSession();
    let textareaRef = useRef<TextareaHandle>(null);
    let [isCommentOpen, setIsCommentOpen] = useState(false);

    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    const SliderNavigationButton = (
        props: {
            children: JSX.Element;
            slideCount?: number;
            currentSlide?: number;
        }
    ) => {
        const { children, currentSlide, slideCount, ...others } = props;
        return (
            <span {...others}>
                {children}
            </span>
        );
    };

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        autoplay: false,
        draggable: false,
        className: "bg-black rounded-none sm:rounded"
    };

    async function postComment(text: string) {
        let response = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user?.id,
                postId: props.postId,
                createdOn: new Date,
                text
            }),
        });

        if (!response.ok) {
            alert('Failed to create the comment. ');
        }
        else {
            textareaRef.current?.clearTextarea();
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-3 w-[450px] max-w-full h-max-[850px]">
                <div className='px-4 sm:px-0'>
                    <Header
                        avatarUrl={props.avatarUrl}
                        username={props.username}
                        isVerified={props.isVerified}
                        created_on={props.created_on}
                        isDisplayedInComment={false}
                    />
                </div>


                <div className='media-slider-in-card'>
                    <Slider {...settings}
                        prevArrow={
                            <SliderNavigationButton>
                                <div className="next-slick-arrow">
                                </div>
                            </SliderNavigationButton>
                        }
                        nextArrow={
                            <SliderNavigationButton>
                                <div className="next-slick-arrow">
                                </div>
                            </SliderNavigationButton>
                        }
                    >
                        {props.mediaUrls.map((mediaUrl, index) => {
                            return (
                                <div key={index} className='mb-[-7px]'>
                                    <img className='rounded-none sm:rounded' src={mediaUrl} alt={index.toString()} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='px-4 sm:px-0'>
                    <OperationButtons
                        avatar={props.avatarUrl}
                        username={props.username}
                        isVerified={props.isVerified}
                        created_on={props.created_on}
                        annotation={props.text}
                        images={props.mediaUrls}
                        isDisplayedInComment={false}
                        onCommentClick={() => setIsCommentOpen(!isCommentOpen)}
                    />
                </div>

                {
                    props.likedBy && <div className='text-[14px] px-4 sm:px-0'>
                        Liked by <span className='font-medium'>{props.likedBy}</span> and <span className='font-medium'>others</span>
                    </div>
                }

                {
                    props.text && <div className='text-[14px] px-4 sm:px-0'>
                        {props.text}
                    </div>
                }

                <div className='text-[13px] text-gray-500 !mt-[10px] px-4 sm:px-0 cursor-pointer' onClick={() => setIsCommentOpen(!isCommentOpen)}>
                    View all {props.commentNumber} comments
                </div>

                <div className='hidden sm:block'>
                    <Textarea ref={textareaRef} isEmojiPickerBeforeInputField={false} placeholder="Add a comment..." handlePostClick={postComment} />
                </div>

                <hr />
            </div>

            {
                isCommentOpen &&
                <CommentWindow
                    postId={props.postId}
                    avatar={props.avatarUrl}
                    username={props.username}
                    isVerified={props.isVerified}
                    created_on={props.created_on}
                    images={props.mediaUrls}
                    closeCommentPanel={() => setIsCommentOpen(false)}
                />
            }
        </>
    )
}