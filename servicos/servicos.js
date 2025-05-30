document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada dos cards
    const cards = document.querySelectorAll('.servico-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Efeito hover nos ícones
    const icons = document.querySelectorAll('.servico-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animação suave ao clicar no botão de agendamento
    const agendarBtns = document.querySelectorAll('.agendar-btn');
    agendarBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Adiciona classe de animação
            this.classList.add('clicked');
            
            // Redireciona após a animação
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}); 