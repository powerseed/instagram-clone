import { useState } from "react"
import Cropper from "react-easy-crop";

type CropMediaProps = {
    mediaUrl: string,
    goPreviousStep: () => void,
    goNextStep: () => void,
}

type CropArea = {
    x: number,
    y: number,
    height: number,
}

export default function CropMedia(props: CropMediaProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea: CropArea, croppedAreaPixels: CropArea) => {
        console.log(croppedArea, croppedAreaPixels)
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

                <div className="cursor-pointer text-sky-500 text-[14px]" onClick={props.goNextStep}>
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