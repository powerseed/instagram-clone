'use client';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './media_slider_in_card_styles.css';
import Header from './header';
import OperationButtons from './operation_buttons';
import Textarea from './textarea';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type MediaCardProps = {
    avatar: string,
    username: string,
    isVerified: boolean,
    created_on: Date,
    annotation: string | undefined,
    images: string[],
    likedBy: string,
    commentNumber: number
}

export default function MediaCard(props: MediaCardProps) {
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

    return (
        <>
            <div className="flex flex-col space-y-3 w-[450px] max-w-full h-max-[850px]">
                <div className='px-4 sm:px-0'>
                    <Header
                        avatar={props.avatar}
                        username={props.username}
                        isVerified={props.isVerified}
                        created_on={props.created_on}
                        annotation={props.annotation}
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
                        {props.images.map((image, index) => {
                            return (
                                <div key={index} className='mb-[-7px]'>
                                    <img className='rounded-none sm:rounded' src={`/home/${image}`} alt={index.toString()} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='px-4 sm:px-0'>
                    <OperationButtons
                        avatar={props.avatar}
                        username={props.username}
                        isVerified={props.isVerified}
                        created_on={props.created_on}
                        annotation={props.annotation}
                        images={props.images}
                        isDisplayedInComment={false}
                    />
                </div>

                <div className='text-[14px] px-4 sm:px-0'>
                    Liked by <span className='font-medium'>{props.likedBy}</span> and <span className='font-medium'>others</span>
                </div>

                <div className='text-[13px] text-gray-500 !mt-[5px] px-4 sm:px-0'>
                    View all {props.commentNumber} comments
                </div>

                <div className='hidden sm:block'>
                    <Textarea isEmojiPickerBeforeInputField={false} placeholder="Add a comment..." />
                </div>

                <hr />
            </div>
        </>
    )
}