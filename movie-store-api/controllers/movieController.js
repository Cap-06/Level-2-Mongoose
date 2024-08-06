const Movie = require('../models/movie');

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMovies = async (req, res) => {
  try {
    const { title, rating, q, sortBy, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (title) filter.title = title;
    if (rating) filter.rating = rating;
    if (q) filter.title = new RegExp(q, 'i');

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sortBy ? { [sortBy]: 1 } : {},
    };

    const movies = await Movie.find(filter)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};
