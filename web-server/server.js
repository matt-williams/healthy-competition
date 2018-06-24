const fs = require('fs');
const uuidv1 = require('uuid/v1');
const express = require('express');
const bodyParser = require('body-parser');

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
    res.status(404).send("User does not exist\n");
    return;
  }

  // Update fields
  if (req.body.latitude !== undefined) {
    user.location.latitude = req.body.latitude;
    console.log('New latitude: ', user.location.latitude);
  }
  if (req.body.longitude !== undefined) {
    user.location.longitude = req.body.longitude;
    console.log('New longitude: ', user.location.longitude);
  }
  if (req.body.gender !== undefined) {
    user.appearance.gender = req.body.gender;
    console.log('New gender: ', user.appearance.gender);
  }
  if (req.body.skin !== undefined) {
    user.appearance.skin = req.body.skin;
    console.log('New skin: ', user.appearance.skin);
  }
  if (req.body.hair !== undefined) {
    user.appearance.hair = req.body.hair;
    console.log('New hair: ', user.appearance.hair);
  }
  if (req.body.shirt !== undefined) {
    user.appearance.shirt = req.body.shirt;
    console.log('New shirt: ', user.appearance.shirt);
  }
  if (req.body.shorts !== undefined) {
    user.appearance.shorts = req.body.shorts;
    console.log('New shorts: ', user.appearance.shorts);
  }
  if (req.body.socks !== undefined) {
    user.appearance.socks = req.body.socks;
    console.log ('New socks: ', user.appearance.socks);
  }
  if (req.body.shoes !== undefined) {
    user.appearance.shoes = req.body.shoes;
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
  user.challenges = {};
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
  
  var challenger = {};
  if (user.challenger !== undefined) {
    challenger = retrieveUser(user.challenger);
    if (challenger !== undefined) {
      var obj = {};
      obj.location = challenger.location;
      obj.appearance = challenger.appearance;
      res.status(200).send(obj);
      return;
    }
  }
  
  res.status(404).send("No challenger found for this user\n");
});

app.get('/user/:id/find', (req, res) => {
  var user = retrieveUser(req.params.id);
  if (user === undefined) {
    res.status(404).send("User does not exist\n");
    return;
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
    user.challenger = nearest.id;
    database[user.id] = user;
    console.log("Challenger: ", user.challenger.id);
    res.status(200).send("Challenger found\n");
    return;
  }
  
  res.status(404).send("No challengers nearby\n");
});

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

app.listen(port, hostname, () => {
  console.log('Server running at ', hostname, ':', port);
});
