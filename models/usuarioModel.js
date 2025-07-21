const Database = require('../utils/database')

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
    #imp_contato
    #imp_tel
    #imp_tel1
    #imp_sis
    #imp_dtvenc
    #imp_datapag
    #imp_mensalidade
    #imp_tel2
    #imp_tel3
    #imp_carro
    #imp_dia1
    #imp_vendedorcod
    #imp_taxa

    // IMPLANTAÇÃO

    get imp_dia1(){
        return this.#imp_dia1
    }
    set imp_dia1(imp_dia1){
        this.#imp_dia1 = imp_dia1
    }
    get imp_vendedorcod(){
        return this.#imp_vendedorcod
    }
    set imp_vendedorcod(imp_vendedorcod){  
        this.#imp_vendedorcod = imp_vendedorcod
    }
    get imp_taxa(){
        return this.#imp_taxa
    }
    set imp_taxa(imp_taxa){
        this.#imp_taxa = imp_taxa
    }

    get imp_carro() { // Nome do contato
        return this.#imp_carro;
    }
    set imp_carro(imp_carro) {
        this.#imp_carro = imp_carro;
    }

    get imp_contato() { // Nome do contato
        return this.#imp_contato;
    }
    set imp_contato(imp_contato) {
        this.#imp_contato = imp_contato;
    }

    get imp_tel() { // Telefone principal
        return this.#imp_tel;
    }
    set imp_tel(imp_tel) {
        this.#imp_tel = imp_tel;
    }

    get imp_tel1() { // Telefone secundário
        return this.#imp_tel1;
    }
    set imp_tel1(imp_tel1) {
        this.#imp_tel1 = imp_tel1;
    }

    get imp_sis() { // Nome do sistema
        return this.#imp_sis;
    }
    set imp_sis(imp_sis) {
        this.#imp_sis = imp_sis;
    }

    get imp_dtvenc() { // Data de vencimento
        return this.#imp_dtvenc;
    }
    set imp_dtvenc(imp_dtvenc) {
        this.#imp_dtvenc = imp_dtvenc;
    }

    get imp_datapag() { // Data de pagamento
        return this.#imp_datapag;
    }
    set imp_datapag(imp_datapag) {
        this.#imp_datapag = imp_datapag;
    }

    get imp_mensalidade() { // Valor da mensalidade
        return this.#imp_mensalidade;
    }
    set imp_mensalidade(imp_mensalidade) {
        this.#imp_mensalidade = imp_mensalidade;
    }

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
    get imp_tel2(){
        return this.#imp_tel2
    }
    set imp_tel2(imp_tel2){
        this.#imp_tel2 = imp_tel2
    }
    get imp_tel3(){
        return this.#imp_tel3
    }
    set imp_tel3(imp_tel3){
        this.#imp_tel3 = imp_tel3
    }

    constructor(usuId, usuNome, usuSenha, dia, entrada, cafe1, cafe2, almoco1, almoco2, cafe3, cafe4, saida, extra, dia2, idhora, obs, cidade, tipo, estado, cliente, data, imp_contato, imp_tel, imp_tel1, imp_sis, imp_dtvenc, imp_datapag, imp_mensalidade,imp_tel2,imp_tel3,imp_carro,imp_taxa,imp_dia1,imp_vendedorcod) {
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
    
        // Campos de implantação
        this.#imp_contato = imp_contato;
        this.#imp_tel = imp_tel;
        this.#imp_tel1 = imp_tel1;
        this.#imp_sis = imp_sis;
        this.#imp_dtvenc = imp_dtvenc;
        this.#imp_datapag = imp_datapag;
        this.#imp_mensalidade = imp_mensalidade;
        this.#imp_tel2 = imp_tel2;
        this.#imp_tel3 = imp_tel3;
        this.#imp_carro = imp_carro;
        this.#imp_dia1 = imp_dia1;
        this.#imp_vendedorcod = imp_vendedorcod; 
        this.#imp_taxa = imp_taxa;
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
    async adcImplantacao(usuid, tipo, cliente, data, estado, cidade, obs, imp_contato, imp_tel, imp_tel1, imp_sis, imp_dtvenc,imp_mensalidade,imp_tel2,imp_tel3,imp_carro,imp_vendedorcod,imp_dia1,imp_taxa) {
        let sql = `
            INSERT INTO implantacoes (
                usuid, imp_nome, imp_cidade, imp_estado, imp_dia, imp_tipo, imp_obs,
                imp_contato, imp_tel, imp_tel1, imp_sis, imp_dtvenc, imp_mensalidade,imp_tel2,imp_tel3,imp_carro,imp_vendedorcod,imp_dia1,imp_taxa
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?, ?, ?, ?)
        `;
    
        let rows = await conexao.ExecutaComando(sql, [
            usuid, cliente, cidade, estado, data, tipo, obs,
            imp_contato, imp_tel, imp_tel1, imp_sis, imp_dtvenc, imp_mensalidade, imp_tel2,imp_tel3,imp_carro,imp_vendedorcod,imp_dia1,imp_taxa
        ]);
    
        return rows;
    }
    
    
    //funcionando
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
       // console.log("Resultado da query:", rows);
    
        if (rows && rows.length > 0) {
           // console.log("Usuário encontrado:", rows[0]);
            return rows[0];
        } else {
            console.log("Nenhum usuário encontrado");
            return null;
        }
    }
    
    
    // BUSCA AS HORAS COM DATAS DE INICIO E FIM ORDENADO
    async buscahoras(usu_id, dia, dia2) {
        let sql = "SELECT * FROM Horas WHERE usuid = ? AND dia BETWEEN ? AND ? ORDER BY dia";
    
        let rows = await conexao.ExecutaComando(sql, [usu_id, dia, dia2]);
    
        return rows;
    }
    // busca implantacoes
   /* async buscaimplantacoes(usu_id,dia,dia2){
        let sql = "SELECT imp_nome,imp_cidade,imp_estado,imp_dia,imp_dia1,imp_tipo,imp_obs FROM implantacoes WHERE usuid = ? AND imp_dia BETWEEN ? AND ? ORDER BY imp_dia";
    
        let rows = await conexao.ExecutaComando(sql, [usu_id, dia, dia2]);
        return rows;
    }*/

        async buscaimplantacoes(usu_id, dia, dia2) {
            let sql;
            let params;
        
            
            const vendorCodes = [4, 7, 8];
            if (usu_id == 4 || usu_id == 7 || usu_id == 8) {
                
                sql = "SELECT imp_nome, imp_cidade, imp_estado, imp_dia, imp_dia1, imp_tipo, imp_obs FROM implantacoes WHERE imp_vendedorcod = ? AND imp_dia BETWEEN ? AND ? ORDER BY imp_dia";
                params = [usu_id, dia, dia2];
            } else {
                
                sql = "SELECT imp_nome, imp_cidade, imp_estado, imp_dia, imp_dia1, imp_tipo, imp_obs FROM implantacoes WHERE usuid = ? AND imp_dia BETWEEN ? AND ? ORDER BY imp_dia";
                params = [usu_id, dia, dia2];
            }
        
            let rows = await conexao.ExecutaComando(sql, params);
            return rows;
        }


    async buscacalendario(dia, dia2) {
        let sql = `
            SELECT 
                i.imp_nome,
                i.imp_cidade,
                i.imp_estado,
                i.imp_dia,
                i.imp_dia1,
                i.imp_tipo,
                i.imp_obs,
                u.usunome
            FROM 
                implantacoes i
            INNER JOIN 
                Usuario u ON i.usuid = u.usuid
            WHERE 
                i.imp_dia BETWEEN ? AND ? 
            ORDER BY 
                i.imp_dia
        `;
    
        let rows = await conexao.ExecutaComando(sql, [dia, dia2]);
        return rows;
    }
    
    async relViagem(dia,dia2){

        let sql =`
                    SELECT i.idimplantacao,i.imp_nome,i.imp_cidade,i.imp_estado,i.imp_dia,i.imp_dia1,i.imp_tipo,i.imp_contato,i.imp_tel,i.imp_tel1,i.imp_sis,u.usunome,u.usu_tel,i.imp_mensalidade,i.imp_dtvenc,i.imp_carro FROM implantacoes i
                    INNER JOIN Usuario u ON i.usuid = u.usuid
                    where i.imp_dia between ? and ? ORDER BY i.imp_dia ASC`
        let rows = await conexao.ExecutaComando(sql,[dia,dia2]);
        return rows;    
                        }

        // Função para buscar telefone do usuário pelo ID PARA ENVIO NO WHATSAPP
       async buscarTelefonePorId(usuid) {
            const sql = 'SELECT usunome,usu_tel FROM Usuario WHERE usuid = ?';
            
          
                const resultados = await conexao.ExecutaComando(sql, [usuid]);
                
                if (resultados.length === 0) {
                 throw new Error('Usuário não encontrado');
                }
                
                return resultados[0];
            }
          

            async atualizarImplantacao(id, dados) {
                const sql = `UPDATE implantacoes SET 
                    usuid = ?, 
                    imp_nome = ?, 
                    imp_cidade = ?, 
                    imp_estado = ?, 
                    imp_dia = ?, 
                    imp_tipo = ?, 
                    imp_obs = ?, 
                    imp_contato = ?, 
                    imp_tel = ?, 
                    imp_tel1 = ?, 
                    imp_sis = ?, 
                    imp_dtvenc = ?, 
                    imp_mensalidade = ?, 
                    imp_tel2 = ?, 
                    imp_tel3 = ?,
                    imp_carro = ?,
                    imp_taxa = ?,
                    imp_vendedorcod = ?,
                    imp_dia1 = ?
                    WHERE idimplantacao = ?`;
            
                const valores = [
                    dados.usu,         // usuid
                    dados.cliente,     // imp_nome
                    dados.cidade,      // imp_cidade
                    dados.estado,      // imp_estado
                    dados.data,        // imp_dia
                    dados.tipo,        // imp_tipo
                    dados.obs,         // imp_obs
                    dados.imp_contato, // imp_contato
                    dados.imp_tel,     // imp_tel
                    dados.imp_tel1,    // imp_tel1
                    dados.imp_sis,     // imp_sis
                    dados.imp_dtvenc,  // imp_dtvenc
                    dados.imp_mensalidade, // imp_mensalidade
                    dados.imp_tel2,    // imp_tel2
                    dados.imp_tel3,    // imp_tel3     
                    dados.carro,
                    dados.taxa,
                    dados.vendedor,
                    dados.dia1,      // carro
                    id                 // idimplantacao
                ];
            
                return await conexao.ExecutaComando(sql, valores);
            }
            
            
            async deletarImplantacao(id) {
                const sql = `DELETE FROM implantacoes WHERE idimplantacao = ?`;
                return await conexao.ExecutaComando(sql, [id]);
            }

            async buscaidImp(idimplantacao) {
    
                let sql = "SELECT * FROM implantacoes WHERE idimplantacao = ? "
        
                let rows = await conexao.ExecutaComando(sql,[idimplantacao])
        
                return rows;
                
            }
  
      
                    
}


module.exports = UsuarioModel;