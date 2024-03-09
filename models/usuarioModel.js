const Database = require('../utils/database')
const UsuarioController = require('../controllers/usuarioController');
const bcrypt = require('bcrypt');


const conexao = new Database();

class UsuarioModel {
    #usuId;
    #usuNome;
    #usuSenha;
    #dia
    #entrada
    #cafe1
    #cafe2
    #almoco1
    #almoco2
    #cafe3
    #cafe4
    #saida
    #extra
    #dia2
    #idhora
    #cidade
    #tipo
    #data
    #estado
    #obs
    #cliente

    //cidade
    get cidade(){
        return this.#cidade;
    }
    set cidade(cidade){
        return this.#cidade = cidade;
    }
    //TIPO
    get tipo(){
        return this.#tipo;
    }
    set tipo(tipo){
        return this.#tipo = tipo;
    }
    //DATA
    get data(){
        return this.#data;
    }
    set data(data){
        return this.#data=data;
    }
    //estado
    get estado(){
        return this.#estado;
    }
    set estado(estado){
        return this.#estado=estado;
    }
    //OBSERVAÇÕES
    get obs(){
        return this.#obs;
    }
    set obs(obs){
        return this.#obs=obs;
    }
    //cliente
    get cliente(){
        return this.#cliente;
    }
    set cliente(cliente){
        return this.#cliente=cliente;
    }



     // ARMAZENA HORA EXTRA
    get extra() {
        return this.#extra;
    }

    set extra(extra){
        this.#extra = extra;
    }
    //ID DA HORA
    get idhora() {
        return this.#idhora;
    }

    set idhora(idhora){
        this.#idhora = idhora;
    }


    //ID USUARIO
    get usuId() {
        return this.#usuId;
    }

    set usuId(usuId){
        this.#usuId = usuId;
    }
    //NOME DO USUARIO
    get usuNome() {
        return this.#usuNome;
    }

    set usuNome(usuNome){
        this.#usuNome = usuNome;
    }
    //SENHA DO USUARIO
    get usuSenha() {
        return this.#usuSenha;
    }

    set usuSenha(usuSenha){
        this.#usuSenha = usuSenha;
    }
    //DATA DO DIA 
    get dia() {
        return this.#dia;
    }

    set dia(dia){
        this.#dia = dia;
    }
    //SEGUNDA DATA PARA O SELECT
    get dia2() {
        return this.#dia2;
    }

    set dia2(dia2){
        this.#dia2 = dia2;
    }
    //HORA DE ENTRADA
    get entrada() {
        return this.#entrada;
    }

    set entrada(entrada) {
        this.#entrada = entrada;
    }
    //HORA DO CAFÉ DA MANHÃ
    get cafe1() {
        return this.#cafe1;
    }

    set cafe1(cafe1) {
        this.#cafe1 = cafe1;
    }
    //VOLTA DO CAFÉ DA MANHÃ
    get cafe2() {
        return this.#cafe2;
    }

    set cafe2(cafe2) {
        this.#cafe2 = cafe2;
    }
    //SAIDA PARA O ALMOÇO
    get almoco1() {
        return this.#almoco1;
    }

    set almoco1(almoco1) {
        this.#almoco1 = almoco1;
    }
    //VOLTA DO ALMOCO
    get almoco2() {
        return this.#almoco2;
    }

    set almoco2(almoco2) {
        this.#almoco2 = almoco2;
    }
    //HORA DO CAFÉ DA TARDE
    get cafe3() {
        return this.#cafe3;
    }

    set cafe3(cafe3) {
        this.#cafe3 = cafe3;
    }
    //VOLTA DO CAFÉ DA TARDE
    get cafe4() {
        return this.#cafe4;
    }

    set cafe4(cafe4) {
        this.#cafe4 = cafe4;
    }
    // HORA DA SAIDA
    get saida() {
        return this.#saida;
    }

    set saida(saida) {
        this.#saida = saida;
    }


    constructor(usuId, usuNome, usuSenha, dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, extra,dia2,idhora,obs,cidade,tipo,estado,cliente,data){
        this.#usuId = usuId;
        this.#usuNome = usuNome;
        this.#usuSenha = usuSenha;
        this.#dia = dia;
        this.#entrada = entrada;
        this.#cafe1 = cafe1;
        this.#cafe2 = cafe2;
        this.#almoco1 = almoco1;
        this.#almoco2 = almoco2;
        this.#cafe3 = cafe3;
        this.#cafe4 = cafe4;
        this.#saida = saida;
        this.#extra = extra;
        this.#dia2 = dia2;
        this.#idhora = idhora;
        this.#cidade = cidade;
        this.#tipo = tipo;
        this.#estado = estado;
        this.#obs = obs;
        this.#cliente = cliente;
        this.#data = data;
        
    }
//DEFININDO MODELO E LISTANDO 
async listarUsuarios(usuid) {
    let lista = [];

    let sql = "SELECT * FROM Horas WHERE usuid = ?";

    let rows = await conexao.ExecutaComando(sql, [usuid]);

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        let usuario = new UsuarioModel(
            row["usuid"],
            row["dia"],
            row["entrada"],
            row["cafe1"],
            row["cafe2"],
            row["almoco1"],
            row["almoco2"],
            row["cafe3"],
            row["cafe4"],
            row["saida"],
            row["extra"]
        );

        lista.push(usuario);
    }

    return lista;
}


    //ADCIONAR HORAS
    async adcUsuarios(usuid, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, dia,extra) {
        let sql = "INSERT INTO Horas (dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, usuid,extra) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    
        let rows = await conexao.ExecutaComando(sql, [dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, usuid,extra]);
    }

    // ADCIONAR IMPLANTAÇÃO
    async adcImplantacao(usuid,tipo,cliente,data,estado,cidade,obs){

        let sql = "INSERT INTO implantacoes (usuid, imp_nome, imp_cidade, imp_estado, imp_dia, imp_tipo, imp_obs) VALUES (?,?,?,?,?,?,?)"

        let rows = await conexao.ExecutaComando(sql, [usuid,cliente,cidade,estado,data,tipo,obs]);

    }
    
    //EM TESTE
    async excUsuarios(id) {
    
        let sql = "delete from Horas where idhora = ?"

        let rows = await conexao.ExecutaComando(sql, [id])
        
    }
    // SELECT PELO ID DA HORA
    async buscaid(idhora) {
    
        let sql = "SELECT * FROM Horas WHERE idhora = ? "

        let rows = await conexao.ExecutaComando(sql,[idhora])

        return rows;
        
    }
    
    //FUNCIONANDO 
    async edtUsuarios(usuid, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, dia, extra, idhora) {
        console.log('Edição em progresso...');
        let sql = "UPDATE Horas SET dia = ?, entrada = ?, cafe1 = ?, cafe2 = ?, almoco1 = ?, almoco2 = ?, cafe3 = ?, cafe4 = ?, saida = ?, usuid = ?, extra = ? WHERE idhora = ?";
        let rows = await conexao.ExecutaComando(sql, [dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, usuid, extra, idhora]);
        console.log('Edição concluída!');
        return rows; // Certifique-se de que sua função retorna a promessa
    }
    // autentica o usuario e senha no banco
    async autenticar(email, senha) {
        let sql = "SELECT * FROM Usuario WHERE usunome = ? AND ususenha = ?";
        let rows = await conexao.ExecutaComando(sql, [email, senha]);
        
        if (rows.length > 0) {
            return rows[0]; // Retorna o usuário encontrado
        } else {
            return null; // Retorna null se o usuário não for encontrado ou a senha estiver incorreta
        }
    }
    // BUSCA AS HORAS COM DATAS DE INICIO E FIM ORDENADO
    async buscahoras(usu_id, dia, dia2) {
        let sql = "SELECT * FROM Horas WHERE usuid = ? AND dia BETWEEN ? AND ? ORDER BY dia";
    
        let rows = await conexao.ExecutaComando(sql, [usu_id, dia, dia2]);
    
        return rows;
    }
    // busca implantacoes
    async buscaimplantacoes(usu_id,dia,dia2){
        let sql = "SELECT * FROM implantacoes WHERE usuid = ? AND imp_dia BETWEEN ? AND ? ORDER BY imp_dia";
    
        let rows = await conexao.ExecutaComando(sql, [usu_id, dia, dia2]);
        return rows;
    }
      
    
}


module.exports = UsuarioModel;