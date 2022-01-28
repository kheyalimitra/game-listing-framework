# Express API to support adding and fetching game details

This is a simple Node js , Express based API which allows to add new entry to db, fetch records based on query and delete entry from DB. This api is using MongoDB as nosql DB. 

## Available Scripts

I am using Docker Image to build and run it in local. In order to create am image for front end, run `docker build -t api-server ./server`


### Runs the app in the development mode.\
From Postman, we can hit http://localhost:5000 to GET, POST or DELETE entries.

### API end points
- POST /add-game
- GET /games(?query1=vale)
- DELETE /games(?query1=value)
For more details, please take a look at `games.swagger.yml` under `docs` folder. 
#### REST API in use: 
- GET: curl --location --request GET 'http://localhost:5000/games'
- POST: curl --location --request POST 'localhost:5000/add-game' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "category": "live",
            "title": "new game from docker",
            "subtitle": "Still",
            "description": "Hello there",
            "images": [
                {
                    "id": "1",
                    "url": "https://images.response.unity3d.com/EloquaImages/clients/Unity/%7B799cd0ab-b793-4762-bceb-42ec7f743e19%7D_Indie-XP-Series-Blog-header-1280x720-1.jpg",
                    "type": 1
                }
            ],
            "type": 1,
            "tags": [
                "mma",
                "fight",
                "GSP",
                "Kheyali Mitra"
            ],
            "author": "Kheyali Mitra",
            "replayBundleUrlJson": "urlgoeshere",
            "duration": 16.049999237060548,
            "isDownloadable": false,
            "isStreamable": true,
            "version": "1.0"
        }'
- DELETE: curl --location --request DELETE 'localhost:8080/games?title=Something%20Else'
### `npm test`
Launches the test runner in the interactive watch mode.
