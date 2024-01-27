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
        this.#router.get('/editar/:id', ctrl.editarView);
        this.#router.post('/editar', ctrl.editar);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.get('/buscar', ctrl.buscarHoras);
        // Adicione esta parte para configurar a rota /usuarios/editar/:id
this.#router.get('/editar/:id', (req, res) => {
    res.render('usuario/editar', { userId: req.params.id });
});


    }
}

module.exports = UsuarioRoute;
