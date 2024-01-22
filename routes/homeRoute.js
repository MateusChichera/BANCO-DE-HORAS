const express = require('express');
const HomeController = require('../controllers/homeController');

class HomeRoute {
    #router;

    getRouter() {
        return this.#router;
    }

    initialize() {
        this.#router = express.Router();

        const ctrl = new HomeController();
        
        // Ajuste na rota para verificar autenticação antes de renderizar a homepage
        this.#router.get("/", (req, res, next) => {
                // Usuário autenticado, renderiza a homepage
                ctrl.homeView(req, res, next);
            
        });
    }
}

module.exports = HomeRoute;
