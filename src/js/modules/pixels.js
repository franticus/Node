export default function Pixels() {
  (function() {
    const btn = document.getElementById('getGameBtn');
    if (!btn) return;

    const left = btn.querySelector('.px-emitter.left');
    const right = btn.querySelector('.px-emitter.right');

    let timers = [];
    let hovered = false;

    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = arr => arr[(Math.random() * arr.length) | 0];

    function spawnPixel(emitterEl, side) {
      const px = document.createElement('span');
      px.className = 'px';

      // размеры эмиттера и кнопки
      const h = btn.clientHeight;
      const w = emitterEl.clientWidth || 14;

      // случайные координаты старта внутри «широкой полосы» вдоль всей высоты
      const y = rand(2, h - 8);
      const x = rand(-w + 2, 2); // немного внутрь/наружу от края

      // тайминги и вариативность
      const dur = rand(350, 700);
      const delay = rand(0, 120);
      const dy = pick([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]); // небольшой вертикальный разлёт
      const scale = pick([1, 1, 1, 2]); // иногда крупнее

      px.style.top = `${y}px`;
      px.style.left = `${x}px`;
      px.style.transform = `scale(${scale})`;
      px.style.setProperty('--dy', `${dy}px`);
      px.style.animation = `${
        side === 'left' ? 'px-fly-left' : 'px-fly-right'
      } ${dur}ms linear ${delay}ms forwards`;

      // легкий «шум» по цвету/краю
      if (Math.random() < 0.25)
        px.style.boxShadow = '0 0 0 1px rgba(255,255,255,.08) inset';

      emitterEl.appendChild(px);
      px.addEventListener('animationend', () => px.remove(), { once: true });
    }

    function start() {
      if (hovered) return;
      hovered = true;

      // базовые частоты спауна слева/справа
      timers.push(setInterval(() => spawnPixel(left, 'left'), 40));
      timers.push(setInterval(() => spawnPixel(right, 'right'), 40));

      // случайные «всплески»
      timers.push(
        setInterval(() => {
          if (!hovered) return;
          const burst = (em, side) => {
            const n = 2 + ((Math.random() * 3) | 0);
            for (let i = 0; i < n; i++)
              setTimeout(() => spawnPixel(em, side), i * 28);
          };
          Math.random() < 0.5 ? burst(left, 'left') : burst(right, 'right');
        }, 1200)
      );
    }

    function stop() {
      hovered = false;
      timers.forEach(clearInterval);
      timers = [];
      // оставшиеся пиксели удалятся сами по завершении анимации
    }

    btn.addEventListener('mouseenter', start);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('focus', start);
    btn.addEventListener('blur', stop);
  })();
}
