import { useState } from "react"
import Cropper from "react-easy-crop";

type CropMediaProps = {
    mediaUrl: string,
    goPreviousStep: () => void,
    goNextStep: () => void,
    setCroppedImageUrl: (url: string) => void
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
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | undefined>(undefined);

    const onCropComplete = (croppedArea: CropArea, croppedAreaPixels: CropArea) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    async function generateCroppedImageUrl() {
        try {
            const croppedImageBlob = await getCroppedImg(
                props.mediaUrl,
                croppedAreaPixels!,
            )

            return croppedImageBlob;
        } catch (e) {
            console.error(e)
        }
    }

    async function getCroppedImg(imageSrc: string, cropArea: CropArea) {
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

        return new Promise<string>((resolve, reject) => {
            resolve(croppedCanvas.toDataURL('image/jpeg'));
        })
    }

    function createImage(url: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
        });
    }

    async function handleNextClick() {
        const url = await generateCroppedImageUrl();
        props.setCroppedImageUrl(url!);
        props.goNextStep();
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

            <div className="grow flex justify-center items-center overflow-hidden">
                <Cropper
                    image={props.mediaUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    minZoom={1}
                    objectFit='vertical-cover'
                    style={{
                        containerStyle: {
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
            </div>
        </div>
    )
}