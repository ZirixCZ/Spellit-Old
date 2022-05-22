import React, {useEffect, useRef} from "react";

const Audio = (props) => {
    console.log("audio -> start")
    const playerRef = useRef();

    const playAudio = () => {
        let audio = playerRef.current;
        let blob = new Blob([props.output], {type: 'audio/wav'});
        let objectUrl = URL.createObjectURL(blob);
        audio.src = objectUrl;

        audio.onload = function (evt) {
            URL.revokeObjectURL(objectUrl);
        };
        audio.play();
    }

    useEffect(() => {
        console.log("audio -> useeffect");
        playAudio();
    }, [props.output])

    return (
        <audio src="" controls id="player" ref={playerRef}></audio>
    )
}

export default Audio;