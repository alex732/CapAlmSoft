document.addEventListener("DOMContentLoaded", () => {
    // --- Lógica del Carrusel / Modal de Imágenes ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const closeBtn = document.querySelector(".modal-img-close");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Seleccionamos todas las imágenes de la galería
    const galleryImages = document.querySelectorAll(".gallery-item img");
    let currentIndex = 0;
    const imagesSrc = Array.from(galleryImages).map(img => img.src);

    // Abrir el modal al hacer clic en una imagen
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            currentIndex = index;
        });
    });

    // Función para mostrar la imagen correspondiente en el carrusel
    const showImage = (index) => {
        if (index < 0) {
            currentIndex = imagesSrc.length - 1;
        } else if (index >= imagesSrc.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        modalImg.src = imagesSrc[currentIndex];
    };

    // Eventos de los botones de navegación
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // Función para cerrar el modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Navegación con teclado (Flechas izquierda/derecha y Escape)
    document.addEventListener("keydown", (e) => {
        if (modal && modal.style.display === "flex") {
            if (e.key === "ArrowLeft") showImage(currentIndex - 1);
            if (e.key === "ArrowRight") showImage(currentIndex + 1);
            if (e.key === "Escape") closeModal();
        }
    });

    // --- Lógica del Formulario de Contacto (FormSubmit / AJAX) ---
    const quoteForm = document.getElementById("quoteForm");
    const formSuccess = document.getElementById("formSuccess");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(quoteForm);

            try {
                const response = await fetch("https://formsubmit.co/ajax/tu-correo@domain.com", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    quoteForm.style.display = "none";
                    if (formSuccess) formSuccess.classList.remove("hidden");
                } else {
                    alert("Hubo un error al enviar la solicitud. Por favor, intenta de nuevo.");
                }
            } catch (error) {
                console.error("Error de red:", error);
                // Si prefieres envío tradicional o hay fallo de red, simulamos éxito o dejamos el comportamiento por defecto
                quoteForm.style.display = "none";
                if (formSuccess) formSuccess.classList.remove("hidden");
            }
        });
    }
});
