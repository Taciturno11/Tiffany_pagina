// Navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Efecto scroll en navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Toggle facetas
const toggleBtn = document.getElementById('toggleFacets');
const facetsStack = document.getElementById('facetsStack');
const facetsExpanded = document.getElementById('facetsExpanded');
let isExpanded = false;

toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
        facetsStack.classList.add('hidden');
        facetsExpanded.classList.add('active');
        toggleBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i><span>Contraer</span>';
    } else {
        facetsStack.classList.remove('hidden');
        facetsExpanded.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i><span>Expandir</span>';
    }
});

// Animaciones de entrada (opcional - simple)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos
document.querySelectorAll('.service-item, .testimonial, .facet-full').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission (puedes agregar tu lógica aquí)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! (Conecta esto con tu backend)');
});


