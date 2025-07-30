// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const form = document.getElementById('cotizacionForm');
const modal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');
const serviceCards = document.querySelectorAll('.service-card');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Header background change on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background when scrolling
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature, .stat, .testimonial').forEach(el => {
    observer.observe(el);
});

// Service cards interaction
serviceCards.forEach(card => {
    const button = card.querySelector('.service-btn');
    
    button.addEventListener('click', () => {
        const serviceName = card.getAttribute('data-service');
        showServiceInfo(serviceName);
    });
});

// Show service information (you can expand this)
function showServiceInfo(serviceName) {
    const serviceInfo = {
        nomina: {
            title: 'Gestión de Nómina',
            icon: '💰',
            description: 'Ofrecemos un servicio completo de administración de nóminas que garantiza precisión, cumplimiento legal y eficiencia en todos los procesos relacionados con el pago de salarios y prestaciones.',
            features: [
                'Cálculo preciso de salarios y prestaciones',
                'Manejo de deducciones legales',
                'Generación de reportes fiscales',
                'Liquidación de prestaciones sociales',
                'Cumplimiento de normativas laborales',
                'Soporte en auditorías'
            ]
        },
        administracion: {
            title: 'Administración del Personal',
            icon: '👥',
            description: 'Gestión integral de todos los aspectos administrativos del personal, desde el control de expedientes hasta la evaluación del desempeño.',
            features: [
                'Control de expedientes digitales',
                'Manejo de documentación legal',
                'Administración de contratos',
                'Control de asistencia y vacaciones',
                'Evaluaciones de desempeño',
                'Reportes ejecutivos'
            ]
        },
        reclutamiento: {
            title: 'Reclutamiento y Selección',
            icon: '🎯',
            description: 'Encontramos el talento perfecto para tu organización mediante procesos de selección estructurados y evaluaciones especializadas.',
            features: [
                'Análisis de perfiles y competencias',
                'Búsqueda activa de candidatos',
                'Procesos de selección estructurados',
                'Evaluaciones psicotécnicas',
                'Referencias laborales',
                'Onboarding personalizado'
            ]
        },
        contratacion: {
            title: 'Contratación',
            icon: '📋',
            description: 'Formalizamos vínculos laborales de manera eficiente, garantizando el cumplimiento de todos los requisitos legales y administrativos.',
            features: [
                'Elaboración de contratos laborales',
                'Afiliaciones a seguridad social',
                'Trámites ante entidades gubernamentales',
                'Inducción corporativa',
                'Capacitación inicial',
                'Seguimiento de periodo de prueba'
            ]
        },
        desvinculacion: {
            title: 'Desvinculación',
            icon: '🤝',
            description: 'Manejo profesional de procesos de desvinculación, garantizando el cumplimiento legal y la protección de ambas partes.',
            features: [
                'Análisis legal de causales',
                'Cálculo de liquidaciones',
                'Trámites de desafiliación',
                'Entrega de certificaciones',
                'Asesoría en procesos disciplinarios',
                'Mediación laboral'
            ]
        },
        consultoria: {
            title: 'Consultoría en Capital Humano',
            icon: '💡',
            description: 'Asesoría estratégica para optimizar tu gestión humana y desarrollar el potencial de tu organización.',
            features: [
                'Diagnóstico organizacional',
                'Diseño de estructuras organizacionales',
                'Desarrollo de políticas de RRHH',
                'Planes de capacitación',
                'Evaluación de clima laboral',
                'Estrategias de retención de talento'
            ]
        }
    };

    const info = serviceInfo[serviceName];
    if (info) {
        showServiceModal(info);
    }
}

// Show service modal with improved design
function showServiceModal(serviceInfo) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-header">
            <span class="modal-service-icon">${serviceInfo.icon}</span>
            <h3>${serviceInfo.title}</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <p class="modal-description">${serviceInfo.description}</p>
            <ul class="modal-features">
                ${serviceInfo.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-footer">
            <button class="modal-cta-button" onclick="scrollToSection('contacto'); modal.style.display='none';">
                Solicitar Cotización
            </button>
        </div>
    `;
    
    // Update modal content
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = modalHTML;
    
    // Show modal
    modal.style.display = 'block';
    
    // Add close event listener to the new close button
    const newCloseButton = modalContent.querySelector('.close');
    newCloseButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Form handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state first
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Get form data properly
    const formData = new FormData(form);
    
    // Validate required fields
    const empresa = formData.get('empresa');
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    
    if (!empresa || !nombre || !email || !telefono) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        alert('Por favor, ingresa un email válido.');
        return;
    }
    
    // Send via Formspree directly
    fetch('https://formspree.io/f/xrblkwvl', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success
            showSuccessMessage();
            form.reset();
        } else {
            throw new Error('Formspree error');
        }
    })
    .catch(error => {
        console.log('Formspree failed, using mailto fallback');
        // Fallback to mailto
        const data = {
            empresa: empresa,
            nombre: nombre,
            email: email,
            telefono: telefono,
            cargo: formData.get('cargo') || 'No especificado',
            empleados: formData.get('empleados') || 'No especificado',
            servicios: formData.getAll('servicios'),
            mensaje: formData.get('mensaje') || 'No hay mensaje adicional'
        };
        
        const mailtoLink = createMailtoLink(data);
        window.open(mailtoLink, '_blank');
        
        // Show success message after a delay
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
        }, 1000);
    })
    .finally(() => {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Show success message
function showSuccessMessage() {
    modal.style.display = 'block';
}

// Alternative: Simple PHP backend (if you have server)
function sendViaPHP(data) {
    fetch('send_email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            modal.style.display = 'block';
            form.reset();
        } else {
            alert('Error al enviar el formulario. Por favor, intenta de nuevo.');
        }
    })
    .catch(() => {
        // Fallback to mailto
        const mailtoLink = createMailtoLink(data);
        window.open(mailtoLink, '_blank');
        setTimeout(() => {
            modal.style.display = 'block';
            form.reset();
        }, 1000);
    });
}

// Create mailto link
function createMailtoLink(data) {
    const servicios = Array.isArray(data.servicios) && data.servicios.length > 0 
        ? data.servicios.join(', ') 
        : 'No especificado';
        
    const subject = `Nueva Solicitud de Cotización - ${data.empresa}`;
    const body = `
NUEVA SOLICITUD DE COTIZACIÓN

INFORMACIÓN DE LA EMPRESA:
• Empresa: ${data.empresa}
• Número de empleados: ${data.empleados}

INFORMACIÓN DE CONTACTO:
• Nombre: ${data.nombre}
• Cargo: ${data.cargo}
• Email: ${data.email}
• Teléfono: ${data.telefono}

SERVICIOS DE INTERÉS:
${servicios}

MENSAJE ADICIONAL:
${data.mensaje}

---
Enviado desde el formulario web de SIRH
Fecha: ${new Date().toLocaleString('es-ES')}
    `.trim();
    
    return `mailto:sirh.honduras@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Modal close handlers
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Restore original format
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Smooth reveal animations for different sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            if (element.classList.contains('hero-content')) {
                element.classList.add('slide-in-left');
            } else if (element.classList.contains('hero-image')) {
                element.classList.add('slide-in-right');
            } else {
                element.classList.add('fade-in');
            }
        }
    });
}, { threshold: 0.2 });

// Observe elements for reveal animations
document.querySelectorAll('.hero-content, .hero-image, .about-text, .contact-form, .contact-info').forEach(el => {
    revealObserver.observe(el);
});

// Add loading state to form submission
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form submission with loading state

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Form field focus enhancements
const formFields = document.querySelectorAll('input, select, textarea');

formFields.forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.classList.remove('focused');
        
        // Validate field on blur
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
});

// Auto-resize textarea
const textarea = document.getElementById('mensaje');
if (textarea) {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
}

// Print page functionality (optional enhancement)
function printPage() {
    window.print();
}

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = `© ${currentYear} Servicios Integrales en Recursos Humanos. Todos los derechos reservados.`;
}

console.log('Servicios Integrales en Recursos Humanos website loaded successfully!');