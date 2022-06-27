import React, {useEffect, useRef} from "react";

const Audio = (props) => {
    const playerRef = useRef();

    const playAudio = () => {
        let audio = playerRef.current;
        let blob = new Blob([props.output], {type: 'audio/wav'});
        let objectUrl = URL.createObjectURL(blob);
        audio.src = objectUrl;

        audio.onload = (evt) => {
            URL.revokeObjectURL(objectUrl);
        };
        audio.play();
    }

    useEffect(() => {
        playAudio();
    }, [props.output])

    return (
        <audio src="" controls id="player" ref={playerRef}></audio>
    )
}

export default Audio;