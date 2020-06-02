//require
const mongoose = require('mongoose');
//configurações de conexao
const connection = mongoose.connect("mongodb://localhost/livbri",{
    useUnifiedTopology: true,
    useNewUrlParser:true
})

module.exports = connection;