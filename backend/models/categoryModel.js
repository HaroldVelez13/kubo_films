//Modelo de nuestras categorias
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: 'category name cannot be blank'
    },
    films: [
        {  type: mongoose.Schema.Types.ObjectId, ref: 'film' }
    ]
  },
  { collection: 'category' }
);


module.exports = mongoose.model('category', CategorySchema);