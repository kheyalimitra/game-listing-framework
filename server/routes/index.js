var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gameModel = require('../db/model');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'add games' });
});
 
router.post('/add-game', function(req, res, next) {
     
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
  
    var errors = req.validationErrors()
     
    if( !errors ) {   //No errors were found.  Passed Validation!
      var userDetails = new userModel({
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
       
      userDetails .save((err, doc) => {
        if (!err){
          req.flash('success', 'User added successfully!');
          res.redirect('/');
        }
        else
          console.log('Error during record insertion : ' + err);
      });
   
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
         
        res.render('/', { 
            title: 'Add New User',
            name: req.body.name,
            email: req.body.email
        })
    }
});
 
module.exports = router;
