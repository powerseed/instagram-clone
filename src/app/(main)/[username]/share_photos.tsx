export default function SharePhotos() {
    return (
        <>
            <div className="flex justify-center items-center rounded-full w-[65px] h-[65px] border-[2px] border-black">
                <img src="/profile/camera.svg" alt="" width={50} height={50} />
            </div>

            <div className="text-[30px] font-[800] text-center">
                Share Photos
            </div>

            <div className="text-center text-[14px]">
                When you share photos, they will appear on your profile.
            </div>

            <div className="text-center text-[14px] font-[500] text-sky-500">
                <a href="">Share your first photo</a>
            </div>
        </>
    )
}