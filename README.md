# game-listing-framework
This is a dynamic game listing framework for a streaming application in Unity. This well-crafted listing UI (Unity app) needs to be populated with game titles from an external web server and database. You also need to create a simple web frontend that allows content creators to add additional game tiles to the listing

# Implementation details
## Tech stack
I have used MERN stack to implement this framework. 
- I have a very simple (bit ugly) UI front made wiith React
- Node as JS engine
- Express as api server
- Mongo DB to store Json data.
The aim is to build a simple API to GET games records and also Save (POST) new game entry in DB. 

I have also `dockrized` these services for the ease of running all 3 services (frontend, backend and db) locally. 

## Frontend : AKA React app
`client` folder contains react app code.
#### Dependencies
    "axios": "^0.25.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "^3.0.1",
    "web-vitals": "^2.1.4"
 - bootstrap css
 - React components.  
 - `npx create-react-app` is used to create boiler plate code for this
 The UI is a simple form with a submit button. Upon successful submission, a success alert with close button will be shown. 
 
 ## Backend: AKA api-service
 
 `server` folder contains express based api implementation.
 #### Dependencies
    "axios": "^0.25.0",
    "body-parser": "^1.19.1",
    "bootstrap": "^3.4.1",
    "cors": "^2.8.5",
    "express": "^4.17.2",
    "express-validator": "^6.14.0",
    "mongodb": "^4.3.1",
    "mongoose": "^6.1.8"
 #### API details
  ```
  GET: /games 
  GET: /games?key=val
  POST: /add-game
  DELETE: /games?key=value
  ```
  Please find swagger doc from `server/docs/`
  
  **Please find  all `curl` examples from `server/README`**
  
  #### Test
  - Unit Test to test CRUD operations
  - Integration test to test handler 
  
  To run test from local, 
  - from terminal, go to the repo, `cd ./server`
  - run `npm test`
  - from terminal, go to the repo, `cd ./client`
  - run `npm test`
 ## Database
 After doing market research, I found MongoDB will be suitable for this app as this is 
 - 1. NoSQL, meaning no need to create table structure
 - 2. We have nested Json data as input and nosql db like mongo db will be very easy to maintain and save json data.
 - 3. We don't have to worry about adding or removing keys from Json data, we can save it in anyway inside the collection
 - 3. If we think about future scalability, mongo db is still pretty solid option. 
 
 Based on their document: https://www.mongodb.com/basics/scaling#:~:text=As%20a%20NoSQL%20database%2C%20MongoDB,multiple%20nodes%20through%20horizontal%20scaling.
 ```Yes! As a modern, non-relational database, MongoDB is designed to efficiently handle large datasets through both horizontal and vertical scaling.```
 
 ## Config
 In this repo, we have 3 config files. 1 for client, 1 for server and last one for db. 
 - `clientConfig.js` : Contains API endpoint details
 - `server/config.js` : Contains Port number
 - `server/db/config.js` : Contains db name, collection name and url
 ## How to run
 ### Using Docker
 
 **Prerequisit: Docker** 
 
  Please read the Readme from `client` and `server` folder. It shows instruction on how to build docker images. We need both `react-app` and `api-service` images to run `docker compose`.
  ##### Docerization
For the sake of simplicity, all 3 services (frontend, backend and db) are bundled together in 3 docker containers. Using `docker-compose up`, we can easily run this in our local.
 
 In order to run this, we need 2 images. 
 1. react-app image. run `docker build -t react-app ./client`
 2. api-service image. run `docker build -t react-app ./server`
 3. We are using mongodb's stable image from docker hub. 
 
 After all images are ready, run `docker-compose up`. 
  ```
  Note: if you are running docker compose multiple times, you can run `docker-compore up --remove-orphan` to destroy existing containers
  ```
- React app is running on port 3000 by default.
- backend api is running on port 5000 by default.
- db is running on port 27017 by default.
  
## Assumptions
- Only 1 image entry is allowed. (id, uril and tag)
- Tags are allowed as space separate string. UI is not allowiing type and enter way of addition. 
- React UI is pretty basic, requesting user to all input as string. 
- Current API allows GET, POST and DELETE methods only. 
- POST method expects few required keys to be present, `category`, `title`, `author` and `image` details are required in order to add to DB
- DELETE must have query parameter. 
- GET without query parameter returns all, GET with query returns specific entry.

## Issues/ Challenges faces:
- Using Nosql db like MongoDB was a new concept, so there were some learning curve and few issues faced while tried to connect to DB using docker. 
- Dockeriazation of 3 services were not working initially, took some time to fix issues. 
- React UI with CSS was bit of a challenge. the UI is still ugly, but that is the most functioning I can create in given time frame.
- Unity hub: Again, good learning curve was there. Was stuck for a while to figure out where to call the method to fetch record and download images. 

## Future work / Enhancement
- Fixing UI, the UI needs to be more user friendly and beautiful. We need to allow multiple image entries.
- Adding more end point to api to allow UPDATE existing records
- Parameter validation of POST request, GET/DELETE queries
- Better response from API when there are errors. 
- May be better C# code for connecting endpoint and downloading images.


