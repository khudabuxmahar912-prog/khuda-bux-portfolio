document.addEventListener('DOMContentLoaded', () => {
  console.log("Portfolio loaded successfully!");

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

// Contact Form Handler
async function handleFormSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = 'Sending...';
  submitBtn.disabled = true;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert('Your message was successfully sent!');
      document.getElementById('contactForm').reset();
    } else {
      alert('Failed to send message.');
    }
  } catch (error) {
    alert('Network error occurred.');
  } finally {
    submitBtn.innerText = 'Send Message ✉';
    submitBtn.disabled = false;
  }
}