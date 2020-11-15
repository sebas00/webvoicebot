var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth = window.speechSynthesis;
var chosenvoice;

function populateVoiceList(lang) {
  voices = synth.getVoices();

  for(i = 0; i < voices.length ; i++) {
    //var option = document.createElement('option');
    //option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].lang == lang && voices[i].name.includes("Google")) {
      chosenvoice = voices[i];
      break;
    } else if(voices[i].lang == lang) {
      chosenvoice = voices[i];

    }

    //option.setAttribute('data-lang', voices[i].lang);
    //option.setAttribute('data-name', voices[i].name);
    //voiceSelect.appendChild(option);
  }
}


const socket = new WebSocket("wss://can.bots.dance/ws/echo");
   socket.addEventListener("open", function(event) {
     populateVoiceList("en-US");
   //socket.send("Hello Server!");
   console.log('socket open')
   window.socket=socket;
   setInterval(function(){ socket.send("ping"); }, 5000);
   });
   socket.addEventListener("message", function(event) {
    //socket.send("Hello Server!");
    if(event.data == "pong"){ return;}
    console.log('mess', event)
    var tospeak = event.data
    if(event.data.includes("bot:dance")){
      startbotdance = true;
      tospeak = event.data.replace("bot:dance", "");
      }
      /*
    if(event.data.includes("Einstein")){
      populateVoiceList("de-DE");
    } else if(event.data.includes("Astro")){
      populateVoiceList("en-US");
    }
    */
    var utterThis = new SpeechSynthesisUtterance(tospeak);
    utterThis.voice = chosenvoice;
    utterThis.onend = function (event) {
      recognition.start();
  //console.log('Ready to receive a color command.');
      console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
  }
  synth.speak(utterThis);

    });
var colors = [ 'chatbot' , 'chat bots' , 'service cloud', 'salesforce', 'bots', 'dance', 'sing', 'song', 'dancing', 'you', 'me' ];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';


//document.body.onclick = function() {
 // recognition.start();
  //console.log('Ready to receive a color command.');
//}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;
  socket.send(color);
  diagnostic.textContent = 'Result received: ' + color + '.';
  //bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
/*
const socket = new WebSocket("ws://localhost:5000/ws/echo");
   socket.addEventListener("open", function(event) {
   socket.send("Hello Server!");
   console.log('mess')
   });
   */