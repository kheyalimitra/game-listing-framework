// const dbConfig = require("./config");
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const db = {};

// db.mongoose = mongoose;
// db.url = dbConfig.url;

// create an schema
var gameDetailsSchema = new mongoose.Schema({
  category: String,
  title: String,
  subtitle: String,
  description: String,
  images: Array,
  type: Number,
  tags: Array,
  author: String,
  replayBundleUrlJson: String,
  duration: Number,
  isDownloadable: Boolean,
  isStreamable: Boolean,
  version: Number
});
 
const gameModel = mongoose.model('games', gameDetailsSchema);
module.exports = gameModel;
// mongoose.model("Games", gameModel);
// mongoose.model(Games, gameDetails);