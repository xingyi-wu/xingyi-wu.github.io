(() => {
  const gallery = document.querySelector('.app-gallery');
  if (!gallery) return;
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const move = amount => gallery.scrollBy({ left: amount, behavior: reduced.matches ? 'auto' : 'smooth' });
  const update = () => {
    prev.disabled = gallery.scrollLeft <= 1;
    next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1;
  };
  prev.addEventListener('click', () => move(-228));
  next.addEventListener('click', () => move(228));
  gallery.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 228 : -228);
    }
  });
  gallery.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const delta = raw * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gallery.clientWidth : 1);
    const max = gallery.scrollWidth - gallery.clientWidth;
    if (!delta || max <= 0 || (delta < 0 && gallery.scrollLeft <= 0) || (delta > 0 && gallery.scrollLeft >= max - 1)) return;
    event.preventDefault(); gallery.scrollLeft += delta;
  }, { passive: false });
  let drag = null;
  gallery.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, left: gallery.scrollLeft };
    gallery.setPointerCapture(event.pointerId);
    gallery.classList.add('is-dragging');
    event.preventDefault();
  });
  gallery.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    gallery.scrollLeft = drag.left - (event.clientX - drag.x);
  });
  const stop = () => { drag = null; gallery.classList.remove('is-dragging'); };
  gallery.addEventListener('pointerup', stop);
  gallery.addEventListener('pointercancel', stop);
  gallery.addEventListener('lostpointercapture', stop);
  update();
})();
