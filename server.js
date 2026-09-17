
// aqui vai importar a biblioteca
// Node emq ue cria um servidor web, ele que recebe as requcições do web (framework)
const express = require("express"); 
const { SerialPort } = require("serialport");
//conversa com o usb

//configuração da porta e rotas

const app = express();
const porta = new SerialPort({
    path: "COM3",
    baudRate: 9600
});

//estado global, pega os ultimos valores lidos do arduino, é guardado apenas o ultimo valor
let dados = {
    tensao: 0,
    luxMin: 0,
    luxMax: 0,
    conectado: false
};

let linha = "";
//chunks

//evento da porta

porta.on("open", () => {
    dados.conectado = true;
    console.log("Arduino conectado");
});

//chegando qualquer byte do arduino, ele vai ser chamado, e vai ser chamado varias vezes, cada vez que chega um byte
// split("\n") → quebra o texto acumulado em um array de linhas completas (tudo que terminou com \n).

// pop() → remove o último item do array (que é a linha incompleta, ainda sem \n) e o devolve.
porta.on("data", (data) => {
    linha += data.toString();

    let linhas = linha.split("\n");
    linha = linhas.pop();

    linhas.forEach((texto) => {
        texto = texto.trim();

        if (texto.startsWith("Tensao no LDR:")) {
            dados.tensao = parseFloat(
                texto.replace("Tensao no LDR:", "").replace("V", "")
            );
        }

        if (texto.startsWith("Lux minimo estimado:")) {
            dados.luxMin = parseFloat(
                texto.replace("Lux minimo estimado:", "")
            );
        }

        if (texto.startsWith("Lux maximo estimado:")) {
            dados.luxMax = parseFloat(
                texto.replace("Lux maximo estimado:", "")
            );
        }
    });
});

// evento porte desconectada do arduino
porta.on("close", () => {
    dados.conectado = false;
    console.log("Arduino desconectado");
});

// caso n tenha nada conectado
porta.on("error", (erro) => {
    dados.conectado = false;
    console.log("Arduino não conectado.");
});
// express, ele vai direcionar onde esta essa pasta para saber direcionar ao html
app.use(express.static(__dirname));

//rota requisição
app.get("/dados", (req, res) => {
    res.json(dados);
});

// inicia servidor
app.listen(3000, () => {
    console.log("Site funcionando em http://localhost:3000");
});