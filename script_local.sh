#!/bin/bash

# Create a new user
curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 1.23,"longitude": 4.56,"timestamp":123456789},"appearance": {"gender": "male","hair": "pink","shirt": "red","shorts": "green","socks": "blue","shoes": "blue"}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

# New user issues a challenge
curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger

# New user updates location several times
curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 1.77,"longitude": 4.77}, "appearance": {}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 2.77,"longitude": 4.77}, "appearance": {}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 3.77,"longitude": 4.77}, "appearance": {}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 4.77,"longitude": 4.77}, "appearance": {}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 5.77,"longitude": 4.77}, "appearance": {}}' -H "Content-Type:application/json" http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://127.0.0.1:3000/user/00112233-4455-6677-8899-aabbccddeefg/challenger