var log         = console.log.bind(this); 
var recognizing = false;
var ignore_onend;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous     = false;
  recognition.interimResults = false;
  recognition.onstart = function() {
    recognizing = true;
    showStatus('Info: Start talking now...');
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      showStatus('Error: No speech given.');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      showStatus('Error: No mic found.');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
        showStatus("Error: Voice recog not allowed.")
      ignore_onend = true;
    }
  };
  recognition.onend = function() {
    recognizing = false;
      
    showStatus("Info: Voice Recog Ended.");
      
    if (ignore_onend) {
      return;
    }
      
//    if (!final_transcript) {
//      showStatus('info_start');
//      return;
//    }
      
  };
  recognition.onresult = function(event) {
    var result = '';
    for (var i = 0; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
    }
    showResult(result);
    action(result);
  };
}

function action (result) {
    var result_arr = result.split(" ");
    if (result_arr[0].toLowerCase() == "scroll") {
        if (result_arr.length != 2) return;
        if (result_arr[1].toLowerCase() == "up") {
            window.scrollBy(0,-100);
            return;
        }
        else if (result_arr[1].toLowerCase() == "down") {
            window.scrollBy(0,100);
            return;
        }
        else {
            return;
        }
    }
    
    else if (result_arr[0].toLowerCase() == "click") {
        
    }
    
    else if (result_arr[0].toLowerCase() == "enter") {
        
    }
    
    else {
        alert("Fuck you.");
        return;
    }
}

function showStatus (status) {
    log(status);
    $("#status").html(status);
}

function showResult (result) {
    $("#result").html(result);
}

$("#fuckme").click(function () {
    if (recognizing == false) {
        recognition.start();
        showStatus("Info: Voice Recog started.");
    } 
});
    

