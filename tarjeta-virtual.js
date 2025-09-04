// Tarjeta Virtual NFC - Funcionalidades Interactivas
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de aparición escalonada para los elementos
    const animateElements = () => {
        const elements = document.querySelectorAll('.profile-section, .contact-info, .specialties, .action-buttons, .social-links');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    // Inicializar animaciones
    animateElements();

    // Efecto de hover para la tarjeta
    const virtualCard = document.querySelector('.virtual-card');
    
    virtualCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    virtualCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Efecto de click para los botones
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Efecto de hover para los tags de especialidades
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de hover para los iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.15) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Efecto de hover para los elementos de contacto
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(37, 99, 235, 0.05)';
            this.style.borderRadius = '8px';
            this.style.paddingLeft = '8px';
            this.style.paddingRight = '8px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.paddingLeft = '0';
            this.style.paddingRight = '0';
        });
    });

    // Función para copiar información de contacto al portapapeles
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Mostrar notificación de éxito
            showNotification('Información copiada al portapapeles');
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    };

    // Agregar funcionalidad de copiar al hacer doble click en información de contacto
    const contactValues = document.querySelectorAll('.contact-item .value');
    
    contactValues.forEach(value => {
        value.addEventListener('dblclick', function() {
            copyToClipboard(this.textContent);
        });
        
        // Agregar tooltip
        value.title = 'Doble click para copiar';
        value.style.cursor = 'pointer';
    });

    // Función para mostrar notificaciones
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    // Agregar efecto de vibración al hacer click en botones
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.animation = 'vibrate 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Agregar efecto de brillo al hacer hover en la foto
    const tiffanyPhoto = document.querySelector('.tiffany-photo');
    
    tiffanyPhoto.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) contrast(1.1)';
    });
    
    tiffanyPhoto.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) contrast(1)';
    });

    // Función para compartir la tarjeta
    const shareCard = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Tiffany Foster - Elephant Coach & Training',
                    text: 'Conoce a Tiffany Foster, Fundadora y Líder de Elephant Coach & Training',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error al compartir:', err);
            }
        } else {
            // Fallback para navegadores que no soportan Web Share API
            copyToClipboard(window.location.href);
            showNotification('URL copiada al portapapeles');
        }
    };

    // Agregar botón de compartir si es compatible
    if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Compartir';
        shareButton.className = 'btn btn-accent';
        shareButton.style.marginTop = '10px';
        shareButton.addEventListener('click', shareCard);
        
        const actionButtons = document.querySelector('.action-buttons');
        actionButtons.appendChild(shareButton);
    }

    // Agregar efecto de partículas en el fondo (opcional)
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float 6s infinite linear;
                animation-delay: ${i * 0.3}s;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    };

    // Crear partículas de fondo
    createParticles();

    // Agregar estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes vibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);

    console.log('Tarjeta Virtual NFC cargada exitosamente! 🎉');
});
