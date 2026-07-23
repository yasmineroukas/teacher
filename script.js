// =========================================================
// الأستاذة تلغمتي - تفاعلات الموقع
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* ---------- Fade-up on scroll ---------- */
  const faders = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  faders.forEach(el => observer.observe(el));

  /* ---------- Counter animation (years of experience) ---------- */
  const counter = document.querySelector('.counter');
  if (counter) {
    const target = parseInt(counter.dataset.target, 10);
    let started = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            counter.textContent = current;
          }, 35);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(counter);
  }

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track ? Array.from(track.children) : [];
  let current = 0;
  let autoSlide;

  if (track && slides.length) {
    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `عرض الرأي رقم ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function goToSlide(index) {
      current = index;
      track.style.transform = `translateX(${-current * 100}%)`;
      dotsWrap.querySelectorAll('button').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function nextSlide() {
      goToSlide((current + 1) % slides.length);
    }

    function startAutoSlide() {
      autoSlide = setInterval(nextSlide, 5000);
    }

    startAutoSlide();

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.parentElement.addEventListener('mouseleave', startAutoSlide);
  }

});
