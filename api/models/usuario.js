const mongoose = require('mongoose');
const usuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rutUsuario: {
        type: Number,
        min: 1000000,
        max: 99999999,
        required: true,
        unique: true
    },
    dv: { 
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);