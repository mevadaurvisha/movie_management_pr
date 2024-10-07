const movieModel = require('../models/movie-model');
const fs = require('fs');
const path = require('path');

const defaultController = async (req, res) => {
    const movies = await movieModel.find();
    res.render('index', { movies });
};
const addMovie = (req, res) => {
    res.render('addMovies');
};

const addMovieController = async (req, res) => {
    const newMovie = new movieModel({
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        rating: req.body.rating,
        poster: req.file ? req.file.filename : undefined
    });

    await newMovie.save();
    res.redirect('/');
};
const editMovie = async (req, res) => {
    const movies = await movieModel.findById(req.params.id);
        if (!movies) {
            return res.status(404).send('Movie not found');
        }
        res.render('editMovies', { movies });
};
const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const movies = await movieModel.findById(movieId);

        if (!movies) {
            return res.status(404).send('Movie not found');
        }
        movies.title = req.body.title;
        movies.description = req.body.description;
        movies.releaseDate = req.body.releaseDate;
        movies.genre = req.body.genre;
        movies.rating = req.body.rating;
        if (req.file) {
            const oldPosterPath = path.join(__dirname, '../uploads/', movies.poster);
            fs.unlink(oldPosterPath, (err) => {
                if (err) {
                    console.error('Error while deleting old poster:', err);
                }
            });
            movies.poster = req.file.filename;
        }
        await movies.save();
        res.redirect('/');
};

 const deleteMovie = async (req, res) => {
    const movieId = req.params.id;
        const movies = await movieModel.findById(movieId);

        const posterPath = path.join(__dirname, '../uploads/', movies.poster);

        await movieModel.findByIdAndDelete(movieId);

        // Delete the poster image from the file system
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.error('Error while deleting poster:', err);
            }
        });

        res.redirect('/');
};
module.exports = {addMovie,deleteMovie , updateMovie , editMovie , addMovieController , defaultController};