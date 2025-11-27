emailjs.init('bRWQr6_B76Xz_jT0-');

document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    to_email: 'poncianodeveloper@gmail.com'
  };

  const responseElement = document.getElementById('formResponse');

  try {
    await emailjs.send('service_casa', 'template_casa', formData);
    responseElement.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    responseElement.style.color = 'var(--cor-laranja)';
    document.getElementById('contactForm').reset();
  } catch (error) {
    responseElement.textContent = 'Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.';
    responseElement.style.color = '#d32f2f';
  }
});
