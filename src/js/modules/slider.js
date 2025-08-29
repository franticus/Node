export default function initReviewsSlider() {
  const wrap = document.querySelector('.numbers__content');
  if (!wrap) return;
  wrap.addEventListener(
    'mouseenter',
    e => {
      const card = e.target.closest('.numbers__content__card');
      if (!card) return;
      wrap.classList.add('is-hover');
      wrap
        .querySelectorAll('.numbers__content__card.is-active')
        .forEach(n => n.classList.remove('is-active'));
      card.classList.add('is-active');
    },
    true
  );
  wrap.addEventListener('mouseleave', () => {
    wrap.classList.remove('is-hover');
    wrap
      .querySelectorAll('.numbers__content__card.is-active')
      .forEach(n => n.classList.remove('is-active'));
  });
}
