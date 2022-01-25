const express = require('express');
const router = express.Router();
const { 
  handleCreateGame,
  handleFetchGames,
  handleDeleteGame
} = require('../handlers/games');

router.get('/games', handleCreateGame);
router.post('/add-game', handleFetchGames);
router.delete('/games', handleDeleteGame);
 
module.exports = router;
