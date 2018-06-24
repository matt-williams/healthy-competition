import { peerSocket } from "messaging";
import { settingsStorage } from "settings";
import { geolocation } from "geolocation";

const SERVER = 'http://healthy-competition.uk.to';

function dumpSettings() {
  for (var ii = 0; ii < settingsStorage.length; ii++) {
    console.log(ii, settingsStorage.key(ii), settingsStorage.getItem(settingsStorage.key(ii)));
  }
}

function marshalUser(id, appearance, location) {
  return new Promise(resolve => {
    var user = {
      appearance: {},
      location: {}
    };
    var userId = JSON.parse(settingsStorage.getItem('userId'));
    if (userId) {
      user.id = userId;
    }
    const APPEARANCE_PROPERTIES = ['skin', 'hair', 'shirt', 'shorts', 'socks', 'shoes'];
    for (var ii = 0; ii < APPEARANCE_PROPERTIES.length; ii++) {
      var property = APPEARANCE_PROPERTIES[ii];
      if (settingsStorage.getItem(property)) {
        user.appearance[property] = JSON.parse(settingsStorage.getItem(property));
      }
    }
    geolocation.getCurrentPosition(pos => {
        user.location.latitude = pos.coords.latitude;
        user.location.longitude = pos.coords.longitude;
        user.location.timestamp = pos.timestamp;
        resolve(user);
      },
      err => resolve(user),
      {timeout: 10000});
  });
}

function getUserId() {
  return new Promise((resolve, reject) => {
    var userId = settingsStorage.getItem('userId');
    if (!userId) {
      marshalUser()
        .then(user => {
          fetch(`${SERVER}/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
          })
          .then((rsp) => {
            rsp.json().then((data) => {
              console.log(JSON.stringify(data));
              if (data.id) {
                settingsStorage.setItem('userId', JSON.stringify(data.id));
                resolve(data.id);
              } else {
                reject("No id field in response from server")
              }
            })
            .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
        });
    } else {
      resolve(JSON.parse(userId));
    }
  });
}

getUserId().then(userId => console.log("User ID is " + userId));

function sendSettingsUpdate() {
  return new Promise(resolve => {
    marshalUser().then(evtData => {
      evtData.type = 'settings';
      delete evtData.location;
      if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(evtData);
      }
    })
  });
}

function updateUser() {
  return new Promise((resolve, reject) => {
    marshalUser().then(user => {
          console.log("Updating user with " + JSON.stringify(user));
          fetch(`${SERVER}/user/${user.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
          })
          .then((rsp) => {
            rsp.json().then((data) => {
              if (data.id) {
                settingsStorage.setItem('userId', JSON.stringify(data.id));
                resolve(data.id);
              } else {
                reject("No id field in response from server")
              }
            })
            .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
    });
  });
}

settingsStorage.onchange = (evt) => {
  updateUser();
  sendSettingsUpdate();
};

function pollChallenge() {
  getUserId()
    .then(userId => {
      fetch(`${SERVER}/user/${userId}/challenger`)
        .then(rsp => {
          if (rsp.status == 200) {
            rsp.json().then(data => {
              console.log("Received challenge " + JSON.stringify(data));
              if (peerSocket.readyState === peerSocket.OPEN) {
                data.type = 'challenge';
                peerSocket.send(data);
              }
              if (data.finish.over) {
                deleteChallenge();
              }
            })
            .catch(err => console.error("Error parsing user JSON: " + err))
          } else if (rsp.status == 404) {
            console.log("Ignoring challenge status 404");
            if (peerSocket.readyState === peerSocket.OPEN) {
              peerSocket.send({"type": "challenge"});
            }
          } else {
            console.error(`Fetching challenge failed with status ${rsp.status} ${rsp.statusText}`)
          }
        })
        .catch(err => console.error("Error fetching user: " + err));
     })
     .catch(err => console.error("Erroring getting user ID: " + err));
}

function deleteChallenge() {
  getUserId()
    .then(userId => {
      fetch(`${SERVER}/user/${userId}/challenger`, {method: 'DELETE'})
        .then(rsp => {
          console.log(`Challenge deleted with status ${rsp.status} ${rsp.statusText}`)
        })
        .catch(err => console.error("Error fetching user: " + err));
     })
     .catch(err => console.error("Erroring getting user ID: " + err));
}



var poller = null;

peerSocket.onopen = () => {
  console.log("Companion connected to App");
  sendSettingsUpdate();
  updateUser();
  pollChallenge();
  if (poller != null) {
    cancelInterval(poller);
    poller = null;
  }
  poller = setInterval(() => {
    updateUser();
    pollChallenge();
  }, 3000);
}
if (peerSocket.readyState === peerSocket.OPEN) {
  peerSocket.onopen();
}

peerSocket.onclose = () => {
  console.log("Companion disconnected from App");
  cancelInterval(poller);
}

peerSocket.onmessage = function(evt) {
  sendSettingsUpdate();
}

console.log("Companion started");