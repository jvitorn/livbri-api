const Livro = require("../models/livro");
const JWT = require('jsonwebtoken');

require('dotenv').config({ path: '.env' });


const routes = {
    list: '/api/livros',
    category: '/api/livros/categorias',
    search: '/api/livros/:parametro',
    searchBook: '/api/livros/busca/:search',
    listRecent: '/api/livros/recent',
    listTotal: '/api/livros/total',
    prices: '/api/livros/precos',
    countTotal: '/api/livros/count',
}

function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    JWT.verify(token, process.env.SIGNATURE, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}
module.exports = (app) => {
    app.route(routes.category)
        .get((req, res) => {
            Livro.listarCategorias(res);
        })
    app.route(routes.prices)
        .get((req, res) => {
            Livro.precosBaixos(res);
        })
    app.route(routes.listRecent)
        .get((req, res) => {
            Livro.listarRecent(res);
        })
    app.route(routes.countTotal)
        .get(verifyJWT, (req, res) => {
            Livro.contagemTotal(res);
        })
    app.route(routes.listTotal)
        .get(verifyJWT, (req, res) => {
            Livro.listarTodos(res);
        })
    app.route(routes.list)
        .post(verifyJWT, (req, res) => {
            const livro = req.body;
            Livro.criar(livro, res);
        })
        .get((req, res) => {
            Livro.listar(res);
        })
        .put(verifyJWT, (req, res) => {
            const livro = req.body;
            Livro.atualizar(livro, res);
        })
    app.route(routes.search)
        .get((req, res) => {
            const parametro = req.params.parametro;
            Livro.buscar(parametro, res);
        })


    app.route(routes.searchBook)
        .get((req, res) => {
            const titulo = req.params.search;
            Livro.buscarLivro(titulo, res);
        })

    app.route(routes.category)
        .get((req, res) => {
            Livro.listarCategorias(res);
        })


}