const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layout');

app.use(express.static("public/"))
app.use(ejsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rotas separadas
const HomeRoute = require('./routes/homeRoute');
const UsuarioRoute = require('./routes/usuarioRoute');

const homeRouteInstance = new HomeRoute();
homeRouteInstance.initialize();

const usuarioRouteInstance = new UsuarioRoute();
const usuarioRouter = usuarioRouteInstance.getRouter();

app.use('/', homeRouteInstance.getRouter());
app.use('/usuarios', usuarioRouter);

app.listen(process.env.prot || 5000, () => {
    console.log("Servidor web iniciado na porta 5000");
});
