const express  = require("express");
const path = require("path");
var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var bodyParser = require('body-parser');
// var flash = require('express-flash');
// var session = require('express-session');
var gamesRouter = require('./routes/games');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
const port = process.env.PORT || "8080";

// view engine setup
app.set('views', path.join(__dirname, 'client/public'));
app.set('view engine', 'ejs');// catch 404 and forward to error handler
app.use('/', gamesRouter);
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.json({ "error" : err });
});
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});