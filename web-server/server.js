const fs = require('fs');
const uuidv1 = require('uuid/v1');
const express = require('express');
const body = require('body');
const bodyParser = require('body-parser');
const jsonBody = require('body/json');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const database = {};

// Load dummy user 1
var user1 = fs.readFileSync('./user1.json');
var jsonUser1 = JSON.parse(user1);
database[jsonUser1.id] = jsonUser1;

app.get('/', (req, res) => {
  res.status(200).send("Here Comes A New Challenger");
});

app.get('/user/:id', (req, res) => {
  console.log('GET /user/', req.params.id);
  // Search database
  var user = {};
  if (database[req.params.id] !== undefined) {
    user = database[req.params.id];
  } else {
    res.status(404).send("User does not exist");
  }
  res.send(user);
});

app.put('/user/:id', (req, res) => {
  console.log('PUT /user/', req.params.id);
  console.log(req.body);

  // Try retrieving user from database
  var user = {};
  if (database[req.params.id] !== undefined) {
    user = database[req.params.id];
  } else {
    res.status(404).send("User does not exist");
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

app.post('/user', (req, res) => {
  if (req.method === 'POST') {
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
  }
});

app.get('/user/:id/challenges', (req, res) => {
  // Search for user in database
  var user = {};
  if (database[req.params.id] !== undefined) {
    user = database[req.params.id];
  } else {
    res.status(404).send("User does not exist");
  }
  res.status(200).send(user.challenges);
});

app.listen(port, hostname, () => {
  console.log('Server running at ', hostname, ':', port);
});
