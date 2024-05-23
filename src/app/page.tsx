'use client';

import styles from './styles.module.css';
import './user_slider_styles.css'
import './globals.css';
import { slides, posts } from './content';
import MediaCard from './ui/home/media_card/media_card';
import Slider from "react-slick";

export default function Home() {
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
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    autoplay: false,
    draggable: false,
  };

  return (
    <div className="max-w-full flex flex-col justify-center w-full mb-[calc(var(--bottom-bar-height)+24px)] md:mb-[24px]">
      <div className='max-w-full flex justify-center mb-10'>
        <div className="max-w-full mt-[16px] w-[630px] ">
          <div className="user-slider py-[8px] mb-[24px]">
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
              {
                slides.map(slide => {
                  return (
                    <div key={slide.text} className='!flex flex-col items-center space-y-1 !w-[70px] cursor-pointer'>
                      <div className='avatar-container flex justify-center items-center w-[65.5px] h-[65.5px]'>
                        <img className='avatar' src={`/home/${slide.img}`} alt={slide.text} width={62} height={62} />
                      </div>

                      <div className='flex justify-center w-full'>
                        <p className='text-[11px] truncate'>{slide.text}</p>
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>

          <div className='flex flex-col space-y-5 items-center w-full'>
            {
              posts.map((post, index) => {
                return (
                  <MediaCard
                    key={index}
                    avatar={post.avatar}
                    username={post.username}
                    isVerified={post.isVerified}
                    created_on={post.created_on}
                    annotation={post.annotation}
                    images={post.images}
                    likedBy={post.likedBy}
                    commentNumber={post.commentNumber}
                  />
                )

              })
            }
          </div>
        </div>

        <div className="hidden xl:flex flex-col w-[319px] mt-[36px] ml-[64px] px-[16px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="mr-[12px]">
                <img src="/profile.jpg" alt="avatar" width='44' height='44' />
              </div>

              <div className="text-[14px]">
                <a href="" className="font-medium">walterwhite</a>
                <p className="text-gray-500">WalterWhite</p>
              </div>
            </div>

            <div className="flex items-center text-[12px]">
              <a href="" className="text-sky-500 hover:text-black font-medium">Switch</a>
            </div>
          </div>

          <div className="flex-col mt-[24px] mb-[8px] h-[351px]">
            <div className="flex justify-between w-full font-medium mb-4">
              <div className="text-[14px] text-gray-500">
                Suggested for you
              </div>

              <div className="text-[12px]">
                <a href="" className="hover:text-gray-500">See All</a>
              </div>
            </div>

            <div className='flex-col space-y-4 pl-1'>
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-[12px]">
                    <img className='rounded-full' src="/home/fernandesjunior806.jpg" alt="avatar" width='44' height='44' />
                  </div>

                  <div>
                    <a href="" className="text-[13px] font-medium">fernandesjunior806</a>
                    <p className="text-gray-500 text-[12px]">Followed by hesam_mew</p>
                  </div>
                </div>

                <div className="flex items-center text-[12px]">
                  <a href="" className="text-sky-500 hover:text-black font-medium">Follow</a>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-[12px] rounded-full">
                    <img className='rounded-full' src="/home/tacoweekyyc.jpg" alt="avatar" width='44' height='44' />
                  </div>

                  <div>
                    <a href="" className="text-[13px] font-medium">tacoweekyyc</a>
                    <p className="text-gray-500 text-[12px]">Suggested for you</p>
                  </div>
                </div>

                <div className="flex items-center text-[12px]">
                  <a href="" className="text-sky-500 hover:text-black font-medium">Follow</a>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-[12px]">
                    <img className='rounded-full' src="/home/jose_montes_martinez.jpg" alt="avatar" width='44' height='44' />
                  </div>

                  <div>
                    <a href="" className="text-[13px] font-medium">jose_montes_martinez</a>
                    <p className="text-gray-500 text-[12px]">Suggested for you</p>
                  </div>
                </div>

                <div className="flex items-center text-[12px]">
                  <a href="" className="text-sky-500 hover:text-black font-medium">Follow</a>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-[12px]">
                    <img className='rounded-full' src="/home/blessy_diaries.jpg" alt="avatar" width='44' height='44' />
                  </div>

                  <div>
                    <a href="" className="text-[13px] font-medium">blessy_diaries</a>
                    <p className="text-gray-500 text-[12px]">Suggested for you</p>
                  </div>
                </div>

                <div className="flex items-center text-[12px]">
                  <a href="" className="text-sky-500 hover:text-black font-medium">Follow</a>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-[12px]">
                    <img className='rounded-full' src="/home/survivingrat.jpg" alt="avatar" width='44' height='44' />
                  </div>

                  <div>
                    <a href="" className="text-[13px] font-medium">survivingrat</a>
                    <p className="text-gray-500 text-[12px]">Suggested for you</p>
                  </div>
                </div>

                <div className="flex items-center text-[12px]">
                  <a href="" className="text-sky-500 hover:text-black font-medium">Follow</a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-slate-300 text-[12px]">
            <div className={`${styles.links} mb-[16px] flex flex-wrap`}>
              <a href="">About</a>
              <a href="">Help</a>
              <a href="">Press</a>
              <a href="">API</a>
              <a href="">Jobs</a>
              <a href="">Privacy</a>
              <a href="">Terms</a>
              <a href="">Locations</a>
              <a href="">Language</a>
              <a href="">Meta Verified</a>
            </div>

            <div className="uppercase">
              © 2024 Instagram from Meta
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center w-full space-y-4 mb-10 text-[13px] text-gray-500'>
        <div className='w-full flex justify-center flex-wrap'>
          <div className='mx-1 mb-1'>Meta</div>
          <div className='mx-1 mb-1'>About</div>
          <div className='mx-1 mb-1'>Blog</div>
          <div className='mx-1 mb-1'>Jobs</div>
          <div className='mx-1 mb-1'>Help</div>
          <div className='mx-1 mb-1'>API</div>
          <div className='mx-1 mb-1'>Privacy</div>
          <div className='mx-1 mb-1'>Terms</div>
          <div className='mx-1 mb-1'>Locations</div>
          <div className='mx-1 mb-1'>Instagram Lite</div>
          <div className='mx-1 mb-1'>Threads</div>
          <div className='mx-1 mb-1'>Contact Uploading & Non-Users</div>
          <div className='mx-1 mb-1'>Meta Verified</div>
        </div>

        <div>
          © 2024 Instagram from Meta
        </div>
      </div>
    </div>
  );
}