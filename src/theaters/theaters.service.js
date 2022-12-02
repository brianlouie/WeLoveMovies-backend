const knex = require("../db/connection");

function listShowingInTheater() {
  return knex("movies_theaters as mt")
    .join("movies", "mt.movie_id", "movies.movie_id")
    .join("theaters", "mt.theater_id", "theaters.theater_id")
    .select("theaters.*", "movies.*", "mt.is_showing", "mt.theater_id as movies_theater_id")
    .where({is_showing: true})
}

module.exports = {
  listShowingInTheater,
};
