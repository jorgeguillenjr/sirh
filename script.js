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
            description: 'Ofrecemos un servicio completo de administración de nóminas que incluye:\n\n• Cálculo preciso de salarios y prestaciones\n• Manejo de deducciones legales\n• Generación de reportes fiscales\n• Liquidación de prestaciones sociales\n• Cumplimiento de normativas laborales\n• Soporte en auditorías',
        },
        administracion: {
            title: 'Administración del Personal',
            description: 'Gestión integral de todos los aspectos administrativos del personal:\n\n• Control de expedientes digitales\n• Manejo de documentación legal\n• Administración de contratos\n• Control de asistencia y vacaciones\n• Evaluaciones de desempeño\n• Reportes ejecutivos',
        },
        reclutamiento: {
            title: 'Reclutamiento y Selección',
            description: 'Encontramos el talento perfecto para tu organización:\n\n• Análisis de perfiles y competencias\n• Búsqueda activa de candidatos\n• Procesos de selección estructurados\n• Evaluaciones psicotécnicas\n• Referencias laborales\n• Onboarding personalizado',
        },
        contratacion: {
            title: 'Contratación',
            description: 'Formalizamos vínculos laborales de manera eficiente:\n\n• Elaboración de contratos laborales\n• Afiliaciones a seguridad social\n• Trámites ante entidades gubernamentales\n• Inducción corporativa\n• Capacitación inicial\n• Seguimiento de periodo de prueba',
        },
        desvinculacion: {
            title: 'Desvinculación',
            description: 'Manejo profesional de procesos de desvinculación:\n\n• Análisis legal de causales\n• Cálculo de liquidaciones\n• Trámites de desafiliación\n• Entrega de certificaciones\n• Asesoría en procesos disciplinarios\n• Mediación laboral',
        },
        consultoria: {
            title: 'Consultoría en Capital Humano',
            description: 'Asesoría estratégica para optimizar tu gestión humana:\n\n• Diagnóstico organizacional\n• Diseño de estructuras organizacionales\n• Desarrollo de políticas de RRHH\n• Planes de capacitación\n• Evaluación de clima laboral\n• Estrategias de retención de talento',
        }
    };

    const info = serviceInfo[serviceName];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\n¿Te interesa este servicio? Contáctanos para una cotización personalizada.`);
    }
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
    fetch('https://formspree.io/f/xanbevro', {
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
    
    return `mailto:avusahn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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