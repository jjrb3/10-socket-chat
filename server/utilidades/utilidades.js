
const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        date: new Date().getTime()
    }
};


module.exports = {
    crearMensaje
};