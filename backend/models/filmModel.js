//Modelo de nuestras peliculas
const mongoose = require('mongoose');
const { Schema } = mongoose;

const FilmSchema = new Schema(
  {
    image_url: {
      type: String,
      required: 'image url cannot be blank'
    },
    title: {
      type: String,
      required: 'title cannot be blank'
    },
    description: {
      type: String,
      required: 'description  cannot be blank'
    },
    duration: {
      type: Number,
      required: 'duration cannot be blank'
    },
    trailer_url: {
      type: String,
      required: 'trailer url cannot be blank'
    },
    premiere_date: {
      type: Date,
      required: 'premiere date cannot be blank'
    },
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
    ]
  },
  { collection: 'film' }
);

FilmSchema.path('trailer_url').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

FilmSchema.path('image_url').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('film', FilmSchema);