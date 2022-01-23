const { Int32 } = require("mongodb");
const { connect } = require("mongoose");

const mongoose = require('./connection');
 
// create an schema
var userSchema = new mongoose.Schema({
  category: String,
  title: String,
  subtitle: String,
  description: String,
  images: Array,
  type: Int32,
  tags: Array,
  author: String,
  replayBundleUrlJson: String,
  duration: Number,
  isDownloadable: Boolean,
  isStreamable: Boolean,
  version: Number
});
 
var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model(Users, userModel);