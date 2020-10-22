//Controlador de nuestras categorias
const mongoose = require('mongoose');
const category = mongoose.model('category');

exports.getCategories = (req, res) => {
  category.find({}, (err, categories) => {
    if (err) res.send(err);
    res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const newCategory = new category(req.body);
  newCategory.save((err, category) => {
    if (err) res.send(err);
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  category.findById(req.params.categoryId, (err, category) => {
    if (err) res.send(err);
    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  category.findOneAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    { new: true },
    (err, category) => {
      if (err) res.send(err);
      res.json(category);
    }
  );
};

exports.deleteCategory= (req, res) => {
  category.deleteOne({ _id: req.params.categoryId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Category successfully deleted',
     _id: req.params.categoryId
    });
  });
};