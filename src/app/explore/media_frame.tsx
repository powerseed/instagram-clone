type MediaFrameProps = {
    is_flex_reversed: boolean,
    medias: string[]
}

export default function MediaFrame(props: MediaFrameProps) {
    return (
        <div className={`flex justify-between w-full h-[642px] ${props.is_flex_reversed ? 'flex-row-reverse' : ''}`}>
            <div className={`w-[calc(33.3333%-0.125rem)] flex`}>
                <img className="object-cover w-full h-full" src={props.medias[0]} alt="" />
            </div>

            <div className={`w-[calc(66.6666%-0.125rem)] flex flex-wrap place-content-between`}>
                {
                    props.medias.slice(1, props.medias.length).map((media, index) => {
                        return (
                            <div key={index} className="w-[calc(50%-0.125rem)] h-[calc(50%-0.125rem)]">
                                <img className="object-cover w-full h-full" src={media} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}