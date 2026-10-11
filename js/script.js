
"use strict";

// Elementos da janela de ampliação
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeButton = document.querySelector("[data-lightbox-close]");

// Botões da galeria
const artworkButtons = document.querySelectorAll("[data-lightbox]");

// Abre a obra selecionada
function openLightbox(button) {
    const image = button.querySelector("img");
    const figure = button.closest(".artwork");
    const caption = figure.querySelector("figcaption");

    if (!image || !caption) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption.textContent;

    lightbox.showModal();
}

// Adiciona o evento de abertura a cada obra
artworkButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openLightbox(button);
    });
});

// Fecha a janela pelo botão
closeButton.addEventListener("click", () => {
    lightbox.close();
});

// Fecha ao clicar fora do conteúdo da janela
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});

// Limpa os dados da imagem ao fechar
lightbox.addEventListener("close", () => {
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
});

// Atualiza o ano do rodapé
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
