const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .distinct()
    .select("movies.*", "mt.is_showing")
    .where({ "mt.is_showing": true });
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id: movie_id }).first();
}

function readTheaters(movie_id) {
  return knex("movies_theaters as mt")
    .join("movies", "movies.movie_id", "mt.movie_id")
    .join("theaters", "mt.theater_id", "theaters.theater_id")
    .select("theaters.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movie_id })
    .andWhere({ "mt.is_showing": true });
}

function readReviews(movie_id) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.*", "critics.*")
    .where({ "reviews.movie_id": movie_id })
    .then((reviews) => reviews.map((review) => addCritic(review)));
}

module.exports = {
  list,
  listShowing,
  read,
  readTheaters,
  readReviews,
};
