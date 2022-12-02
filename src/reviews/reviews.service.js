const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews as r")
    .join("critics", "r.critic_id", "critics.critic_id")
    .select(
      "r.review_id",
      "r.created_at as created",
      "r.updated_at as updated",
      "r.critic_id",
      "r.movie_id",
      "r.content",
      "r.score",
      "critics.*"
    )
    .where({ review_id: reviewId })
    .first();
}

function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

module.exports = {
  destroy,
  read,
  update,
};
