const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session =require ("express-session");
const path = require('path');

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
const LoginRoute = require('./routes/loginRoute');

//Iniciando a rota de login
const loginRouteInstance = new LoginRoute();
const loginRouter = loginRouteInstance.getRouter();

// Iniciando a rota da home
const homeRouteInstance = new HomeRoute();
homeRouteInstance.initialize();

// Iniciando a rota dos usuários
const usuarioRouteInstance = new UsuarioRoute();
const usuarioRouter = usuarioRouteInstance.getRouter();

app.use('/login', loginRouter); // Corrigido aqui para usar loginRouter em vez de LoginRouter
app.use('/', homeRouteInstance.getRouter());
app.use('/usuarios', usuarioRouter);

app.listen(process.env.port || 80, () => {
    console.log("Servidor web iniciado na porta 80");
});
