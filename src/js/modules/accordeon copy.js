export default function initNumbersAccordion() {
  const wrap = document.querySelector('.numbers__content');
  if (!wrap) return;

  const cards = Array.from(wrap.querySelectorAll('.numbers__content__card'));
  if (!cards.length) return;

  const setActive = el => {
    wrap.classList.add('is-hover');
    cards.forEach(c => c.classList.toggle('is-active', c === el));
  };

  cards[0].classList.add('is-active');

  wrap.addEventListener('mouseover', e => {
    const card = e.target.closest('.numbers__content__card');
    if (card && wrap.contains(card)) setActive(card);
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.classList.remove('is-hover');
    cards.forEach(c => c.classList.remove('is-active'));
    cards[0].classList.add('is-active');
  });
}
