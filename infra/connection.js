//require
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

//configurações de conexao

const connection = mongoose.connect("mongodb+srv://"+process.env.USER_DB+":<"+process.env.PASSWORD_DB+">@cluster0-ydowt.gcp.mongodb.net/test?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser:true
})

module.exports = connection;