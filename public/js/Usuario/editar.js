
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarUsuario);

//CALCULA HORAS EXTRAS
   

//CALCULA HORAS EXTRAS
   

function calcularHorasExtras(entrada, saida, almoco1, almoco2, jornadaPadrao) {
    // Certifique-se de que entrada, saida, almoco1 e almoco2 são strings
    entrada = String(entrada);
    saida = String(saida);
    almoco1 = String(almoco1);
    almoco2 = String(almoco2);

    // Verifique se os formatos são HH:mm
    const entradaMatch = entrada.match(/^(\d{1,2}):(\d{2})$/);
    const saidaMatch = saida.match(/^(\d{1,2}):(\d{2})$/);
    const almoco1Match = almoco1.match(/^(\d{1,2}):(\d{2})$/);
    const almoco2Match = almoco2.match(/^(\d{1,2}):(\d{2})$/);

    if (!entradaMatch || !saidaMatch || !almoco1Match || !almoco2Match) {
        throw new Error('Formato de entrada, saída, almoço1 ou almoço2 inválido. Use HH:mm.');
    }

    // Convertendo para minutos
    const entradaMinutos = parseInt(entradaMatch[1], 10) * 60 + parseInt(entradaMatch[2], 10);
    const saidaMinutos = parseInt(saidaMatch[1], 10) * 60 + parseInt(saidaMatch[2], 10);
    const almoco1Minutos = parseInt(almoco1Match[1], 10) * 60 + parseInt(almoco1Match[2], 10);
    const almoco2Minutos = parseInt(almoco2Match[1], 10) * 60 + parseInt(almoco2Match[2], 10);

    // Calculando o tempo total do almoço em minutos
    const tempoAlmocoMinutos = almoco2Minutos - almoco1Minutos;

    // Calculando o tempo trabalhado, descontando o tempo do almoço
    const tempoTrabalhadoMinutos = Math.max(saidaMinutos - entradaMinutos - tempoAlmocoMinutos, 0);

    // Calculando as horas extras, descontando o tempo do almoço
    const minutosExtras = Math.max(tempoTrabalhadoMinutos - jornadaPadrao, 0);

    // Convertendo minutos para o formato 'HH:mm'
    const horasExtras = Math.floor(minutosExtras / 60);
    const minutosExtrasFormatados = minutosExtras % 60;

    // Formatando para o formato 'HH:mm'
    const horasExtrasFormatadas = `${String(horasExtras).padStart(2, '0')}:${String(minutosExtrasFormatados).padStart(2, '0')}`;

    return horasExtrasFormatadas;
}

// Exemplo de uso
const jornadaPadrao = 460; // 7 horas e 40 minutos de jornada DESCONTANDO OS CAFÉS
const entrada = '08:00';
const saida = '17:00';
const almoco1 = '12:00'; // Saída para o almoço
const almoco2 = '13:00'; // Retorno do almoço
const resultado = calcularHorasExtras(entrada, saida, almoco1, almoco2, jornadaPadrao);
console.log(resultado);

    function gravarUsuario() {

        var currentUrl = new URL(window.location.href);

        // Obter o valor do parâmetro 'idhora' da URL
        var idhora = currentUrl.searchParams.get("idhora");
    

        let entrada = document.getElementById("entrada");
        let cafe1 = document.getElementById("cafe1");
        let cafe2 = document.getElementById("cafe2");
        let almoco1 = document.getElementById("almoco1");
        let almoco2 = document.getElementById("almoco2");
        let cafe3 = document.getElementById("cafe3");
        let cafe4 = document.getElementById("cafe4");
        let saida = document.getElementById("saida");
        let data = document.getElementById("dia");
        let usu =  document.getElementById("usuario");


        console.log(usu);
// calculando horas extras antes de enviar ao banco
const jornadaPadrao = 8 * 60;
console.log('Entrada:', entrada.value);
console.log('Saida:', saida.value);

const horasExtras = calcularHorasExtras(entrada.value, saida.value,almoco1.value,almoco2.value,jornadaPadrao);
console.log('Horas Extras:', horasExtras);
           
            var usuario = {
                usu: usu.value,
                entrada: entrada.value,
                cafe1: cafe1.value,
                cafe2: cafe2.value,
                almoco1: almoco1.value,
                almoco2: almoco2.value,
                cafe3: cafe3.value,
                cafe4: cafe4.value,
                saida: saida.value,
                data: data.value,
                horasExtras: horasExtras,
                idhora : idhora,
            }


        // Atualizando a URL para incluir o caminho da rota desejada
       // let apiUrl = currentUrl + '/usuario/editar';

            fetch(currentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2.msg);
                   window.location.href = '/';
                                   
                }
                else{
                    alert(resposta2.msg);
                }
            })
        }

})