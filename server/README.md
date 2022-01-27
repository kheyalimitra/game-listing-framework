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

### `npm test`
Launches the test runner in the interactive watch mode.
