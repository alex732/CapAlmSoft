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

    // 2. Manejo del Formulario de Cotización con FormSubmit (Envío a Correo)
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');

    // Conexión AJAX de FormSubmit a tu correo
    const emailActionURL = 'https://formsubmit.co/ajax/capalmsoft@hotmail.com';

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const btn = quoteForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "Enviando mensaje...";
            btn.disabled = true;

            const formData = new FormData(quoteForm);
            const dataObject = Object.fromEntries(formData.entries());
            
            fetch(emailActionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataObject)
            })
            .then(response => response.json())
            .then(data => {
                // Si el envío fue exitoso
                if(data.success === "true" || data.success === true) {
                    quoteForm.style.display = 'none';
                    formSuccess.classList.remove('hidden');
                    quoteForm.reset(); 
                } else {
                    // Mensaje de alerta en caso de que requiera activación
                    alert("Revisa tu correo capalmsoft@hotmail.com. FormSubmit requiere que actives el servicio la primera vez.");
                    console.log(data);
                }
            })
            .catch(error => {
                alert("Hubo un error de conexión al enviar el correo. Por favor, intenta de nuevo.");
                console.error('Error:', error);
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
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
