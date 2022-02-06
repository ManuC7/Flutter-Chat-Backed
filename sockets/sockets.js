const { io } = require( '../index');

//Sockets Messages
io.on('connection', client => {
    console.log('Cliente se conecta');

    client.on('disconnect', () => {
        console.log('Cliente Desconectado')
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });

    // });

});