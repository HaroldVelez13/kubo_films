//Importamos las dependencias
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Importamos nuestras dependencias
global.Film = require('./models/filmModel');
global.Category = require('./models/categoryModel');
const routes = require('./routes/filmRoutes');

//Configuramos la coneccion a nuestra db
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
/* mongoose.connect(
  'mongodb://localhost:27017/kubofilms',
  {useNewUrlParser: true, useUnifiedTopology: true}
); */

mongoose.connect('mongodb://mongodb:27017/kubofilms',
{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

//Configuramos express
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Inicializamos nuestra app
routes(app);

//Levantamos el servidor
app.listen(port);

//Catch errores
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

//Flat para cuando inicia el servidor
console.log(`Server started on port ${port}`);