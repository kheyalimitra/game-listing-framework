// var mongoose = require('mongoose');
const dbConfig = require("./config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
module.exports = db;
// mongoose.connect('mongodb://localhost:27017/games', {useNewUrlParser: true, useUnifiedTopology: true,
// useCreateIndex: true});
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     console.log('database is connected successfully');
// });
// conn.on('disconnected',function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// module.exports = conn;