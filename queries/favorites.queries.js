const queries = {
  getFavoriteById: `
    SELECT movie_id FROM favorites
    WHERE id_user = $1
`,

  createFavorite: `
    INSERT INTO favorites (id_user, id_movie)
    VALUES ($1, $2)
    RETURNING *;
    `,
};
module.exports = queries;
