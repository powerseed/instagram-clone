import { useContext, useEffect, useRef, useState } from "react";
import { OverlayContext } from "@/app/(main)/overlay_context_provider";
import SelectMedia from "./select_media";
import CropMedia from "./crop_media";
import AddInfo from "./add_info";

enum StepsForCreatingAPost {
    SELECT_MEDIA,
    CROP_MEDIA,
    CREATE_NEW_POST
}

export default function CreatePostWindow({ closeThisWindow }: { closeThisWindow: () => void }) {
    const { setIsOverlayOpen } = useContext(OverlayContext);
    let thisRef = useRef<HTMLDivElement>(null);

    let [modalHeight, setModalHeight] = useState<string | undefined>(undefined);
    let [modalWidthWithRightCol, setModalWidthWithRightCol] = useState<string | undefined>(undefined);
    let [modalWidthWithoutRightCol, setModalWidthWithoutRightCol] = useState<string | undefined>(undefined);
    let [areDimensionsCalculated, setAreDimensionsCalculated] = useState<boolean>(false);

    let [currentStep, setCurrentStep] = useState<StepsForCreatingAPost>(StepsForCreatingAPost.SELECT_MEDIA);
    let [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | undefined>(undefined);
    let [croppedMediaUrl, setCroppedMediaUrl] = useState<string | undefined>(undefined);
    let [croppedMediaFile, setCroppedMediaFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        calculateDimensions();
        setAreDimensionsCalculated(true);

        setIsOverlayOpen(true);
        return () => {
            setIsOverlayOpen(false);
        }
    }, [])

    useEffect(() => {
        if (areDimensionsCalculated) {
            setDimentions();
        }
    }, [areDimensionsCalculated, currentStep])

    function calculateDimensions() {
        const maxWidthPercentageOfVw = 0.9;

        const minModalWidth = 736;
        const vwForMinModalWidth = minModalWidth / maxWidthPercentageOfVw;

        const maxModalWidth = 931;
        const vwForMaxModalWidth = maxModalWidth / maxWidthPercentageOfVw;

        let modalWidthWithRightCol;

        if (window.innerWidth < vwForMinModalWidth) {
            modalWidthWithRightCol = minModalWidth;
        }
        else if (window.innerWidth > vwForMaxModalWidth) {
            modalWidthWithRightCol = maxModalWidth;
        }
        else {
            modalWidthWithRightCol = window.innerWidth * maxWidthPercentageOfVw;
        }

        let rightColWidth = 340;
        let modalWidthWithoutRightCol = modalWidthWithRightCol - rightColWidth;

        let titleHeight = 43;
        let modalHeight = modalWidthWithoutRightCol + titleHeight;

        setModalHeight(modalHeight + 'px');
        setModalWidthWithoutRightCol(modalWidthWithoutRightCol + 'px');
        setModalWidthWithRightCol(modalWidthWithRightCol + 'px');
    }

    function setDimentions() {
        thisRef.current!.style.height = modalHeight!;

        switch (currentStep) {
            case StepsForCreatingAPost.SELECT_MEDIA:
            case StepsForCreatingAPost.CROP_MEDIA:
                thisRef.current!.style.width = modalWidthWithoutRightCol!;
                break;
            case StepsForCreatingAPost.CREATE_NEW_POST:
                thisRef.current!.style.width = modalWidthWithRightCol!;
                break;
        }
    }

    function handleMediaUpload(uploadedMediaUrl: string) {
        setUploadedMediaUrl(uploadedMediaUrl);
        setCurrentStep(StepsForCreatingAPost.CROP_MEDIA);
    }

    function handleGoPreviousStep() {
        const previousIndex: number = Object.keys(StepsForCreatingAPost).indexOf(currentStep.toString()) - 1;
        const previousStep: string = StepsForCreatingAPost[previousIndex];
        setCurrentStep(StepsForCreatingAPost[previousStep as keyof typeof StepsForCreatingAPost]);
    }

    function handleGoNextStep() {
        const nextIndex: number = Object.keys(StepsForCreatingAPost).indexOf(currentStep.toString()) + 1;
        const nextStep: string = StepsForCreatingAPost[nextIndex];
        setCurrentStep(StepsForCreatingAPost[nextStep as keyof typeof StepsForCreatingAPost]);
    }

    function setCroppedMedia(file: File, url: string) {
        setCroppedMediaFile(file);
        setCroppedMediaUrl(url);
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 !my-0 w-screen h-screen flex justify-center items-center bg-black/70 z-[var(--windows-z-index)]">
            <div ref={thisRef} className={`transition-all duration-500`}>
                {
                    (() => {
                        switch (currentStep) {
                            case StepsForCreatingAPost.SELECT_MEDIA:
                                return <SelectMedia
                                    handleMediaUpload={handleMediaUpload}
                                />;
                            case StepsForCreatingAPost.CROP_MEDIA:
                                return <CropMedia
                                    mediaUrl={uploadedMediaUrl!}
                                    goPreviousStep={handleGoPreviousStep}
                                    goNextStep={handleGoNextStep}
                                    setCroppedMedia={setCroppedMedia}
                                />;
                            case StepsForCreatingAPost.CREATE_NEW_POST:
                                return <AddInfo
                                    mediaFile={croppedMediaFile!}
                                    mediaUrl={croppedMediaUrl!}
                                    goPreviousStep={handleGoPreviousStep}
                                    closeThisWindow={closeThisWindow}
                                />;
                            default:
                                return null;
                        }
                    })()
                }
            </div>

            <div className="fixed top-[20px] right-[20px] w-[20px] h-[20px] cursor-pointer" onClick={closeThisWindow}>
                <img src="/home/close-white.svg" alt="Close" />
            </div>
        </div>
    )
}