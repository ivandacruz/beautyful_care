// Menu mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu mobile após clicar em um link
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um backend
    
    // Simulação de envio bem-sucedido
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// Animação do navbar ao rolar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scroll para baixo
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll para cima
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .about-content, .gallery-grid, .contact-container').forEach((el) => {
    observer.observe(el);
});

// Carousel
const carousel = document.querySelector('.carousel');
const items = carousel.querySelectorAll('.carousel-item');
const indicators = carousel.querySelectorAll('.indicator');
const prevButton = carousel.querySelector('.prev');
const nextButton = carousel.querySelector('.next');
let currentIndex = 0;
let interval;

function showSlide(index) {
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    items[index].classList.add('active');
    indicators[index].classList.add('active');
    currentIndex = index;
}

function nextSlide() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = items.length - 1;
    }
    showSlide(prevIndex);
}

function startCarousel() {
    interval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    clearInterval(interval);
}

// Event listeners para controles do carousel
prevButton.addEventListener('click', () => {
    stopCarousel();
    prevSlide();
    startCarousel();
});

nextButton.addEventListener('click', () => {
    stopCarousel();
    nextSlide();
    startCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopCarousel();
        showSlide(index);
        startCarousel();
    });
});

// Iniciar o carousel
startCarousel();

// Pausar o carousel quando o mouse estiver sobre ele
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

// Animações para a seção Sobre Nós
const aboutCards = document.querySelectorAll('.about-card');
const statItems = document.querySelectorAll('.stat-item');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    aboutObserver.observe(card);
});

statItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    aboutObserver.observe(item);
});

// Animação dos números nas estatísticas
const animateNumbers = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            const target = parseInt(numberElement.textContent);
            animateNumbers(numberElement, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

statItems.forEach(item => {
    statsObserver.observe(item);
});

// Animações para a galeria
const galleryItems = document.querySelectorAll('.gallery-item');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
});

// Efeito de hover nos links da galeria
document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
    });
});

// Animações para a seção de contato
const contactInfo = document.querySelector('.contact-info');
const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

[contactForm, contactInfo].forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    contactObserver.observe(element);
});

// Efeito de foco nos inputs
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Animação do botão de envio
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('mouseenter', () => {
    submitButton.style.transform = 'translateY(-2px) scale(1.05)';
});

submitButton.addEventListener('mouseleave', () => {
    submitButton.style.transform = 'translateY(0) scale(1)';
});

// Animações para o footer
const footerSections = document.querySelectorAll('.footer-section');
const socialLinks = document.querySelectorAll('.social-links a');

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

footerSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    footerObserver.observe(section);
});

// Efeito de hover nas redes sociais
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Animação para os cards de serviços
const servicoCards = document.querySelectorAll('.servico-card');
const servicoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

servicoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    servicoObserver.observe(card);
});

// Botão Retornar ao Topo
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 