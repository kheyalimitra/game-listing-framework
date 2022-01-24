const express  = require("express");
const path = require("path");
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const gamesRouter = require('./routes/games');
const db = require("./db/connection");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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