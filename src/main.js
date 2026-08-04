document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app');

  // Intersection Observer for Scroll Animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    },
    { threshold: 0.15, root: appContainer }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    animationObserver.observe(el);
  });

  // Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.4, root: appContainer }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // Smooth scroll for nav links within .app container
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Find the parent snap-page
        const snapPage = targetEl.closest('.snap-page');
        if (snapPage) {
          snapPage.scrollIntoView({ behavior: 'smooth' });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ 전송 중...</span>';

      const formData = new FormData(contactForm);
      const data = new URLSearchParams(formData);
      const url = '/api/contact';

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.ok) {
          throw new Error('Server error');
        }

        alert('메시지가 성공적으로 전송되었습니다!');
        contactForm.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('메시지 전송에 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});
