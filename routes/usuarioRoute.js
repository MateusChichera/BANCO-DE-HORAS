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
        this.#router.get('/viagem', ctrl.listarViagens);
        this.#router.post('/cadastrar', ctrl.cadastrar);
        this.#router.get('/implantacoes', ctrl.implantacoesView);
        this.#router.post('/implantacoes', ctrl.implantacoes);
        this.#router.get('/relatorios', ctrl.relatorioViagens);
        this.#router.get('/calendario',ctrl.buscarCalendario)

        this.#router.get('/importar', ctrl.importarView);
        this.#router.post('/importar', ctrl.implantacoesEmMassa);

        this.#router.post('/deletar', ctrl.deletarImp);
        this.#router.get('/editar/viagem', ctrl.editarimplantacaoView);
        this.#router.get('/editar/viagem/:id', ctrl.editarImpView);
        this.#router.post('/edt/viagem/:id', ctrl.atualizarImplantacao);
        this.#router.get('/editar/:id', ctrl.editarView);
        this.#router.get('/detalhes/:id', ctrl.buscarDetalhes);
        this.#router.post('/editar/:id', ctrl.editar);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.get('/buscar', ctrl.buscarHoras);
        this.#router.get('/agendamentos', ctrl.Viagens);
    }
}

module.exports = UsuarioRoute;
