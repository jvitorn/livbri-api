const Usuario = require('../models/usuario');
const routes = {
    list:'/api/usuario',
    listId:'/api/usuario/:id',
    session:'/api/session',
}

module.exports =  (app) => {
    app.route(routes.list)  
        .get((req,res)=>{
            Usuario.listar(res);
        })
        .post((req,res)=>{
           const usuario = req.body;
           Usuario.criarUsuario(usuario,res);
        })
        .patch((req,res)=>{
            const id = req.headers.authorization;
            const valores = req.body;
            Usuario.atualizar(id,valores,res);
        })
    app.route(routes.listId)
        .delete((req,res)=>{
            const id = req.params.id
            Usuario.deletarUsuario(id,res);
        });
    app.post(routes.session,(req,res)=>{
        const usuario = req.body;
        Usuario.logarUsuario(usuario,res);
    })
}