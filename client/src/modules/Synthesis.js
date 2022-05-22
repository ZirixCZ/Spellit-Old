export default function Synthesis(textToPlay) {
    let synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(textToPlay);
    synth.speak(utterance);
}