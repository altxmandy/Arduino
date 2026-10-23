const topicos = document.querySelectorAll(".topico");
const conteudos = document.querySelectorAll(".conteudo-topico");

function mostrarTopico(topicoSelecionado) {
    topicos.forEach(function (topico) {
        const selecionado = topico === topicoSelecionado;

        topico.classList.toggle("ativo", selecionado);
        topico.setAttribute("aria-selected", selecionado);
        topico.tabIndex = selecionado ? 0 : -1;
    });

    conteudos.forEach(function (conteudo) {
        conteudo.hidden =
            conteudo.id !== topicoSelecionado.getAttribute("aria-controls");
    });
}

topicos.forEach(function (topico, indice) {
    topico.addEventListener("click", function () {
        mostrarTopico(topico);
    });

    topico.addEventListener("keydown", function (evento) {
        let proximo;

        if (evento.key === "ArrowRight") {
            proximo = (indice + 1) % topicos.length;
        } else if (evento.key === "ArrowLeft") {
            proximo = (indice - 1 + topicos.length) % topicos.length;
        } else if (evento.key === "Home") {
            proximo = 0;
        } else if (evento.key === "End") {
            proximo = topicos.length - 1;
        } else {
            return;
        }

        evento.preventDefault();
        mostrarTopico(topicos[proximo]);
        topicos[proximo].focus();
    });
});

if (topicos.length > 0) {
    mostrarTopico(topicos[0]);
}