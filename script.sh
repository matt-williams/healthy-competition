#!/bin/bash

# Create a new user
curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5239569,"longitude": -0.0882439,"timestamp":123456789},"appearance": {"gender": "male","hair": "pink","shirt": "red","shorts": "green","socks": "blue","shoes": "blue"}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

# New user issues a challenge
curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger

# New user updates location several times
curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5242974,"longitude": -0.0863556}, "appearance": {}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5250216,"longitude": -0.085111}, "appearance": {}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5248439,"longitude": -0.0852532}, "appearance": {}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5239494,"longitude": -0.0854115}, "appearance": {}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger

curl -X PUT --data '{"id": "00112233-4455-6677-8899-aabbccddeefg","location": {"latitude": 51.5239569,"longitude": -0.0860552}, "appearance": {}}' -H "Content-Type:application/json" http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg

curl -X GET http://healthy-competition.uk.to/user/00112233-4455-6677-8899-aabbccddeefg/challenger