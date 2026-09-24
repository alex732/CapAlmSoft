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
});
