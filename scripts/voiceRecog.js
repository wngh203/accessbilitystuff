var log         = console.log.bind(this); 
var recognizing = false;
var ignore_onend;

var last_text_elem = undefined;



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






function action (result) {
    var result_arr = result.split(" ");
    
    var input_value_index = result.indexOf(" ");
    var input_value       = result.substring(input_value_index+1);
    
    
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
      if (result_arr.length != 2) return;
      if (result_arr[1].toLowerCase() == "a") {
          var link = $("a:first-of-type").attr("href");
          window.location.assign(link);
          return;
      }
      else if (result_arr[1].toLowerCase() == "input") {
          $("input:first-of-type").click();
          $("input:first-of-type").focus();
          return;
      }
      else if (result_arr[1].toLowerCase() == "textarea") {
          $("textarea:first-of-type").click();
          $("textarea:first-of-type").focus();
          return;
      }
      else {
          return;
      }
    }
    
    else if (result_arr[0].toLowerCase() == "enter") {
        var typeable = ["INPUT", "TEXTAREA"];
        var active = $(":focus");
        if (!active || typeable.indexOf(active.prop("tagName")) == -1) {
          if (last_text_elem != undefined) {
            last_text_elem.val(input_value);
          }
          else {
            alert("fuck you again.");
            return;
          }
        }
        
        else {
         alert("fuck you too.");
         return;
        }
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

$(document).ready(function () {
  
    $("input, textarea").click(function () {
      last_text_elem = $(this);
    });
  
    $("#fuckme").click(function () {
        if (recognizing == false) {
            recognition.start();
            showStatus("Info: Voice Recog started.");
        } 
    });
});
    

