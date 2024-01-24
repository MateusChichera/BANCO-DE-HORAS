
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarUsuario);


    //CALCULA HORAS EXTRAS
    function calcularHorasExtras(entrada, saida) {
        const entradaObj = new Date(`2000-01-01T${entrada}:00`);
        const saidaObj = new Date(`2000-01-01T${saida}:00`);
        const jornadaPadrao = 8 * 60; // 8 horas em minutos

        // Convertendo para minutos
        const minutosTrabalhados = (saidaObj - entradaObj) / (60 * 1000);

        // Calculando as horas extras
        const horasExtras = Math.max(minutosTrabalhados - jornadaPadrao, 0);

        // Convertendo minutos de volta para horas e minutos
        const horasExtrasHoras = Math.floor(horasExtras / 60);
        const horasExtrasMinutos = horasExtras % 60;

        return { horas: horasExtrasHoras, minutos: horasExtrasMinutos };
    }
    

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
const horasExtras = calcularHorasExtras(entrada, saida)
           
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
        
    }

)