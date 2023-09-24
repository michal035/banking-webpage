### Some of the commads

Build the image

```docker build -t flask-app .```

Start the Flask server

```docker run -p 5000:5000 flask-app```

Start db

```sudo docker-compose up -d```


Start all

```docker-compose up --build```


'Login' to the database:

```docker-compose exec postgres psql -U postgres -d user_information```