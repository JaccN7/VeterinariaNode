const mongoose = require('mongoose');
const mascotaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mascotaId: {
        type: Number,
        min: 1,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    rut_tutor: {
        type: Number,
        min: 1000000,
        max: 99999999,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    est_reproductivo: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mascota', mascotaSchema);