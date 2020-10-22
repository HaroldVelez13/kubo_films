//Rutas de nuestra app peliculas y categorias
const filmBuilder = require('../controllers/filmController');
const categoryBuilder = require('../controllers/categoryController');

module.exports = app => {
  //Rutas peliculas
  app
    .route('/')
    .get((req, res) => res.send('Init Films!'));
  app
    .route('/films')
    .get(filmBuilder.getFilms)
    .post(filmBuilder.createFilm);

  app
    .route('/films/:filmId')
    .get(filmBuilder.getFilm)
    .put(filmBuilder.updateFilm)
    .delete(filmBuilder.deleteFilm);

  //Rutas Categorias
  app
    .route('/categories')
    .get(categoryBuilder.getCategories)
    .post(categoryBuilder.createCategory);

  app
    .route('/categories/:categoryId')
    .get(categoryBuilder.getCategory)
    .put(categoryBuilder.updateCategory)
    .delete(categoryBuilder.deleteCategory);
};