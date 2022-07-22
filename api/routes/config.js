const express = require('express');
const router = express.Router();
const path = require('path');

//Acceso carpeta public
router.use('/public', express.static(path.join(__dirname, '../../public')));

//Ruta principal - index (inicio sesión)
router.get('/', (req, res, next) => {
    res.render("index", {titulo : "prueba"});
});


module.exports = router;
