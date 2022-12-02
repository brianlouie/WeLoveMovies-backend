const moviesService = require("./movies.service");

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing === "true") {
    const data = await moviesService.listShowing();
    res.json({ data });
  } else {
    const data = await moviesService.list();
    res.json({ data });
  }
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters(req, res) {
  const data = await moviesService.readTheaters(req.params.movieId);
  res.json({ data });
}

async function readReviews(req, res) {
  const data = await moviesService.readReviews(req.params.movieId);
  res.json({ data });
}

module.exports = {
  list,
  read: [movieExists, read],
  readTheaters: [movieExists, readTheaters],
  readReviews: [movieExists, readReviews],
};
