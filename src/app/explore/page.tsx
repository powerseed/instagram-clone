'use client';

import { useState } from "react";
import { medias, tags } from "./content";
import MediaFrame from "./media_frame";

export default function Explore() {
    let [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col max-w-[935px]">
                <div className="flex flex-wrap pt-6 pb-1">
                    {
                        tags.map(tag => {
                            return (
                                <div key={tag} className="mr-3 mb-4 px-4 h-[32px] bg-gray-100 hover:bg-gray-200 flex justify-center items-center rounded-lg text-[14px] font-medium cursor-pointer">
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col space-y-1">
                    {
                        medias
                            .reduce<string[][]>((accumulator, currentValue, currentIndex, array) => {
                                if (currentIndex % 5 === 0) {
                                    accumulator.push(array.slice(currentIndex, currentIndex + 5));
                                }
                                return accumulator;
                            }, [])
                            .map((five_medias_array, index) => {
                                return (
                                    <MediaFrame key={index} medias={five_medias_array} is_flex_reversed={index % 2 === 0 ? true : false}></MediaFrame>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}