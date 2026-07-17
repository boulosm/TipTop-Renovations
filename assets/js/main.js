
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('active');
  });
});

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', btn.closest('.faq-item').classList.contains('active') ? 'true' : 'false');
  });
});

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.testimonial-track');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const slides = [...track.querySelectorAll('.testimonial-slide')];
  const dotsWrap = carousel.parentElement.querySelector('.carousel-dots');

  const getStep = () => {
    const first = slides[0];
    if (!first) return track.clientWidth;
    const styles = getComputedStyle(track);
    return first.getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  prev?.addEventListener('click', () => track.scrollBy({left:-getStep(), behavior:'smooth'}));
  next?.addEventListener('click', () => track.scrollBy({left:getStep(), behavior:'smooth'}));

  if (dotsWrap && slides.length) {
    const visibleCount = window.innerWidth < 641 ? 1 : window.innerWidth < 951 ? 2 : 3;
    const dotCount = Math.ceil(slides.length / visibleCount);
    for (let i=0; i<dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i===0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to review group ${i+1}`);
      dot.addEventListener('click', () => track.scrollTo({left:i * getStep() * visibleCount, behavior:'smooth'}));
      dotsWrap.appendChild(dot);
    }
    track.addEventListener('scroll', () => {
      const index = Math.round(track.scrollLeft / (getStep() * visibleCount));
      [...dotsWrap.children].forEach((d,i)=>d.classList.toggle('active', i===index));
    }, {passive:true});
  }
});
