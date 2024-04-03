import './style.css';

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <div className="mt-[16px] bg-black max-w-[630px] w-full">
        <div>

        </div>

        <div>

        </div>
      </div>

      <div className="hidden xl:flex flex-col w-[319px] mt-[36px] ml-[64px] px-[16px]">
        <div className="flex justify-between">
          <div className="flex">
            <div className="mr-[12px]">
              <img src="/home/profile.jpg" alt="avatar" width='44' height='44' />
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
          <div className='mb-[16px] links flex flex-wrap'>
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
  );
}