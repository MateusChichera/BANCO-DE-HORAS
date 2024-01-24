const Database = require('../utils/database')
const UsuarioController = require('../controllers/usuarioController');

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

    get extra() {
        return this.#extra;
    }

    set extra(extra){
        this.#extra = extra;
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


    constructor(usuId, usuNome, usuSenha, dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, extra,dia2){
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
    
    //NAO EXCLUIR POR ENQUANTO
    async excUsuarios(id) {
    
        let sql = "delete from tb_usuario where usu_id = ?"

        let rows = await conexao.ExecutaComando(sql, [id])
        
    }
    // NAO EDITAR POR ENQUANTO
    async edtUsuarios(id, nome, email, ativo, senha, per_id) {
        let sql = "UPDATE tb_usuario SET usu_nome = ?, usu_email = ?, usu_ativo = ?, usu_senha = ?, per_id = ? WHERE usu_id = ?";
      
        let rows = await conexao.ExecutaComando(sql, [nome, email, ativo, senha, per_id, id]);
      }
      async autenticar(usunome,ususenha) {
    
        let sql = "SELECT * FROM Usuario WHERE usunome = ? AND ususenhav = ?"

        let rows = await conexao.ExecutaComando(sql,[usunome, ususenha])

        return rows;
        
    }

    async buscahoras(usu_id,dia,dia2)
    {
        let sql = "SELECT * FROM Horas WHERE usuid = ? AND dia BETWEEN ? AND ? "

        let rows = await conexao.ExecutaComando(sql,[usu_id,dia,dia2])

        return rows;
        
    }
      
    
}


module.exports = UsuarioModel;