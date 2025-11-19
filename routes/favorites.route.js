const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');

router.post('/', favoritesController.createFavorite);

module.exports = router;
