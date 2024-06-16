'use client';

import styles from './styles.module.css';
import './user_slider_styles.css'
import MediaCard from '@/components/ui/home/media_card/media_card';
import Slider from "react-slick";
import { useSession } from "next-auth/react";
import BottomInfoSection from '@/components/ui/bottom_info_section';
import { useEffect, useState } from 'react';
import { Post, Following } from '@/lib/types';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { data: session } = useSession();

  let [posts, setPosts] = useState<Post[]>([]);
  let [pageIndex, setPageIndex] = useState<number>(0);
  let [followings, setFollowings] = useState<Following[]>([]);
  let [hasInitializedPosts, setHasInitializedPosts] = useState<boolean>(false);
  let [hasInitializedFollowings, setHasInitializedFollowings] = useState<boolean>(false);

  const { ref: infiniteScrollingAnchorRef, inView: isInfiniteScrollingAnchorRefInView } = useInView()

  const pageSize: number = 1;

  async function getPosts() {
    if (!session) {
      return;
    };

    try {
      const response = await fetch(`/api/post/get?userId=${session.user.id}&pageIndex=${pageIndex}&pageSize=${pageSize}`);

      if (!response.ok) {
        throw new Error();
      }

      let { posts: newPosts } = await response.json();

      setPosts([...posts, ...newPosts]);
      setPageIndex(pageIndex + 1);
    }
    catch (error) {
      console.log(error)
    }
  }

  async function getFollowings() {
    if (!session) {
      return;
    };

    try {
      const response = await fetch(`/api/user/get?userId=${session.user.id}`);

      if (!response.ok) {
        throw new Error();
      }

      let { users } = await response.json();

      setFollowings(users);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!session) {
      return;
    }

    if (!hasInitializedPosts) {
      getPosts();
      setHasInitializedPosts(true);
    }

    if (!hasInitializedFollowings) {
      getFollowings();
      setHasInitializedFollowings(true);
    }
  }, [session]);

  useEffect(() => {
    if (isInfiniteScrollingAnchorRefInView) {
      getPosts();
    }
  }, [isInfiniteScrollingAnchorRefInView])

  if (!session) {
    return;
  }

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
                followings.map(following => {
                  return (
                    <div key={following.username} className='!flex flex-col items-center space-y-1 !w-[70px] cursor-pointer'>
                      <div className='avatar-container flex justify-center items-center w-[65.5px] h-[65.5px]'>
                        <img className='avatar' src={following.avatarUrl} alt={following.username} width={62} height={62} />
                      </div>

                      <div className='flex justify-center w-full'>
                        <p className='text-[11px] truncate'>{following.username}</p>
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>

          <div className='flex flex-col items-center w-full'>
            {
              posts && posts.map((post, index) => {
                return (
                  <div key={index} className='mb-5'>
                    <MediaCard
                      postId={post.id}
                      avatarUrl={post.avatarUrl}
                      username={post.username}
                      isVerified={post.isVerified}
                      createdOn={post.createdOn}
                      text={post.text}
                      mediaUrls={post.mediaUrls}
                      likedBy={post.likedBy}
                      commentNumber={post.commentNumber}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="hidden xl:flex flex-col w-[319px] mt-[36px] ml-[64px] px-[16px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="mr-[12px]">
                <img className='rounded-full' src={session.user.image ? session.user.image : '/profile.jpg'} alt="avatar" width='44' height='44' />
              </div>

              <div className="text-[14px]">
                <a href="" className="font-medium">{session.user.name}</a>
                <p className="text-gray-500">{session.user.name}</p>
              </div>
            </div>

            <div className="flex items-center text-[12px]">
              <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Switch</div>
            </div>
          </div>

          <div className="flex-col mt-[24px] mb-[8px] h-[351px]">
            <div className="flex justify-between w-full font-medium mb-4">
              <div className="text-[14px] text-gray-500">
                Suggested for you
              </div>

              <div className="text-[12px]">
                <div className="hover:text-gray-500 cursor-pointer">See All</div>
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
                  <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Follow</div>
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
                  <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Follow</div>
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
                  <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Follow</div>
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
                  <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Follow</div>
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
                  <div className="text-sky-500 hover:text-black font-medium cursor-pointer">Follow</div>
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

      <div ref={infiniteScrollingAnchorRef} className="invisible w-full h-[1px]"></div>

      <BottomInfoSection />
    </div>
  );
}