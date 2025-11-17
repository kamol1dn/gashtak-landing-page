const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const targetValue = Number(el.dataset.count);
      const suffix = el.textContent.replace(/\d+/g, '');
      const startTime = performance.now();
      const duration = 1100;

      const tick = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(targetValue * progress);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));
