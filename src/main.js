document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app');

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    wrapper: appContainer,
    content: document.querySelector('main'),
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Custom JS Snapping to simulate scroll-snap without conflict
  let snapTimeout;
  lenis.on('scroll', () => {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
      let minDistance = Infinity;
      let closestSection = null;
      document.querySelectorAll('.snap-page').forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });
      // Snap to closest section if it's not perfectly aligned
      if (closestSection && minDistance > 5) {
        lenis.scrollTo(closestSection, { duration: 0.8, lock: false });
      }
    }, 150); // wait 150ms after scroll ends to snap
  });

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
  const dots = document.querySelectorAll('.dot');

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

          // Update Pagination Dots
          dots.forEach((dot) => {
            if (dot.getAttribute('data-target') === currentId) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
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

  // Smooth scroll for nav links and dots within .app container
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      // Find the parent snap-page
      const snapPage = targetEl.closest('.snap-page');
      const finalTarget = snapPage ? snapPage : targetEl;

      // Use Lenis for scrolling if available
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(finalTarget, { lock: true });
      } else {
        finalTarget.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      handleScrollTo(e, targetId);
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const targetId = dot.getAttribute('data-target');
      handleScrollTo(e, targetId);
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
