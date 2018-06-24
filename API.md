# API

`POST /user`

Creates a new user, allocating an ID (as a UUID) and returning a "user" object on response.

```
{
  "id": "00112233-4455-6677-8899-aabbccddeeff"
}
```

`PUT /user/<id>`

Updates the user with ID `<id>`.  The body of the request is of the following form.  Fields can be omitted as desired, in which case they retain their previous value.

```
{
  "id": "00112233-4455-6677-8899-aabbccddeeff",
  "location": {
    "latitude": 1.23,
    "longitude": 4.56,
    "timestamp": 123456789
  },
  "appearance": {
    "gender": "male",
    "hair": "black",
    "shirt": "red",
    "shorts": "white",
    "socks": "blue",
    "shoes": "blue"
  }
}  
```

`GET /user/<id>`

Gets the user with ID `<id>`, in the following form.

```
{
  "id": "00112233-4455-6677-8899-aabbccddeeff",
  "location": {
    "latitude": 1.23,
    "longitude": 4.56,
    "timestamp": 123456789
  },
  "appearance": {
    "gender": "male",
    "hair": "black",
    "shirt": "red",
    "shorts": "white",
    "socks": "blue",
    "shoes": "blue"
  }
}  
```

`GET /user/<id>/challenger`

Chooses a challenge.  If one is available, returns it, in the following form.  If none is available, returns 404.

```
{
  "location": {
    "latitude": 1.23,
    "longitude": 4.56,
    "timestamp": 123456789
  },
  "appearance": {
    "gender": "male",
    "hair": "black",
    "shirt": "red",
    "shorts": "white",
    "socks": "blue",
    "shoes": "blue"
  },
  "finish": {
    "latitude": 2.34,
    "longitude": 3.45,
    "over": true,
    "result": "win"
  }
}
```
