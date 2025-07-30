let btn= document.querySelector("#btn");
let content= document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Mam")
    }else if(hours>=12 && hours<16){
        speak("Good Afternoon Mam")
    }else{
        speak("Good Evening Mam")
    }
}
// window.addEventListener('load',()=>{
//     wishMe();
// })


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=((event)=>{
    let currentIndex = event.resultIndex
    let transcript= event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript)
})
btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display ="none"
    voice.style.display="block"
})


function takeCommand(message) {
    btn.style.display ="flex"
    voice.style.display="none"
    message = message.toLowerCase(); // Normalize the message
    const now = new Date();

    // Greetings
    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello ! How can I assist you?");
    }else if(message.includes("who are you")){
        speak("I'm  Nova,Virtual Assistant, created by Maanasa Patgar")
    }
    else if (message.includes("good morning")) {
        speak("Good morning! Have a great day ahead.");
    }
    else if (message.includes("good afternoon")) {
        speak("Good afternoon! How can I help you?");
    }
    else if (message.includes("good evening")) {
        speak("Good evening! What can I do for you?");
    }

    // Time and date
    else if (message.includes("time")) {
        speak(`The current time is ${now.toLocaleTimeString()}`);
    }
    else if (message.includes("date")) {
        speak(`Today's date is ${now.toLocaleDateString()}`);
    }

    // Weather (dummy response, real one needs API)
    else if (message.includes("weather")) {
        speak("Sorry, I can't fetch live weather yet. But I suggest checking Google.");
        window.open("https://www.google.com/search?q=weather", "_blank");
    }

    // Search on Google
    else if (message.includes("search")) {
        let query = message.replace("search", "").trim();
        speak(`Searching ${query} on Google`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    // Wikipedia
    else if (message.includes("wikipedia")) {
        let topic = message.replace("wikipedia", "").trim();
        speak(`Searching ${topic} on Wikipedia`);
        window.open(`https://en.wikipedia.org/wiki/${topic}`, "_blank");
    }


    //open website
    else if (message.includes("open youtube")) {
    speak("Opening YouTube.");
    window.open("https://www.youtube.com", "_blank");
}
else if (message.includes("open google")) {
    speak("Opening Google.");
    window.open("https://www.google.com", "_blank");
}
else if (message.includes("open instagram")) {
    speak("Opening Instagram.");
    window.open("instagram://");
}
else if (message.includes("open facebook")) {
    speak("Opening Facebook.");
    window.open("https://www.facebook.com", "_blank");
}
else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp Web.");
    window.open("whatsapp://");
}
else if (message.includes("open gmail")) {
    speak("Opening Gmail.");
    window.open("https://mail.google.com", "_blank");
}
else if (message.includes("open github")) {
    speak("Opening GitHub.");
    window.open("https://github.com", "_blank");
}
else if (message.includes("open chatgpt")) {
    speak("Opening ChatGPT.");
    window.open("https://chat.openai.com", "_blank");
}
else if (message.startsWith("open ")) {
    let site = message.replace("open ", "").trim().replace(" ", "");
    speak(`Opening ${site}`);
    window.open(`https://${site}.com`, "_blank");
}
else if (message.includes("open spotify")) {
    speak("Opening Spotify app.");
    window.open("spotify:", "_blank"); 
}
else if (message.includes("open vscode")) {
    speak("Opening Visual Studio Code.");
    window.open("vscode:","_blank");
}
else if (message.includes("open calculator")) {
    speak("Opening calculator.");
    window.open("calculator://");
}
else if (message.includes("open notepad")) {
    speak("Opening online notepad.");
    window.open("https://anotepad.com", "_blank");
}
else if (message.includes("open paint")) {
    speak("Opening online paint.");
    window.open("https://jspaint.app", "_blank");
}



    // Math Operations
    else if (message.includes("calculate")) {
        try {
            let expression = message.replace("calculate", "").trim();
            let result = eval(expression);
            speak(`The result is ${result}`);
        } catch (e) {
            speak("Sorry, I couldn't calculate that.");
        }
    }

    // Jokes
    else if (message.includes("joke")) {
        const jokes = [
            "Why did the computer get cold? Because it forgot to close its Windows!",
            "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
            "What did one bit say to the other bit? Let's get together and make a byte!"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
    }

    // Compliments
    else if (message.includes("you are smart") || message.includes("you are awesome")) {
        speak("Thank you! You're awesome too.");
    }

    // Music
    else if (message.includes("play music")||message.includes("play song")) {
        speak("Playing music from YouTube.");
        window.open("https://www.youtube.com/results?search_query=play+music", "_blank");
    }

    // Reminder (basic localStorage)
    else if (message.includes("remind me to")) {
        let reminder = message.replace("remind me to", "").trim();
        localStorage.setItem("reminder", reminder);
        speak(`Reminder set: ${reminder}`);
    }
    else if (message.includes("what's my reminder") || message.includes("reminder")) {
        let reminder = localStorage.getItem("reminder");
        if (reminder) {
            speak(`Your reminder is: ${reminder}`);
        } else {
            speak("You have no reminders.");
        }
    }

    
    else {
        let finalText="this is what I found on internet regarding" + message.replace("NOVA","") || message.replace("Nuhva","")
        speak(finalText)
        window.open(`https://www.google.com/search?q= ${message.replace("NOVA","") || message.replace("Nuhva","") }`)
    }
}
