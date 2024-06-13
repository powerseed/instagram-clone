import { useSession } from "next-auth/react";
import { useState } from "react";

type AddInfoProps = {
    mediaFiles: File[],
    goPreviousStep: () => void,
    closeThisWindow: () => void
}

export default function AddInfo(props: AddInfoProps) {
    const charLimit = 2200;
    let [charCount, setCharCount] = useState<number>(0);
    let [text, setText] = useState<string>('');
    let [displayedMediaIndex, setDisplayedMediaIndex] = useState<number>(0);

    const { data: session } = useSession();
    if (!session) {
        return;
    }

    async function handleShareClick() {
        // Create the post
        let response = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user?.id,
                createdOn: new Date,
                text: text
            }),
        });

        if (!response.ok) {
            alert('Failed to create the post. ');
            return;
        }

        // Upload the media of the post onto AWS S3.
        const { postId } = await response.json();

        await Promise.all(props.mediaFiles.map(async (mediaFile) => {
            try {
                await uploadMediaToAwsS3(postId, mediaFile);
            }
            catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }
        }));

        props.closeThisWindow();
    }

    async function uploadMediaToAwsS3(postId: string, mediaFile: File) {
        const filenameInCloud = process.env.NEXT_PUBLIC_AWS_S3_POST_DIRECTORY + '/' + postId + '_' + mediaFile.name;

        const formData = new FormData();
        formData.append('file', mediaFile);
        formData.append('key', filenameInCloud);

        let response = await fetch('/api/upload/media', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload the medias. ');
        }

        // Store the post id and media key into the "media_post" collection.
        response = await fetch('/api/media_post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId,
                mediaKey: filenameInCloud
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to link the post and the medias. ');
        }
    }

    function handleTextareaInput(event: React.FormEvent<HTMLTextAreaElement>) {
        const target = event.currentTarget!;
        setCharCount(target.value.length);
        setText(target.value);
    }

    function handleLeftArrowClick() {
        setDisplayedMediaIndex(displayedMediaIndex - 1);
    }

    function handleRightArrowClick() {
        setDisplayedMediaIndex(displayedMediaIndex + 1);
    }

    return (
        <div className='flex flex-col h-full rounded-2xl bg-white opacity-100 text-[14px] divide-y divide-solid'>
            <div className="flex justify-between items-center border-b-[1px] px-4 py-2 text-[16px] font-[500]">
                <div className="cursor-pointer" onClick={props.goPreviousStep}>
                    <img src="/side_and_bottom_bar/create_post_window/left-arrow.svg" alt="Previous" width={28} height={28} />
                </div>

                <div>
                    Create new post
                </div>

                <div className="cursor-pointer text-sky-500 text-[14px]" onClick={handleShareClick}>
                    Share
                </div>
            </div>

            <div className="grow flex">
                <div className="relative flex justify-center items-center w-[calc(100%-340px)] border-r-[1px]">
                    <div className={`${displayedMediaIndex === 0 ? 'hidden' : 'block'} absolute left-[10px] px-[8px] py-[8px] bg-black/[0.6] rounded-full cursor-pointer hover:opacity-80`}
                        onClick={handleLeftArrowClick}>
                        <img src="/create_post/left-arrow.svg" alt="Previous" width={16} height={16} />
                    </div>
                    {
                        props.mediaFiles.map((mediaFile, index) => {
                            return <img
                                key={index}
                                className={`h-full rounded-bl-2xl ${displayedMediaIndex === index ? 'block' : 'hidden'}`}
                                src={URL.createObjectURL(mediaFile)}
                                alt="Cropped Image"
                            />
                        })
                    }
                    <div className={`${displayedMediaIndex === props.mediaFiles.length - 1 ? 'hidden' : 'block'} absolute right-[10px] px-[8px] py-[8px] bg-black/[0.6] rounded-full cursor-pointer hover:opacity-80`}
                        onClick={handleRightArrowClick}>
                        <img src="/create_post/right-arrow.svg" alt="Previous" width={16} height={16} />
                    </div>
                </div>

                <div className="w-[340px] flex flex-col">
                    <div className="flex px-4 py-3 items-center space-x-2">
                        <img className="rounded-full" src={session.user?.image ? session.user?.image : '/profile.jpg'} alt="" width={36} height={36} />

                        <div className="font-[500]">
                            {session.user?.name}
                        </div>
                    </div>

                    <div className="grow px-4">
                        <textarea className="w-full h-full resize-none outline-none placeholder:text-gray-300 placeholder:text-[15px]"
                            placeholder="Write a caption..."
                            maxLength={charLimit}
                            onInput={handleTextareaInput}
                        />
                    </div>

                    <div className="text-[12px] text-gray-400 flex justify-end px-4 py-2">
                        {charCount}/{charLimit}
                    </div>
                </div>
            </div>
        </div>
    )
}