import document from "document";
import { peerSocket } from "messaging";
import { display } from "display";
import { vibration } from "haptics";

const spinner = document.getElementById("spinner");
const spinner_text = document.getElementById("spinner_text");
const container = document.getElementById("container");
const you_container = document.getElementById("container");
const them_container = document.getElementById("container");
const arrow_container = document.getElementById("container");
const arrow = document.getElementById("arrow");
const result_text = document.getElementById("result_text");
spinner.state = "enabled";
spinner_text.style.visibility = 'visible';
spinner_text.text = "Connecting";
container.style.visibility = 'hidden';
//arrow_container.style.display = 'none';
result_text.style.display = 'none';      

peerSocket.onopen = function() {
  console.log("App connected to Companion");
  spinner_text.text = "Connected";
  spinner.state = "disabled";
  spinner_text.style.visibility = 'hidden';
  container.style.visibility = 'visible';
  display.autoOff = false; // TODO: Turn screen on on-demand.
  
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send({});
  }
}
peerSocket.onclose = function() {
  console.log("App disconnected from Companion");
  spinner_text.text = "Reconnecting...";
  spinner.state = "enabled";
  spinner_text.style.visibility = 'visible';
  //container.style.visbility = 'hidden';
  display.autoOn = true;
};
if (peerSocket.readyState === peerSocket.OPEN) {
  peerSocket.onopen();
}


function setClassColor(id, klass, color) {
  var els = document.getElementById(id).getElementsByClassName(klass);
  for (var ii = 0; ii < els.length; ii++) {
    els[ii].style.fill = color;
  }
}




function updateAppearance(who, appearance) {
  const APPEARANCE_PROPERTIES = ['skin', 'hair', 'shirt', 'shorts', 'socks', 'shoes'];
  for (var ii = 0; ii < APPEARANCE_PROPERTIES.length; ii++) {
    var property = APPEARANCE_PROPERTIES[ii];
    setClassColor(who, property, appearance[property] || 'gray');
  }
}

// Listen for the onmessage event
peerSocket.onmessage = function(evt) {
  
  // Output the message to the console
  console.log("Received " + JSON.stringify(evt.data));
  if (!evt.data) {
    console.error("onmessage event with no data");
    return;
  }
  if (evt.data.type == 'settings') {
    if (evt.data.appearance) {
      updateAppearance('you', evt.data.appearance);
    }
  } else if (evt.data.type == 'challenge') {
    if (evt.data.appearance) {
      display.poke();
      vibration.start("nudge");
      updateAppearance('challenger', evt.data.appearance);
//      arrow_container.style.display = 'inline';
      document.getElementById('challenger_speed_text').text = '10.2 km/h';
    } else {
      updateAppearance('challenger', {});
//      arrow_container.style.display = 'none';
      document.getElementById('challenger_speed_text').text = '- - - - -';
    }
    if (evt.data.finish && evt.data.finish.over) {
      result_text.style.display = 'inline';
    } else {
      result_text.style.display = 'none';      
    }
  } else {
    console.error("onmessage event of unrecognized type: " + evt.data.type)
  }
}
