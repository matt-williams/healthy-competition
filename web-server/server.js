const fs = require('fs');
const uuidv1 = require('uuid/v1');
const express = require('express');
const bodyParser = require('body-parser');

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

const database = {};

// Load dummy user 1
var user1 = fs.readFileSync('./user1.json');
var jsonUser1 = JSON.parse(user1);
database[jsonUser1.id] = jsonUser1;

app.get('/', (req, res) => {
  res.status(200).send("Here Comes A New Challenger\n");
});

app.get('/user/:id', (req, res) => {
  console.log('GET /user/', req.params.id);

  var user = retrieveUser(req.params.id);
  if (user === undefined) {
    res.status(404).send("User does not exist\n");
    return;
  }

  res.send(user);
});

app.put('/user/:id', (req, res) => {
  console.log('PUT /user/', req.params.id);
  console.log(req.body);

  var user = retrieveUser(req.params.id);
  if (user === undefined) {
    user = {};
    user.id = req.params.id;
    user.location = {};
    user.appearance = {};
    user.challenger = {};
  }

  // Update fields
  if (req.body.location.latitude !== undefined) {
    user.location.latitude = req.body.location.latitude;
    console.log('New latitude: ', user.location.latitude);
  }
  if (req.body.location.longitude !== undefined) {
    user.location.longitude = req.body.location.longitude;
    console.log('New longitude: ', user.location.longitude);
  }
  if (req.body.appearance.gender !== undefined) {
    user.appearance.gender = req.body.appearance.gender;
    console.log('New gender: ', user.appearance.gender);
  }
  if (req.body.appearance.skin !== undefined) {
    user.appearance.skin = req.body.appearance.skin;
    console.log('New skin: ', user.appearance.skin);
  }
  if (req.body.appearance.hair !== undefined) {
    user.appearance.hair = req.body.appearance.hair;
    console.log('New hair: ', user.appearance.hair);
  }
  if (req.body.appearance.shirt !== undefined) {
    user.appearance.shirt = req.body.appearance.shirt;
    console.log('New shirt: ', user.appearance.shirt);
  }
  if (req.body.appearance.shorts !== undefined) {
    user.appearance.shorts = req.body.appearance.shorts;
    console.log('New shorts: ', user.appearance.shorts);
  }
  if (req.body.appearance.socks !== undefined) {
    user.appearance.socks = req.body.appearance.socks;
    console.log ('New socks: ', user.appearance.socks);
  }
  if (req.body.appearance.shoes !== undefined) {
    user.appearance.shoes = req.body.appearance.shoes;
    console.log('New shoes: ', user.appearance.shoes);
  }

  // Update timestamp before saving
  user.location.timestamp = Date.now();
  database[user.id] = user;
  res.status(200).send(user);
});

// Create a new user
app.post('/user', (req, res) => {
  // Allocate new uuid
  var uuid = uuidv1();
  // Create new blank user
  var user = {};
  user.id = uuid;
  user.location = {};
  user.appearance = {};
  user.challenger = {};
  // Save new user in database
  database[uuid] = user;
  console.log('New user: ', uuid);
  res.status(200).send(user);
});

// Get challenger information
app.get('/user/:id/challenger', (req, res) => {
  var user = retrieveUser(req.params.id);
  if (user === undefined) {
    res.status(404).send("User does not exist\n");
    return;
  }
  
  var found = false;
  var challenger = {};
  if (user.challenger.id === undefined) found = findChallenger(user.id);
  if (found === false) {
    res.status(404).send("No challenger found for this user\n");
    return;
  } else {
    challenger = retrieveUser(user.challenger.id);
    if (challenger !== undefined) {
      var obj = {};
      obj.location = challenger.location;
      obj.appearance = challenger.appearance;
      obj.finish = user.challenger.finish;
      res.status(200).send(obj);
      return;
    }
  }
  
  res.status(404).send("No challenger found for this user\n");
});

function findChallenger(id) {
  var user = retrieveUser(id);
  if (user === undefined || user.location.latitude === undefined || user.location.longitude === undefined) {
    return false;
  }

  var u = {};
  var nearest;
  var distance;
  var min_distance;
  for (key in database) {
    u = database[key];
    if (u.id != req.params.id) {
      distance = calculateDistance(user.location.latitude, user.location.longitude, u.location.latitude, u.location.longitude);
      console.log(u.id, distance);
      if (distance < min_distance) {
        min_distance = distance;
        nearest = u;
      }
    }
  }

  if (nearest !== undefined) {
    user.challenger.id = nearest.id;
    var finish = setFinishPoint(user.location.latitude, user.location.longitude, nearest.location.latitude, nearest.location.longitude);
    user.challenger.finish = finish;
    database[user.id] = user;
    console.log("Challenger: ", user.challenger.id);
    return true;
  }

  return false;
}

function retrieveUser(id) {
  if (database[id] !== undefined) {
    return database[id];
  }
  return undefined;
}

function calculateDistance(latitude, longitude, other_latitude, other_longitude) {
  abs_latitude = Math.abs(latitude, other_latitude);
  abs_longitude = Math.abs(longitude, other_longitude);
  squared_distance = Math.pow(abs_latitude, 2) + Math.pow(abs_longitude, 2);
  return Math.sqrt(squared_distance);
}

function setFinishPoint(latitude, longitude, other_latitude, other_longitude) {
  var finish = {};
  finish.latitude = 1.45;
  finish.longitude = 2.43;
  return finish;
}

app.listen(port, hostname, () => {
  console.log('Server running at ', hostname, ':', port);
});
