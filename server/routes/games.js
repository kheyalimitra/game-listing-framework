const express = require('express');
const router = express.Router();
const { 
  handleCreateGame,
  handleFetchGame,
  handleDeleteGame
} = require('../handlers/games');

router.get('/games', handleFetchGame);
router.post('/add-game', handleCreateGame);
router.delete('/games', handleDeleteGame);
 
module.exports = router;
