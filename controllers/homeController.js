
const moment = require('moment');



class HomeController {
    homeView(req, res) {
        // Suponhamos que você queira obter o nome do usuário a partir da sessão (ou de onde quer que venha)
        //const nomeUsuario = req.usuario ? req.usuario.nome : 'Fulvio Fanelli';

        // Suponhamos que você tenha uma lista de carros do usuário (ou de onde quer que venha)
       // const carrosUsuario = req.usuario ? req.usuario.carros : ["Corolla", "Uno", "Landau", "Marea Turbo", "206"];

        res.render('Home/home', {
        });
    }
}

module.exports = HomeController;
