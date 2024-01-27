
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarUsuario);

//CALCULA HORAS EXTRAS
   

function calcularHorasExtras(entrada, saida, jornadaPadrao) {
    // Certifique-se de que entrada e saida são strings
    entrada = String(entrada);
    saida = String(saida);

    // Verifique se os formatos são HH:mm
    const entradaMatch = entrada.match(/^(\d{1,2}):(\d{2})$/);
    const saidaMatch = saida.match(/^(\d{1,2}):(\d{2})$/);

    if (!entradaMatch || !saidaMatch) {
        throw new Error('Formato de entrada ou saída inválido. Use HH:mm.');
    }

    const entradaHoras = parseInt(entradaMatch[1], 10);
    const entradaMinutos = parseInt(entradaMatch[2], 10);

    const saidaHoras = parseInt(saidaMatch[1], 10);
    const saidaMinutos = parseInt(saidaMatch[2], 10);

    const minutosEntrada = entradaHoras * 60 + entradaMinutos;
    const minutosSaida = saidaHoras * 60 + saidaMinutos;

    // Calculando as horas extras
    const minutosTrabalhados = Math.max(minutosSaida - minutosEntrada, 0);
    const minutosExtras = Math.max(minutosTrabalhados - jornadaPadrao, 0);

    // Convertendo minutos para o formato 'HH:mm'
    const horasExtras = Math.floor(minutosExtras / 60);
    const minutosExtrasFormatados = minutosExtras % 60;

    // Formatando para o formato 'HH:mm'
    const horasExtrasFormatadas = `${String(horasExtras).padStart(2, '0')}:${String(minutosExtrasFormatados).padStart(2, '0')}`;

    return horasExtrasFormatadas;
}

// Exemplo de uso
const entrada = '06:42';
const saida = '20:03';
const jornadaPadrao = 8 * 60; // 8 horas em minutos

const resultado = calcularHorasExtras(entrada, saida, jornadaPadrao);
console.log(resultado);
    

    function gravarUsuario() {

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

const horasExtras = calcularHorasExtras(entrada.value, saida.value, jornadaPadrao);
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
            }
            let currentUrl = window.location.href;

        // Atualizando a URL para incluir o caminho da rota desejada
        //let apiUrl = currentUrl + '/cadastrar';

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
                    entrada.value = null;
                    cafe1.value = null;
                    cafe2.value = null;
                    almoco1.value = null;
                    almoco2.value = null;
                    cafe3.value = null;
                    cafe4.value = null;
                    saida.value = null;
                    data.value =null;
                                   
                }
                else{
                    alert(resposta2.msg);
                }
            })
        }

})