// Active nav highlight
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.sidebar-nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: .1 });

document.querySelectorAll('section, .stat-card, .projeto-item, .course-card').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(16px);transition:opacity .45s ease,transform .45s ease,border-color .2s';
  io.observe(el);
});

// ── LIGHTBOX DA FOTO DE PERFIL ────────────────────────────
(function () {
  const img = document.querySelector('.perfil-img');
  if (!img) return;

  // Cursor de zoom e dica visual
  img.style.cursor = 'zoom-in';
  img.title = 'Clique para ampliar';

  // Cria o overlay do lightbox
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <div id="lb-box">
      <img id="lb-img" src="${img.src}" alt="${img.alt}">
      <button id="lb-close" title="Fechar (ESC)">&#x2715;</button>
    </div>`;
  document.body.appendChild(overlay);

  function open() {
    overlay.classList.add('lb-visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('lb-visible');
    document.body.style.overflow = '';
  }

  img.addEventListener('click', open);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.getElementById('lb-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
