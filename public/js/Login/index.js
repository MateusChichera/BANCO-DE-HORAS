document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const msgRetorno = document.getElementById("msgRetorno");
    const btnEntrar = document.getElementById("btnEntrar");

    btnEntrar.addEventListener('click', autenticar);

    async function autenticar() {
        const email = emailInput.value;
        const senha = senhaInput.value;

        if (email !== "" && senha !== "") {
            const body = { email, senha };

            try {
                const response = await fetch('/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    throw new Error(`Erro no servidor: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.status) {
                    msgRetorno.innerHTML = `<div class="alert alert-success">${data.msg}</div>`;
                    window.location.href = '/';
                    
                } else {
                    msgRetorno.innerHTML = `<div class="alert alert-danger">${data.msg}</div>`;
                }
            } catch (error) {
                console.error("Erro na requisição:", error.message);
                msgRetorno.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
            }
        } else {
            alert("Usuário/Senha inválidos!");
        }
    }
});
