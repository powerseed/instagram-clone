import { useContext, useEffect, useRef, useState } from "react";
import { OverlayContext } from "@/app/(main)/overlay_context_provider";
import SelectMedia from "./select_media";
import CropMedia from "./crop_media";
import AddInfo from "./add_info";
import Sharing from "./sharing";
import PostShared from "./post_shared";

enum StepsForCreatingAPost {
    SELECT_MEDIA,
    CROP_MEDIA,
    CREATE_NEW_POST,
    SHARING,
    POST_SHARED
}

export default function CreatePostWindow({ closeThisWindow }: { closeThisWindow: () => void }) {
    const { setIsOverlayOpen } = useContext(OverlayContext);
    let thisRef = useRef<HTMLDivElement>(null);

    let [modalHeight, setModalHeight] = useState<number>(0);
    const headerHeightInPx = 45;
    let [mainHeightInPx, setMainHeightInPx] = useState<number>(0);
    let [modalWidthWithRightCol, setModalWidthWithRightCol] = useState<number | undefined>(undefined);
    let [modalWidthWithoutRightCol, setModalWidthWithoutRightCol] = useState<number | undefined>(undefined);
    let [areDimensionsCalculated, setAreDimensionsCalculated] = useState<boolean>(false);

    let [currentStep, setCurrentStep] = useState<StepsForCreatingAPost>(StepsForCreatingAPost.SELECT_MEDIA);
    let [uploadedMediaUrls, setUploadedMediaUrls] = useState<string[]>([]);
    let [croppedMediaFiles, setCroppedMediaFiles] = useState<File[]>([]);

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

        setModalHeight(modalHeight);
        setMainHeightInPx(modalHeight - headerHeightInPx);
        setModalWidthWithoutRightCol(modalWidthWithoutRightCol);
        setModalWidthWithRightCol(modalWidthWithRightCol);
    }

    function setDimentions() {
        thisRef.current!.style.height = modalHeight! + 'px';

        switch (currentStep) {
            case StepsForCreatingAPost.SELECT_MEDIA:
            case StepsForCreatingAPost.CROP_MEDIA:
            case StepsForCreatingAPost.SHARING:
            case StepsForCreatingAPost.POST_SHARED:
                thisRef.current!.style.width = modalWidthWithoutRightCol! + 'px';
                break;
            case StepsForCreatingAPost.CREATE_NEW_POST:
                thisRef.current!.style.width = modalWidthWithRightCol! + 'px';
                break;
        }
    }

    function handleMediaUpload(uploadedMediaUrls: string[]) {
        setUploadedMediaUrls(uploadedMediaUrls);
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

    function postPost(postPostPromise: Promise<void>) {
        setCurrentStep(StepsForCreatingAPost.SHARING);

        postPostPromise.then(() => {
            setCurrentStep(StepsForCreatingAPost.POST_SHARED)
        });
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
                                    mediaUrls={uploadedMediaUrls!}
                                    goPreviousStep={handleGoPreviousStep}
                                    goNextStep={handleGoNextStep}
                                    setCroppedMediaFiles={setCroppedMediaFiles}
                                />;
                            case StepsForCreatingAPost.CREATE_NEW_POST:
                                return <AddInfo
                                    headerHeightInPx={headerHeightInPx}
                                    mainHeightInPx={mainHeightInPx}
                                    mediaFiles={croppedMediaFiles}
                                    goPreviousStep={handleGoPreviousStep}
                                    postPost={postPost}
                                />;
                            case StepsForCreatingAPost.SHARING:
                                return <Sharing
                                    headerHeightInPx={headerHeightInPx}
                                    mainHeightInPx={mainHeightInPx}
                                />
                            case StepsForCreatingAPost.POST_SHARED:
                                return <PostShared
                                    headerHeightInPx={headerHeightInPx}
                                    mainHeightInPx={mainHeightInPx}
                                />
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