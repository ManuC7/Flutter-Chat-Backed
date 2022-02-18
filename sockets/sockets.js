const { comprobarJWT } = require('../helpers/jwt');
const { io } = require( '../index');
const { usuarioConectado, usuarioDesconectado, grabarMesaje} = require('../controllers/socket');
 
//Sockets Messages
io.on('connection', client => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autenticación
    if ( !valido ) { return client.disconnect();}

    console.log( 'Cliente autenticado' );
    console.log( valido, uid );

    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala específica
    // Sala global, client.id, mongoUID
    client.join( uid );

    client.on('mensaje-personal', async (payload) => {
        await grabarMesaje( payload );

        io.to( payload.para ).emit( 'mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente Desconectado')
        usuarioDesconectado( uid );
    });


    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });

    // });

});