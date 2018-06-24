# For local development

```
sudo apt install npm
npm install
npm start
```

# For local container development

```
sudo apt install docker.io
sudo usermod -aG docker $USER
docker build -t healthy-competition .
docker run --rm -it -p 80:80 healthy-competition
```
