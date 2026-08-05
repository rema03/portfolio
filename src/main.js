document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('[data-nav]');
  const animSections = document.querySelectorAll('.anim-section');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('contact-success-msg');

  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');

  // 0. Theme Manager (Dark / Light)
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark if not specified

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleIcon) {
      themeToggleIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  };

  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // 1. Header Scrolled State
  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader);
  handleScrollHeader();

  // 2. Active Section Observer
  const sectionIds = ['hero', 'profile', 'projects', 'contact'];
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((el) => {
            if (el.getAttribute('data-nav') === id) {
              el.classList.add('active');
            } else {
              el.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) activeObserver.observe(el);
  });

  // 3. Scroll Animation Observer for .anim-section
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  animSections.forEach((section) => {
    animObserver.observe(section);
  });

  // 4. Contact Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!submitBtn) return;

      const originalBtnText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = '전송 중...';

      const formData = new FormData(contactForm);
      const data = new URLSearchParams(formData);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!response.ok) {
          throw new Error('Server returned error status');
        }

        if (successMsg) {
          contactForm.style.display = 'none';
          successMsg.style.display = 'block';
        }
      } catch (err) {
        console.error('Failed to submit contact form:', err);
        alert('메시지 전송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  }
});
