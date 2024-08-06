const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getMovies);
router.get('/movies/:id', movieController.getMovieById);
router.patch('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
