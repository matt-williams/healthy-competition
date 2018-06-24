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

# For AWS ECS deployment

```
sudo apt install docker.io awscli
sudo usermod -aG docker $USER
aws configure
aws ecr get-login --no-include-email --region us-east-1
# Run docker login command returned by previous step.
docker build -t healthy-competition .
# Get ECS repository URI - this is an example
EC2_REPO_URI=964748558117.dkr.ecr.us-east-1.amazonaws.com/healthy-competition
docker tag healthy-competition $EC2_REPO_URI
docker push $EC2_REPO_URI
```

