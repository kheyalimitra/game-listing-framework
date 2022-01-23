var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
// var mongoose = require('mongoose');
var gameModel = require('../db/model');
const connect = require('../db/connection');
// const db = connect;
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
// const conSuccess = mongoose.connection
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'add games' });
});
 
router.post('/add-game', function(req, res, next) {
    check('category', 'category is required').notEmpty()
    check('title', 'title is required').notEmpty()
    check('author', 'author is required').notEmpty() 
    check('images', 'images is required').notEmpty()
    var result = validationResult(req)
     
    if( !result  || (result.errors.length) === 0) {   //No errors were found.  Passed Validation!
      
      connect.on("error", function(error){
        console.log("connection error:", error);
      });
      connect.once( "open", () => {
        var gameDetails = new gameModel({
          category: req.body.category,
          title: req.body.title,
          subtitle: req.body.subtitle,
          description: req.body.description,
          images: req.body.images,
          type: req.body.type,
          tags: req.body.tags,
          author: req.body.author,
          replayBundleUrlJson: req.body.replayBundleUrlJson,
          duration: req.body.duration,
          isDownloadable: req.body.isDownloadable,
          isStreamable: req.body.isStreamable,
          version: req.body.version
        });
        gameDetails.save((err, doc) => {
          if (!err){
            req.send({'success': doc });
            // res.redirect('/');
          }
          else
            console.log('Error during record insertion : ' + err);
        });
        connect.close(function(){
          console.log("connection closed.");
        });
      });
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.send({'error': error_msg})        
         
        res.render('/', { title: 'Add New Game' })
    }
});
 
module.exports = router;
