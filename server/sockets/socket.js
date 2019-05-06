const { io } = require('../server');
const { Usuarios } = require('../classes/users');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                success: false,
                message: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre);

        callback(personas);
    });

    client.on('enviarMensaje', (data) => {
        let mensaje = crearMensaje(data.nombre, data.mensaje);

        client.broadcast.emit('crearMensaje', mensaje);
    });


    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.emit('crearMensaje', mensaje);
    });


    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersonas(client.id);

        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } abandonó el chat`));
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
    });
});