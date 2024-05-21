import { useContext, useEffect, useRef, useState } from "react";
import { OverlayContext } from "@/app/overlay_context_provider";
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
    let [currentStep, setCurrentStep] = useState<StepsForCreatingAPost>(StepsForCreatingAPost.SELECT_MEDIA);
    let [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsOverlayOpen(true);

        let closeMenuEventListener = (event: Event) => {
            if (!thisRef.current?.contains(event.target as Node)) {
                closeThisWindow();
            }
        };

        document.addEventListener('click', closeMenuEventListener);

        return () => {
            setIsOverlayOpen(false);
            document.removeEventListener('click', closeMenuEventListener);
        }
    })

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

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 !my-0 w-screen h-screen flex justify-center items-center bg-black/70 z-[var(--windows-z-index)]">
            <div ref={thisRef} className={`transition-all duration-500 h-[80%] w-[90%] max-h-[635px] ${currentStep === StepsForCreatingAPost.CREATE_NEW_POST ? 'min-w-[814px] max-w-[931px]' : 'max-w-[591px]'}`}>
                {
                    (() => {
                        switch (currentStep) {
                            case StepsForCreatingAPost.SELECT_MEDIA:
                                return <SelectMedia handleMediaUpload={handleMediaUpload} />;
                            case StepsForCreatingAPost.CROP_MEDIA:
                                return <CropMedia mediaUrl={uploadedMediaUrl!} goPreviousStep={handleGoPreviousStep} goNextStep={handleGoNextStep} />;
                            case StepsForCreatingAPost.CREATE_NEW_POST:
                                return <AddInfo mediaUrl={uploadedMediaUrl!} goPreviousStep={handleGoPreviousStep} closeThisWindow={closeThisWindow} />;
                            default:
                                return null;
                        }
                    })()
                }
            </div>

            <div className="fixed top-[20px] right-[20px] w-[20px] h-[20px] cursor-pointer">
                <img src="/home/close-white.svg" alt="Close" />
            </div>
        </div>
    )
}