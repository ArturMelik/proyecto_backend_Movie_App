// controllers/favoritesController.js
const favoritesModel = require("../models/favorites.model");

const createFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ message: "Faltan datos: Id del user o Id de la película" });
    }
    const result = await favoritesModel.createFavoriteModel(userId, movieId);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFavorite,
};
