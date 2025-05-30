document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agendamento-form');
    const dataInput = document.getElementById('data');
    const horarioSelect = document.getElementById('horario');

    // Configurar data mínima como hoje
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0];
    dataInput.min = dataMinima;

    // Configurar data máxima como 30 dias a partir de hoje
    const dataMaxima = new Date();
    dataMaxima.setDate(hoje.getDate() + 30);
    dataInput.max = dataMaxima.toISOString().split('T')[0];

    // Desabilitar horários passados para o dia atual
    function atualizarHorarios() {
        const dataSelecionada = new Date(dataInput.value);
        const hoje = new Date();
        
        if (dataSelecionada.toDateString() === hoje.toDateString()) {
            const horaAtual = hoje.getHours();
            Array.from(horarioSelect.options).forEach(option => {
                if (option.value) {
                    const horaAgendamento = parseInt(option.value.split(':')[0]);
                    option.disabled = horaAgendamento <= horaAtual;
                }
            });
        } else {
            Array.from(horarioSelect.options).forEach(option => {
                option.disabled = false;
            });
        }
    }

    dataInput.addEventListener('change', atualizarHorarios);

    // Máscara para o campo de telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });

    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        // Simular envio do formulário
        console.log('Dados do agendamento:', dados);

        // Mostrar mensagem de sucesso
        alert('Agendamento realizado com sucesso! Entraremos em contato para confirmar.');
        
        // Limpar formulário
        form.reset();
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            input.classList.add('invalid');
        });

        input.addEventListener('input', function() {
            if (input.validity.valid) {
                input.classList.remove('invalid');
            }
        });
    });
}); 