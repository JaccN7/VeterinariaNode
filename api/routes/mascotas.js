const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

//Esquema de mascota
const Mascota = require('../models/mascota');

//Obtener todas las mascotas
router.get('/', async (req, res, next) => {
    try {
        const docs = await Mascota.find();
        if (docs.length > 0) {
            res.status(200).render('dashboard');
        } else {
            res.status(404).json({
                message: 'No hay mascotas registradas'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Obtener una mascota por id
router.get('/:mascotasId', async (req, res, next) => {
    const id = parseInt(req.params.mascotasId);
    try {
        const doc = await Mascota.findOne({ mascotaId: id });
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: `No se encontró ninguna mascota con el id ${id}` });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Crear una mascota
router.post('/', async (req, res, next) => {
    const mascota = new Mascota({
        _id: new mongoose.Types.ObjectId(),
        mascotaId: req.body.mascotaId,
        nombre: req.body.nombre,
        rut_tutor: req.body.rut_tutor,
        especie: req.body.especie,
        raza: req.body.raza,
        color: req.body.color,
        sexo: req.body.sexo,
        est_reproductivo: req.body.est_reproductivo,
        fecha_nacimiento: req.body.fecha_nacimiento
    });
    try {
        const result = await mascota.save();
        res.status(201).json({
            createdMascota: result,
            message: 'Mascota creada correctamente'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Actualizar una mascota
router.put('/:mascotaId', async (req, res, next) => {
    const id = req.params.mascotaId;
    try {
        const result = await Mascota.updateOne({ mascotaId: id }, { $set: req.body });
        res.status(200).json({
            result: result,
            message: 'Mascota actualizada correctamente'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Eliminar una mascota
router.delete('/:mascotaId', async (req, res, next) => {
    const id = req.params.mascotaId;
    try {
        const doc = await Mascota.remove({ mascotaId: id });
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: `No se encontró ninguna mascota con el id ${id}` });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;