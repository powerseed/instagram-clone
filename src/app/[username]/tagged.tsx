export default function Tagged() {
    return (
        <>
            <div className="flex justify-center items-center rounded-full w-[65px] h-[65px] border-[2px] border-black">
                <img src="/profile/photo-unselected.svg" alt="" width={40} height={40} />
            </div>

            <div className="text-[30px] font-[800] text-center">
                Photos of you
            </div>

            <div className="text-center text-[14px]">
                When people tag you in photos, they'll appear here.
            </div>
        </>
    )
}