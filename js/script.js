// ==========================================
// PORTFOLIO MAIN JAVASCRIPT & CONTACT FORM
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle (if applicable)
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Contact Form Submission via Node.js / Vercel Serverless API
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerText : 'Send Message';
      if (submitBtn) submitBtn.innerText = 'Sending...';

      // Gather Form Input Values
      const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        subject: document.getElementById('subject')?.value || 'Portfolio Contact',
        message: document.getElementById('message')?.value || '',
      };

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          alert('Message successfully send ho gaya!');
          contactForm.reset();
        } else {
          alert('Error: ' + (result.error || 'Message send nahi ho saka.'));
        }
      } catch (error) {
        alert('Network issue: ' + error.message);
      } finally {
        if (submitBtn) submitBtn.innerText = originalBtnText;
      }
    });
  }
});