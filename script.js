document.addEventListener('DOMContentLoaded', () => {

  // ── BURGER NAV MENU ──
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // ── HEADER SCROLL HEADER EFFECT ──
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ── LIGHT / DARK THEME SYSTEM ──
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ── SCROLL REVEAL ANIMATION ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ── ANIMATED COUNTERS STATISTICS ──
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + inc > target ? target : count + inc;
      setTimeout(() => startCounting(counter), 15);
    } else {
      counter.innerText = target;
    }
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ── FAQ ACCORDION MULTIPLE ──
  const faqTriggers = document.querySelectorAll('.faq__trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const content = parent.querySelector('.faq__content');
      const isActive = parent.classList.contains('active');

      document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq__content').style.maxHeight = null;
      });

      if (!isActive) {
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ── SCROLL TO TOP & APPOINTMENT BUTTONS ──
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const floatingAppointBtn = document.getElementById('floatingAppointBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
      if (floatingAppointBtn) floatingAppointBtn.style.transform = 'translateY(0)';
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── APPOINTMENT FORM SUBMIT TOAST ──
  const form = document.getElementById('appointmentForm');
  const toast = document.getElementById('formToast');

  if (form && toast) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Имитация успешной отправки на бэкенд
      toast.classList.add('visible');
      form.reset();

      setTimeout(() => {
        toast.classList.remove('visible');
      }, 4500);
    });
  }

  // Ограничение выбора прошедших дат в форме записи
  const dateInput = document.getElementById('formDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});