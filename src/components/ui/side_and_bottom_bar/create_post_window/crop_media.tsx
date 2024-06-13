import { useEffect, useRef, useState } from "react"
import Cropper from "react-easy-crop";

type CropMediaProps = {
    mediaUrls: string[],
    goPreviousStep: () => void,
    goNextStep: () => void,
    setCroppedMediaFiles: (files: File[]) => void
}

type CropArea = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export default function CropMedia(props: CropMediaProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [cropperDimension, setCropperDimension] = useState<{ width: number, height: number } | undefined>(undefined);
    let [displayedCropperIndex, setDisplayedCropperIndex] = useState<number>(0);

    const mediaIndexMapsCroppedAreaPixels = useRef<Map<number, CropArea>>(new Map<number, CropArea>());

    function onCropComplete(mediaIndex: number, croppedAreaPixels: CropArea) {
        if (!isNaN(croppedAreaPixels.x) && !isNaN(croppedAreaPixels.y)) {
            mediaIndexMapsCroppedAreaPixels.current.set(mediaIndex, croppedAreaPixels);
        }

        if (!cropperDimension && croppedAreaPixels.width && croppedAreaPixels.height) {
            setCropperDimension({
                width: croppedAreaPixels.width,
                height: croppedAreaPixels.height,
            })
        }
    }

    async function getCroppedImg(imageSrc: string, index: number, cropArea: CropArea) {
        const image: HTMLImageElement = await createImage(imageSrc);

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = image.width;
        canvas.height = image.height;

        ctx!.drawImage(image, 0, 0)

        const croppedCanvas = document.createElement('canvas')
        const croppedCtx = croppedCanvas.getContext('2d')

        croppedCanvas.width = cropArea.width;
        croppedCanvas.height = cropArea.height;

        croppedCtx!.drawImage(
            canvas,
            cropArea.x,
            cropArea.y,
            cropArea.width,
            cropArea.height,
            0,
            0,
            cropArea.width,
            cropArea.height
        )

        const file: File = await new Promise((resolve) => {
            croppedCanvas.toBlob((blob) => {
                let file = new File([blob!], index + ".jpg", { type: "image/jpeg" });
                resolve(file);
            }, 'image/jpeg');
        });

        return file;
    }

    function createImage(url: string) {
        return new Promise<HTMLImageElement>((resolve) => {
            const image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');
            image.onload = function () {
                resolve(image);
            };
            image.src = url;
        })
    }

    async function handleNextClick() {
        const filesPromises = props.mediaUrls.map(async (mediaUrl, index) => {
            let croppedAreaPixels: CropArea | undefined = mediaIndexMapsCroppedAreaPixels.current.get(index);

            if (croppedAreaPixels === undefined) {
                const mediaWidth: number = await getMediaWidth(mediaUrl);

                croppedAreaPixels = {
                    x: (mediaWidth / 2) - (cropperDimension?.width! / 2),
                    y: 0,
                    width: cropperDimension?.width!,
                    height: cropperDimension?.height!,
                }
            };

            return getCroppedImg(
                mediaUrl,
                index,
                croppedAreaPixels,
            );
        })

        props.setCroppedMediaFiles(await Promise.all(filesPromises));
        props.goNextStep();
    }

    function getMediaWidth(mediaUrl: string) {
        return new Promise<number>((resolve) => {
            const image = new Image();

            image.onload = () => {
                resolve(image.width);
            };

            image.src = mediaUrl;
        })
    }

    function handleLeftArrowClick() {
        setDisplayedCropperIndex(displayedCropperIndex - 1);
    }

    function handleRightArrowClick() {
        setDisplayedCropperIndex(displayedCropperIndex + 1);
    }

    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className="flex justify-between items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]">
                <div className="cursor-pointer" onClick={props.goPreviousStep}>
                    <img src="/side_and_bottom_bar/create_post_window/left-arrow.svg" alt="Previous" width={28} height={28} />
                </div>

                <div>
                    Crop
                </div>

                <div className="cursor-pointer text-sky-500 text-[14px]" onClick={handleNextClick}>
                    Next
                </div>
            </div>

            <div className="relative grow flex justify-center items-center overflow-hidden">
                <div className={`${displayedCropperIndex === 0 ? 'hidden' : 'block'} 
                    absolute left-[10px] px-[8px] py-[8px] bg-black/[0.6] rounded-full cursor-pointer hover:opacity-80 z-10`}
                    onClick={handleLeftArrowClick}>
                    <img src="/create_post/left-arrow.svg" alt="Previous" width={16} height={16} />
                </div>

                {
                    props.mediaUrls.map((mediaUrl, index) => {
                        return <Cropper
                            key={index}
                            image={mediaUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={(croppedArea, croppedAreaPixels) => onCropComplete(index, croppedAreaPixels)}
                            onZoomChange={setZoom}
                            minZoom={1}
                            objectFit='vertical-cover'
                            style={{
                                containerStyle: {
                                    display: index === displayedCropperIndex ? 'flex' : 'none',
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '0rem 0rem 1rem 1rem'
                                },
                                mediaStyle: {
                                    maxWidth: 'unset'
                                },
                                cropAreaStyle: {
                                    width: '100%',
                                    height: '100%'
                                }
                            }}
                        />
                    })
                }

                <div className={`${displayedCropperIndex === props.mediaUrls.length - 1 ? 'hidden' : 'block'} absolute right-[10px] px-[8px] py-[8px] bg-black/[0.6] rounded-full cursor-pointer hover:opacity-80 z-10`}
                    onClick={handleRightArrowClick}>
                    <img src="/create_post/right-arrow.svg" alt="Previous" width={16} height={16} />
                </div>
            </div>
        </div>
    )
}