document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Scroll suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste por la altura del navbar (80px)
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Manejo del Formulario de Cotización con Google Forms
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // URL exacta de tu formulario de Google
    const googleActionURL = 'https://docs.google.com/forms/d/e/1FAIpQLSc405hmkbp-U6CABhT-3w9JBDOCvCZ7PHwXs5iw16kdzdlLqQ/formResponse';

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página recargue
            
            const formData = new FormData(quoteForm);
            
            fetch(googleActionURL, {
                method: 'POST',
                mode: 'no-cors', // Fundamental para enviar los datos de forma silenciosa
                body: formData
            }).then(() => {
                // Ocultar el formulario
                quoteForm.style.display = 'none';
                // Mostrar el mensaje de éxito diseñado en CSS
                formSuccess.classList.remove('hidden');
                // Limpiar los campos
                quoteForm.reset(); 
            }).catch(error => {
                alert("Hubo un error de conexión. Por favor, intenta de nuevo.");
                console.error('Error:', error);
            });
        });
    }

    // 3. Sistema de Lightbox (Imágenes en pantalla completa)
    const imageModal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('expandedImg');
    const closeImgBtn = document.querySelector('.modal-img-close');
    
    // Seleccionar todas las imágenes de la galería y la principal (hero)
    const imagesToEnlarge = document.querySelectorAll('.gallery-item img, .hero-image img');

    imagesToEnlarge.forEach(img => {
        img.classList.add('clickable-img'); // Agrega el cursor de la manito
        img.addEventListener('click', function() {
            imageModal.style.display = 'flex'; // Muestra el contenedor
            expandedImg.src = this.src;        // Pasa la ruta de la imagen clickeada al modal
        });
    });

    // Cerrar al hacer clic en la "X"
    if (closeImgBtn) {
        closeImgBtn.addEventListener('click', function() {
            imageModal.style.display = 'none';
        });
    }

    // Cerrar también si el usuario hace clic fuera de la imagen (en el fondo oscuro)
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target !== expandedImg) {
                imageModal.style.display = 'none';
            }
        });
    }
});
