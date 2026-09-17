async function atualizarDados() {
//fetch faz a requisição ao servidor
//o await suspende a função até que a requisição seja concluída, ele usa uma Promise para isso, em que ela retorna o resultado da requisição, que é armazenado na variável resposta
    const resposta = await fetch("/dados");
    // extrai os dados em formato json da resposta da requisição e armazena na variável dados em formato de objeto
    const dados = await resposta.json();

    document.getElementById("tensao").textContent = dados.tensao;
    document.getElementById("luxMin").textContent = dados.luxMin;
    document.getElementById("luxMax").textContent = dados.luxMax;

    //atualiza o status de conexão do Arduino
    if (dados.conectado) {
        document.getElementById("status").textContent =
            "Arduino conectado.";
    } else {
        document.getElementById("status").textContent =
            "Arduino não conectado.";
    }
}

atualizarDados();

setInterval(atualizarDados, 1000);  