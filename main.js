const cur = document.getElementById('cur'), c2 = document.getElementById('cur2');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
(function loop() { rx += (mx - rx) * .1; ry += (my - ry) * .1; c2.style.left = rx + 'px'; c2.style.top = ry + 'px'; requestAnimationFrame(loop); })();

// SKILLS
const DEV = [
  { n: 'Python', p: 60, l: 'Intermedio' },
  { n: 'SQL / Bases de datos', p: 60, l: 'Intermedio' },
  { n: 'Git & GitHub', p: 60, l: 'Intermedio' },
  { n: 'Node.js', p: 45, l: 'Básico-Med.' },
  { n: 'Go', p: 30, l: 'Básico' },
];
const WEB = [
  { n: 'HTML & CSS', p: 55, l: 'Básico-Med.' },
  { n: 'JavaScript', p: 60, l: 'Intermedio' },
  { n: 'Angular', p: 35, l: 'Básico' },
  { n: 'React', p: 35, l: 'Básico' },
  { n: 'Astro', p: 30, l: 'Básico' },
];
const IT = [
  { n: 'Windows', p: 70, l: 'Intermedio' },
  { n: 'Soporte técnico', p: 65, l: 'Básico-Med.' },
  { n: 'Diagnóstico HW/SW', p: 65, l: 'Básico-Med.' },
  { n: 'Redes LAN / TCP-IP', p: 55, l: 'Básico-Med.' },
  { n: 'Mantenimiento preventivo', p: 65, l: 'Básico-Med.' },
  { n: 'Documentación', p: 70, l: 'Intermedio' },
];
const CERTS = [
  'Ingeniería Informática — UFloCa',
  'Bachillerato en Educación Media',
  'Inglés técnico B2',
  '+ Agregá tus cursos aquí',
];

function buildSkills(data, id) {
  document.getElementById(id).innerHTML = data.map(s => `
    <div class="sk-item">
      <span class="sk-name">${s.n}</span>
      <div class="sk-track"><div class="sk-fill" data-p="${s.p}"></div></div>
      <span class="sk-lv">${s.l}</span>
    </div>`).join('');
}
function animSkills() {
  document.querySelectorAll('.sk-fill:not([data-done])').forEach(b => {
    if (b.getBoundingClientRect().top < window.innerHeight - 60) {
      b.style.width = b.dataset.p + '%'; b.setAttribute('data-done', '1');
    }
  });
}

// ═══════════════════════════════════════════════
// PROYECTOS — EDITÁ AQUÍ
// ═══════════════════════════════════════════════
const PROYECTOS = [
  {
    title: 'Sistema de Gestión — Barbería',
    desc: 'Aplicación web para gestión de citas, clientes y servicios de una barbería. Permite registrar turnos, administrar clientes y consultar el historial de servicios.',
    tags: ['Node.js', 'HTML', 'CSS', 'SQL'],
    year: '2025',
    type: 'Personal',
    link: '#'
  },
  {
    title: 'Proyecto 2 — Reemplazame',
    desc: 'Describí qué hace, qué tecnologías usaste y qué problema resuelve.',
    tags: ['React', 'SQL'],
    year: '2024',
    type: 'Personal',
    link: '#'
  },
];
// ═══════════════════════════════════════════════

function renderProjs() {
  const el = document.getElementById('projList');
  if (!PROYECTOS.length) { el.innerHTML = '<div class="empty">Próximamente...</div>'; return; }
  el.innerHTML = PROYECTOS.map(p => `
    <a class="proj-card" href="${p.link || '#'}" target="${p.link && p.link !== '#' ? '_blank' : '_self'}" rel="noopener">
      <span class="p-year">${p.year || '—'}</span>
      <div>
        <div class="p-title">${p.title}</div>
        <div class="p-desc">${p.desc}</div>
        <div class="p-tags">${(p.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('')}</div>
      </div>
      <span class="p-type">${p.type || ''}</span>
      <span class="p-arrow">↗</span>
    </a>`).join('');
  observe();
}

function observe() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, { threshold: .07 });
  document.querySelectorAll('.rev:not(.in)').forEach(el => obs.observe(el));
}

buildSkills(DEV, 'skDev');
buildSkills(WEB, 'skWeb');
buildSkills(IT, 'skIT');
document.getElementById('certs').innerHTML = CERTS.map(c => `<div class="cert">${c}</div>`).join('');
renderProjs();
observe();
window.addEventListener('scroll', animSkills, { passive: true });
animSkills();
