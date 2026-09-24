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

    // 2. Manejo del Formulario de Cotización
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página recargue
            
            // Aquí puedes conectar en el futuro un servicio como Formspree, EmailJS o tu propia API
            // Por ahora, simulamos el envío exitoso:
            
            // Ocultar formulario
            quoteForm.style.display = 'none';
            // Mostrar mensaje de éxito
            formSuccess.classList.remove('hidden');
        });
    }
});
