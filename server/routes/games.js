const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { insertEntry, findEntry } = require('../db/crud');

router.get('/games', async function(req, res) {
  const query = req.query;
  const result = await findEntry(query);
  res.json({'result': result });
});

router.post('/add-game', async(req, res) => {
    check('category', 'category is required').notEmpty()
    check('title', 'title is required').notEmpty()
    check('author', 'author is required').notEmpty() 
    check('images', 'images is required').notEmpty()
    var result = validationResult(req);
    if( !result || (result.errors.length) === 0) {
      try {
        await insertEntry(req.body);
        res.send({'success': 200});
      } catch (err) {
        res.send({"error": err});
      }
    }
    else {
        var error_msg = ''
        errors.forEach(function(error) {
          error_msg += error.msg + '<br>'
        })                
        req.send({'error': error_msg})
    }
});
 
module.exports = router;
