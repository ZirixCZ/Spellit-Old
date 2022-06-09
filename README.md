# Spellit
Game-like application for learning English fast.

## Commands
To start the client on your local machine follow the steps below.
#### Clone the repository
```
git clone https://github.com/ZirixCZ/Spellit
```
#### Change directory into /client
```
cd /client
```
#### Install required packages
```
npm install
```
### Start the application
```
npm run start
```
To then start the server navigate into `/server`. Install NPM packages with `npm install`.

Create a `.env` file in `/server`. You need to put your azure key into it for the application to work.
```
/server/.env

AZURE_KEY=yourtexttospeechkey
```
If you are unsure how to get the Text to Speech Azure key, <a href="https://www.unimelb.edu.au/accessibility/automatic-speech-recognition/getting-started-with-microsoft-azure-speech-to-text">this article might help</a>.

