const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

app.set('view engine', 'ejs');
console.log(__dirname);
app.set('views', __dirname + '/views');

const ConfigRoutes = require('./api/routes/config');
const MascotasRoutes = require('./api/routes/mascotas');
const UsuariosRoutes = require('./api/routes/usuarios');

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_BD}.vhvy9.mongodb.net/veterinaria?retryWrites=true&w=majority`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Rutas
app.use('/', ConfigRoutes);
app.use('/mascotas', MascotasRoutes);
app.use('/usuarios', UsuariosRoutes);

app.use((req, res, next) => {
    const error = new Error('No encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).render("404").json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;
