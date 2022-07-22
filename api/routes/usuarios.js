const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Usuario = require('../models/usuario');

//Obtener todos los usuarios
router.get('/', checkAuth, async (req, res, next) => {
    try {
        const docs = await Usuario.find();
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'No hay usuarios registrados'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Obtener un usuario por id
router.get('/:rutUsuario', checkAuth, async (req, res, next) => {
    const id = req.params.rutUsuario;
    try {
        const doc = await Usuario.findOne({ rutUsuario: id });
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: `No se encontró ningún usuario con el rut ${rutUsuario}` });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Crear un usuario | SIGN UP
router.post('/signup', async (req, res, next) => {
    const id = req.body.rutUsuario;
    try {
        const usuarioExiste = await Usuario.findOne({ rutUsuario: id });
        if (usuarioExiste) {
            res.status(409).json({
                message: 'El usuario ya existe'
            });
        } else {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                const usuario = new Usuario({
                    _id: new mongoose.Types.ObjectId(),
                    rutUsuario: req.body.rutUsuario,
                    dv: req.body.dv,
                    nombre: req.body.nombre,
                    email: req.body.email,
                    password: hash,
                    rol: req.body.rol
                });
                const result = await usuario.save();
                res.status(201).json(result);
            } catch (err) {
                res.status(500).json({
                    error: err
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Iniciar sesión | LOGIN
router.post('/login', async (req, res, next) => {
    const id = req.body.rutUsuario;
    console.log(id);
    try {
        const usuario = await Usuario.findOne({ rutUsuario: id });
        if (usuario) {
            const validPassword = await bcrypt.compare(req.body.password, usuario.password);
            if (validPassword) {
                const token = jwt.sign({
                    rutUsuario: usuario.rutUsuario,
                    _id: usuario._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: '6h'
                });
                res.status(200).json({ 
                    token: token, 
                    estado: 200,
                    nombre: usuario.nombre,
                    message: 'Inicio de sesión exitoso' 
                }).end();
            } else {
                res.status(401).getHeaders({
                    estado: 401,
                    message: 'Contraseña incorrecta'
                });
            }
        } else {
            res.status(404).json({
                estado: 404,
                message: 'Usuario no encontrado'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Actualizar un usuario
router.put('/:rutUsuario', async (req, res, next) => {
    const id = req.params.rutUsuario;
    try {
        const result = await Usuario.updateOne({ rutUsuario: id }, { $set: req.body });
        res.status(200).json({
            result: result,
            message: 'Usuario actualizado correctamente'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//Eliminar un usuario
router.delete('/:rutUsuario', async (req, res, next) => {
    const id = req.params.rutUsuario;
    try {
        const result = await Usuario.remove({ rutUsuario: id });
        res.status(200).json({
            result: result,
            message: 'Usuario eliminado correctamente'
        });
    } catch (err) { }
});

module.exports = router;
