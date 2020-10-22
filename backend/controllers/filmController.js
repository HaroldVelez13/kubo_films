//Controlador de nuestras peliculas
const mongoose = require('mongoose');
const film = mongoose.model('film');

exports.getFilms = (req, res) => {

  /* film.find({}, (err, films) => {
    if (err) res.send(err);
    res.json(films);
  }); */
  film.find()
  .populate({path:'category', select:'name'})
  .exec((err, films) => {
    if (err) res.send(err);
    res.json(films);
  });

};

exports.createFilm = (req, res) => {
  const newFilm = new film(req.body);
  newFilm.save((err, film) => {
    if (err) res.send(err);
    res.json(film);
  });
};

exports.getFilm = (req, res) => {
  /* film.findById(req.params.filmId, (err, film) => {
    if (err) res.send(err);
    res.json(film);
  }); */
  film.findById(req.params.filmId)
  .populate('category')
  .exec((err, films) => {
    if (err) res.send(err);
    res.json(films);
  });
};

exports.updateFilm = (req, res) => {
  film.findOneAndUpdate(
    { _id: req.params.filmId },
    req.body,
    { new: true },
    (err, film) => {
      if (err) res.send(err);
      res.json(film);
    }
  );
};

exports.deleteFilm= (req, res) => {
  film.deleteOne({ _id: req.params.filmId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Film successfully deleted',
     _id: req.params.filmId
    });
  });
};