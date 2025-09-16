document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const transcriptElement = document.getElementById('transcript');
    const responseElement = document.getElementById('response');

    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            transcriptElement.textContent = 'Listening...';
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            transcriptElement.textContent = 'You said: ${transcript}';
            processSpeech(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            transcriptElement.textContent = 'Speech recognition error.';
        };

        recognition.onend = () => {
            transcriptElement.textContent = 'Click "Start Listening" to speak again.';
        };

        startButton.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        transcriptElement.textContent = 'Speech recognition not supported in this browser.';
        startButton.disabled = true;
    }

    function processSpeech(text) {
        // Basic command processing (you can expand this)
        if (text.toLowerCase().includes('hello')) {
            speak('Hello how are you!');
        } else if (text.toLowerCase().includes('what is your name')) {
            speak('I am a virtual assistant creating by Aman pandey.');
        }else if (text.toLowerCase().includes('what is computer')) {
            speak('computer is a electric and electronic device.');
        }else if (text.toLowerCase().includes('how are you')) {
            speak('I am doing well, thank you for asking.');
        }else if (text.toLowerCase().includes('what i')) {
            speak
         else {
            speak("Sorry, I didn't understand that.");
        }
    }

    function speak(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = text;
        window.speechSynthesis.speak(speech);
        responseElement.textContent = 'Assistant said: ${text}';
    }
});