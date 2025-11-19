// models/favoritesModel.js
const pool = require("../config/db_pgsql"); // conexión a PostgreSQL
const queries = require("../queries/favorites.queries");
const moviesModel = require("../models/movies.model"); // modelo de Mongo
const fetchMovie = require("../utils/fetchMovie.utils"); // función fetchMovieById

const createFavoriteModel = async (userId, movieId) => {
  let movieData;

  const apiResult = await fetchMovie.fetchMovieById(movieId);
  if (apiResult.length !== 0) {
    movieData = apiResult;
  }

  if (!movieData || apiResult.length === 0) {
    const movieMongo = await moviesModel.findOne({ _id: movieId }, "-_id -__v");
    if (!movieMongo) {
      throw new Error("La película no existe ni en OMDB ni en MongoDB");
    }
    movieData = movieMongo;
  }
  const { rows } = await pool.query(queries.createFavorite, [userId, movieId]);
  return { favorite: rows[0], movie: movieData };
};

module.exports = {
  createFavoriteModel,
};
