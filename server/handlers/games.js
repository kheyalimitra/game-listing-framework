const { check, validationResult } = require('express-validator');
const { insertEntry, findEntry, deleteEntry } = require('../db/crud');

const handleFetchGame = async (req, res) => {
  const query = req.query;
  const result = await findEntry(query);
  if (result && Array.isArray(result)) {
    res.send(result);
  } else {
    res.send({'error': 'something went wrong'})
  }
}
const handleDeleteGame = async (req, res) => {
  const query = req.query;
  const response = await deleteEntry(query);
  if(response && response.deletedCount) {
    res.send({'success': `${response.deletedCount} entries are deleted` });
  }
  res.send({'error' : 'nothing is deleted'});

}
const handleCreateGame = async(req, res) => {
  // in order to add entry to collection,we need few fields listed below.
  // without them, error will be thrown.
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
        error_msg += error.msg + ' '
      })                
      req.send({'error': error_msg})
  }
};
module.exports = {
  handleCreateGame,
  handleFetchGame,
  handleDeleteGame
}