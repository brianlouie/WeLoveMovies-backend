const reviewsService = require("./reviews.service.js");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.destroy(review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const { review } = res.locals;
  const updatedReview = {
    ...req.body.data,
    review_id: review.review_id,
  };

  await reviewsService.update(updatedReview);
  const read = await reviewsService.read(updatedReview.review_id);
  const reviewWithCritic = {
    review_id: read.review_id,
    created_at: read.created,
    updated_at: read.updated,
    movie_id: read.movie_id,
    content: read.content,
    critic_id: read.critic_id,
    score: read.score,
    critic: {
      preferred_name: read.preferred_name,
      surname: read.surname,
      organization_name: read.organization_name,
    },
  };

  res.json({ data: reviewWithCritic });
}

module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
};
