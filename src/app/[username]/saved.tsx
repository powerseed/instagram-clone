export default function Saved() {
    return (
        <>
            <div className="flex justify-center items-center rounded-full w-[65px] h-[65px] border-[2px] border-black">
                <img src="/profile/save-unselected.svg" alt="" width={50} height={50} />
            </div>

            <div className="text-[30px] font-[800] text-center">
                Save
            </div>

            <div className="text-center text-[14px]">
                Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
            </div>
        </>
    )
}