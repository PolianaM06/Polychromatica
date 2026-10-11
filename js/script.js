"use strict";

// Elementos da janela de ampliação
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeButton = document.querySelector("[data-lightbox-close]");
const previousButton = document.querySelector("[data-lightbox-previous]");
const nextButton = document.querySelector("[data-lightbox-next]");
const lightboxCounter = document.querySelector(".lightbox-counter");

// Botões da galeria
const artworkButtons = document.querySelectorAll("[data-lightbox]");

// Índice da obra atualmente exibida
let currentIndex = 0;

// Exibe uma obra pelo índice
function showArtwork(index) {
    if (artworkButtons.length === 0) {
        return;
    }

    // Permite navegar do fim para o início e vice-versa
    currentIndex =
        (index + artworkButtons.length) % artworkButtons.length;

    const button = artworkButtons[currentIndex];
    const image = button.querySelector("img");
    const figure = button.closest(".artwork");
    const caption = figure?.querySelector("figcaption");

    if (!image || !caption) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption.textContent;

    // Atualiza o contador, se ele existir
    if (lightboxCounter) {
        lightboxCounter.textContent =
            `${currentIndex + 1} de ${artworkButtons.length}`;
    }
}

// Abre a obra selecionada
function openLightbox(button) {
    const index = Array.from(artworkButtons).indexOf(button);

    if (index === -1) {
        return;
    }

    showArtwork(index);
    lightbox.showModal();
}

// Adiciona o evento de abertura a cada obra
artworkButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openLightbox(button);
    });
});

// Exibe a obra anterior
if (previousButton) {
    previousButton.addEventListener("click", () => {
        showArtwork(currentIndex - 1);
    });
}

// Exibe a próxima obra
if (nextButton) {
    nextButton.addEventListener("click", () => {
        showArtwork(currentIndex + 1);
    });
}

// Fecha a janela pelo botão
if (closeButton) {
    closeButton.addEventListener("click", () => {
        lightbox.close();
    });
}

// Fecha ao clicar fora do conteúdo da janela
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});

// Navegação pelas setas do teclado
lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showArtwork(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        showArtwork(currentIndex + 1);
    }
});

// Limpa os dados da imagem ao fechar
lightbox.addEventListener("close", () => {
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (lightboxCounter) {
        lightboxCounter.textContent = "";
    }
});

// Atualiza o ano do rodapé
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}