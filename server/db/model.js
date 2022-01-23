// const { Int32 } = require("mongodb");
// const { connect } = require("mongoose");
const mongoose = require('mongoose');
 
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
 
var gameDetails = mongoose.model('games', gameDetailsSchema);
module.exports = gameDetails;
// mongoose.model(Games, gameDetails);