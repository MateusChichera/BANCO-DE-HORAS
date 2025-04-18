const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

class UsuarioRoute {
    #router;

    getRouter() {
        return this.#router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new UsuarioController();
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrar);
        this.#router.get('/implantacoes', ctrl.implantacoesView);
        this.#router.post('/implantacoes', ctrl.implantacoes);
        this.#router.get('/relatorios', ctrl.relatorioViagens);

        this.#router.get('/editar/:id', ctrl.editarView);
        this.#router.post('/editar/:id', ctrl.editar);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.get('/buscar', ctrl.buscarHoras);
    }
}

module.exports = UsuarioRoute;
