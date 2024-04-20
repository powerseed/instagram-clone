export default function Share() {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/20 z-30">
            <div className="fixed top-0 md:top-1/2 left-0 md:left-1/2 w-screen md:w-[550px] h-screen md:h-[520px] md:translate-y-[-50%] md:translate-x-[-50%] flex flex-col bg-white md:rounded-xl">
                <div className="flex flex-0 justify-center items-center h-11">
                    <div className="font-bold">
                        Share
                    </div>

                    <div className="absolute top-0 right-0 translate-y-[25%] translate-x-[-25%] w-[30px] h-[30px] cursor-pointer">
                        <img src="/home/close-black.svg" alt="Close" />
                    </div>
                </div>

                <hr />

                <div className="flex flex-0 h-10 items-center space-x-5 px-4">
                    <div className="font-medium">
                        To:
                    </div>

                    <div className="text-[13px]">
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <hr />

                <div className="flex-1 px-4 py-3">
                    <div className="font-medium text-[13px]">
                        Suggested
                    </div>

                    {

                    }
                </div>

                <hr />

                <div className="flex flex-0 items-center px-4 h-16">
                    <div className="flex justify-center items-center rounded-md w-full h-[32px] bg-sky-200 text-[13px] font-medium text-gray-100">Send</div>
                </div>
            </div>
        </div>
    )
}