//require


const customExpress = require('./config/customExpress');
const mongoose = require('mongoose');
const connection = require('./infra/connection');
const collections = require('./infra/collections');
const port = 3332




connection.then(() => {
    const app = customExpress();
    //iniciando servidor
    app.listen(port, () => {
        console.log('Servidor Iniciado e Rodando no link http://localhost:' + port);
    });
    console.log("MongoDB connectado...");

    collections.init(connection, mongoose);


})
    .catch((error) => {
        console.log("Erro ao Connectar no MongoDB" + error);
    });




