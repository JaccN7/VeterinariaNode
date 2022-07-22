const express = require('express');
const router = express.Router();
const path = require('path');

//Acceso carpeta public
router.use('/public', express.static(path.join(__dirname, '../../public')));

//Ruta principal - index (inicio sesión)
router.get('/', (req, res, next) => {
    res.render("index", {titulo : "prueba"});
});

router.use((req, res, next) => {
    const error = new Error('No encontrado');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).render("404").json({
        error: {
            message: error.message
        }
    });
})

module.exports = router;
