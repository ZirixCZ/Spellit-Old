import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const textToSpeech = async (data) => {

    // The text has to be a string for the function to continue
    if (data == null) return;
    // Initializing SpeechConfig. Giving it two arguments, the key and setting the region
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY, "northeurope")

    // Choosing the voice name for the synthesizer
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    // Asynchronous function which returns audioData
    const getBufferStream = async () => {
        return new Promise((resolve, reject) => {
            // Initializing the synthesizer
            let synthesizer = new sdk.SpeechSynthesizer(speechConfig);
            // Calling the speakTextAsync function on the synthesizer. Passing string as an argument
            synthesizer.speakTextAsync(JSON.parse(JSON.stringify(data)).text,
                result => {
                    if (result) {
                        const {audioData} = result;
                        synthesizer.close();
                        resolve(audioData);
                    }
                },
                error => {
                    synthesizer.close();
                    reject(error);
                }
            )
        })
    }

    // Returning bufferStream with audioData
    return getBufferStream();
}

export default textToSpeech;