/* =========================================================================
   Galbani 2027 × 75LAB — motor da apresentação
   HTML, CSS e JS puros. Sem dependências.
   ========================================================================= */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const body = document.body;
const stage = $('#stage');
const STATIC = /[?&]static(=|&|$)/.test(location.search); // QA: telas no estado final, sem movimento
if (STATIC) html.classList.add('static');
const RM = STATIC || matchMedia('(prefers-reduced-motion: reduce)').matches;
const MQ = matchMedia('(max-width: 820px), (orientation: portrait) and (max-width: 1100px)');
const forceDesk = /[?&]desktop(=|&|$)/.test(location.search);
const mobile = !forceDesk && MQ.matches;
if (mobile) html.classList.add('m');
if (!forceDesk) MQ.addEventListener?.('change', () => location.reload());

const store = {
  sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
};

/* ---------------------------------------------------------------------
   Ícones SVG com microanimações em loop (traço único, 24 × 24)
   --------------------------------------------------------------------- */
const ICONS = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path class="a-scan" d="M7.5 10.5h6" opacity=".7"/>',
  map: '<path d="M3 6.5 9 4.5l6 2 6-2v13l-6 2-6-2-6 2z"/><path d="M9 4.5v13M15 6.5v13"/><circle class="a-ping" cx="12" cy="11" r="1.6"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/><path class="a-wave2" d="M2.5 10H4M20 10h1.5M5 4l1 1M19 4l-1 1"/><path class="a-wave" d="M12 7v3"/>',
  spark: '<path class="a-wave" d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4"/><path class="a-wave2" d="m5.6 5.6 2.6 2.6M15.8 15.8l2.6 2.6M5.6 18.4l2.6-2.6M15.8 8.2l2.6-2.6"/><circle class="a-pulse f" cx="12" cy="12" r="2.4"/>',
  dash: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><rect class="a-rise" x="6.5" y="13" width="2.5" height="4.5" rx=".5"/><rect class="a-rise2" x="10.8" y="11.5" width="2.5" height="6" rx=".5"/><rect class="a-rise3" x="15" y="12.5" width="2.5" height="5" rx=".5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><rect class="a-pulse f" x="13.5" y="13.5" width="3" height="3" rx=".6"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 9.5h14"/><path class="a-wave" d="M8 5v2M8 12.5v4"/><g class="a-snow"><path d="M15 13v4.4M12.8 15.2h4.4M13.4 13.6l3.2 3.2M16.6 13.6l-3.2 3.2"/></g>',
  plate: '<circle cx="12" cy="14" r="6.5"/><circle cx="12" cy="14" r="3.5"/><path d="M2.5 5v5M4.5 5v5M2.5 8h2M3.5 10v10.5M21.5 5c-1.4 1-1.9 2.8-1.9 4.6s.5 2.9 1.9 2.9v8"/><path class="a-steam" d="M10 2.8c-.8.8.8 1.6 0 2.6"/><path class="a-steam2" d="M14 2.8c-.8.8.8 1.6 0 2.6"/>',
  store: '<path d="M4.5 11v9.5h15V11"/><path d="M3 10 5 4h14l2 6"/><path d="M3 10c0 1.4 1.3 2.5 3 2.5S9 11.4 9 10c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5"/><path class="a-pulse" d="M10 20.5V16h4v4.5"/>',
  grid: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect class="a-pulse" x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  layers: '<path class="a-bob" d="M12 3.5 21 8l-9 4.5L3 8z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16 9 4.5 9-4.5"/>',
  cycle: '<g class="a-spin"><path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12a8 8 0 0 1 13.7-5.6"/><path d="M17.7 2.8v3.8h-3.8"/><path d="M6.3 21.2v-3.8h3.8"/></g>',
  pin: '<path d="M12 21.5s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10.5" r="2.3"/><circle class="a-ping" cx="12" cy="10.5" r="2.3"/>',
  check: '<circle cx="12" cy="12" r="9"/><path class="a-tick" d="m8 12.5 2.8 2.8 5.7-5.8"/>',
  flag: '<path d="M5 21.5V3.5"/><path class="a-flag" d="M5 4h12l-2.5 4L17 12H5"/>',
  cheese: '<path d="M3 15.5 13 5l8 6.5v7.5H3z"/><path d="M3 15.5h18"/><circle class="a-pulse" cx="8.5" cy="17.5" r="1.1"/><circle cx="14.5" cy="12.5" r="1"/><circle class="a-pulse" cx="17.5" cy="17" r=".9"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle class="a-pulse f" cx="12" cy="12" r="2"/>',
  alert: '<path d="M12 3.2 2.3 20.5h19.4z"/><path d="M12 9.5v5"/><circle class="a-pulse f" cx="12" cy="17.3" r="1"/>',
  sandwich: '<path d="M3 10c0-3 4-5.5 9-5.5s9 2.5 9 5.5z"/><path class="a-bob" d="M3 13.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/><path d="M3 17h18v1.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  coffee: '<path d="M4 9h12v4.5A5.5 5.5 0 0 1 10.5 19h-1A5.5 5.5 0 0 1 4 13.5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path class="a-steam" d="M8 2.8c-1 1 1 2 0 3.4"/><path class="a-steam2" d="M12 2.8c-1 1 1 2 0 3.4"/><path d="M3 21.5h14"/>',
  book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/><path class="a-draw" d="M9 8h6M9 11h4"/>',
  pasta: '<path d="M2.5 12h19a9.5 8 0 0 1-19 0z"/><path class="a-draw" d="M8 12c0-3 2-5 1-8M12 12c0-3 2-5 1-8M16 12c0-3 2-5 1-8"/>',
  grater: '<path d="M7 4h10l1.5 16.5h-13z"/><path d="M10 4V2.5h4V4"/><circle class="f" cx="10" cy="9" r=".8"/><circle class="f" cx="14" cy="9" r=".8"/><circle class="f" cx="12" cy="12.5" r=".8"/><circle class="f" cx="10" cy="16" r=".8"/><circle class="f" cx="14" cy="16" r=".8"/><path class="a-fall" d="M21 12v1.6"/><path class="a-fall2" d="M21.8 16v1.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path class="a-hand" d="M12 12V6.5"/><path d="M12 12l3.5 2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><g class="a-blink"><circle cx="12" cy="12" r="3"/></g>',
  cart: '<g class="a-drive"><path d="M3 4h2.5l2.2 11h10.6L21 7H7"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></g>',
  cloche: '<path d="M3 17h18"/><path d="M4.5 17a7.5 7.5 0 0 1 15 0"/><path d="M12 9.5V8M10.5 8h3"/><path d="M2 20.5h20"/><path class="a-steam" d="M8.2 3.2c-.8.8.8 1.6 0 2.6"/><path class="a-steam2" d="M15.8 3.2c-.8.8.8 1.6 0 2.6"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path class="a-dot" d="M9.5 7.5h5"/><path class="a-dot2" d="M9.5 10.5h5"/><path class="a-dot3" d="M9.5 13.5h3"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/><circle class="a-flash f" cx="12" cy="13.5" r="3.5" opacity=".5"/><circle class="a-dot f" cx="17.8" cy="10.5" r=".9"/>',
  wifi: '<path class="a-wave3" d="M2.5 9a14 14 0 0 1 19 0"/><path class="a-wave2" d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path class="a-wave" d="M8.5 16a5 5 0 0 1 7 0"/><circle class="f" cx="12" cy="19.3" r="1.3"/>',
  qr: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2v2h-2zM18.5 18.5h2v2h-2zM18.5 14.5h2M14.5 18.5v2"/><path class="a-scan" d="M2 12h20" opacity=".7"/>',
  enter: '<path d="M14 3.5h5a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-5"/><g class="a-drive"><path d="M3 12h11M10 8l4 4-4 4"/></g>',
  mega: '<path d="M3 10v4h3l7 4.5v-13L6 10z"/><path class="a-wave" d="M16.5 9a4 4 0 0 1 0 6"/><path class="a-wave2" d="M19 6.5a7.5 7.5 0 0 1 0 11"/>',
  plug: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path class="a-wave" d="M12 17v4.5"/>',
  truck: '<g class="a-drive"><path d="M2.5 6.5h10.5v9.5H2.5z"/><path d="M13 9.5h4l3.5 3.5v3H13z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.8" cy="17.5" r="1.8"/></g><path class="a-road" d="M1 21.5h22"/>',
  box: '<path d="M3.5 9.5h17v11h-17z"/><path class="a-lid" d="M2.5 9.5 4.5 5h15l2 4.5"/><path d="M10 13.5h4"/>',
  wrench: '<g class="a-swing"><path d="M15 3.5a4.5 4.5 0 0 0-4.3 5.8L3.8 16.2a1.9 1.9 0 0 0 2.7 2.7l6.9-6.9A4.5 4.5 0 0 0 19.6 7.4l-2.7 2.7-2.6-.7-.7-2.6 2.7-2.7a4.5 4.5 0 0 0-1.3-.6z"/></g>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle class="a-bob" cx="17" cy="9" r="2.4"/><path d="M15.5 14.2a4.5 4.5 0 0 1 5 4.3"/>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9.5z"/><path class="a-scan" d="M12 16.5v-5M10 13.5l2-2 2 2"/>',
  chart: '<path d="M3.5 20.5h17"/><rect class="a-rise" x="5.5" y="12" width="3" height="7" rx=".8"/><rect class="a-rise2" x="10.5" y="8" width="3" height="11" rx=".8"/><rect class="a-rise3" x="15.5" y="4.5" width="3" height="14.5" rx=".8"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path class="a-draw" d="M9 12h6M9 15h6M9 18h3"/>',
  pen: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/><path class="a-draw" d="M12 21h8"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 15.5a2.5 2.5 0 0 1 5 0"/><path class="a-draw" d="M13.5 10h4.5M13.5 13.5h3"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/><path class="a-tick" d="m8.5 12 2.5 2.5 4.5-5"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle class="a-pulse" cx="7.5" cy="8.5" r="1.5"/>',
  bell: '<path class="a-swing" d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  data: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/><path class="a-wave" d="M5 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/><path class="a-wave2" d="M5 14.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  handshake: '<circle cx="9" cy="12" r="5.5"/><circle class="a-bob" cx="15" cy="12" r="5.5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><g class="a-needle"><path d="m12 5.5 2.4 6.5L12 18.5 9.6 12z"/><circle class="f" cx="12" cy="12" r="1.2"/></g>',
  building: '<rect x="3" y="9" width="8" height="12" rx="1"/><rect x="11" y="3" width="10" height="18" rx="1"/><path d="M14 7h1M17.5 7h1M14 11h1M17.5 11h1M14 15h1M17.5 15h1M5.8 13h2.4M5.8 17h2.4"/><circle class="a-ping" cx="16" cy="3" r="1.6"/>',
  pointer: '<path class="a-bob" d="M6 3.5 18 12l-5.2 1.2 3 6.1-2.4 1.2-3-6.1L6.5 18z"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path class="a-bob" d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 1.9 0 2.6 5.2 1.4 5.2 4.1 0 1.1-1.1 2-2.7 2-1.2 0-2.2-.5-2.7-1.4M12 6.5V8m0 8v1.5"/>'
};
function paintIcons(root = document) {
  $$('.ic[data-ic]', root).forEach(el => {
    if (el.firstChild) return;
    const d = ICONS[el.dataset.ic];
    if (d) el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  });
}

/* ---------------------------------------------------------------------
   Preparação do conteúdo
   --------------------------------------------------------------------- */
const CHAPTERS = ['Abertura', 'I · O desafio', 'II · A solução', 'III · A 75LAB', 'IV · Plano e investimento', 'Apoio'];
const slides = $$('.slide');
const mainS = slides.filter(s => !s.classList.contains('apx'));
const apxS = slides.filter(s => s.classList.contains('apx'));
const chOf = s => +s.dataset.ch;

$$('[data-i]').forEach(el => el.style.setProperty('--i', el.dataset.i));

// títulos: palavras sobem por máscara
function splitWords(h) {
  let wi = 0;
  const walk = (node, into) => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { into.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part; i.style.setProperty('--wi', wi++);
          w.appendChild(i); into.appendChild(w);
        });
      } else if (n.nodeType === 1) {
        const c = n.cloneNode(false); into.appendChild(c); walk(n, c);
      }
    });
  };
  const frag = document.createDocumentFragment();
  const label = h.textContent.replace(/\s+/g, ' ').trim();
  walk(h, frag);
  h.textContent = ''; h.appendChild(frag); h.setAttribute('aria-label', label);
}
$$('.tk').forEach(splitWords);

// capa: letras da primeira linha (a segunda é script ligado e entra inteira)
$$('#s0 h1 .l1').forEach(m => {
  const t = m.textContent; m.textContent = '';
  let i = 0;
  t.split(' ').forEach((word, k) => {
    if (k) { m.appendChild(document.createTextNode(' ')); i++; }
    const wd = document.createElement('span'); wd.className = 'wd';
    [...word].forEach(ch => {
      const s = document.createElement('span'); s.className = 'ch';
      s.style.setProperty('--ci', i++); s.textContent = ch; wd.appendChild(s);
    });
    m.appendChild(wd);
  });
});

// 20 · matriz de clusters
(function clusters() {
  const el = $('#cm'); if (!el) return;
  const heads = [
    ['A', 'Âncora', 'Alta relevância, boa operação fria, espaço e equipe.'],
    ['B', 'Crescimento', 'Potencial médio, restrição de área ou contrapartida.'],
    ['C', 'Cobertura', 'Loja pequena, pouco espaço ou sem infraestrutura.']
  ];
  const rows = [
    ['grid', 'Mix-base', [[3, 'completo'], [3, 'completo'], [2, 'de entrada']]],
    ['layers', 'Expansão de mix', [[3, 'sim'], [1, 'pontual'], [0]]],
    ['eye', 'Bloco de marca', [[3, 'gôndola ou geladeira'], [2, 'gôndola ou freezer'], [1, 'materiais leves']]],
    ['tag', 'Ponto extra', [[3, 'em janela negociada'], [2, 'bandeja ou mesa'], [0]]],
    ['cloche', 'Degustação', [[2, 'seletiva'], [1, 'em janelas'], [0]]],
    ['camera', 'Codice e evidências', [[3, 'completo'], [2, 'checklist'], [1, 'foto de execução']]]
  ];
  const fn = ['Provar o modelo e elevar conversão.', 'Mais SKUs por loja com baixo custo de manutenção.', 'Abrir disponibilidade sem imobilizar capital.'];
  let h = '<div class="h"></div>' + heads.map(c => `<div class="h"><span class="l">CLUSTER ${c[0]}</span><b>${c[1]}</b><small>${c[2]}</small></div>`).join('');
  let k = 0;
  rows.forEach(r => {
    h += `<div class="k"><i class="ic" data-ic="${r[0]}"></i>${r[1]}</div>`;
    r[2].forEach(([lv, t]) => {
      if (!lv) { h += '<div class="c"><span class="x">não se aplica</span></div>'; return; }
      h += `<div class="c" style="justify-content:flex-start;gap:10px"><span class="lv">${[1, 2, 3].map(n => `<i class="${n <= lv ? 'on' : ''}" style="--k:${k++}"></i>`).join('')}</span><span style="font-size:14px">${t}</span></div>`;
    });
  });
  h += '<div class="fn k">Função</div>' + fn.map(t => `<div class="fn">${t}</div>`).join('');
  el.innerHTML = h;
  el.setAttribute('role', 'table');
  el.setAttribute('aria-label', 'Intensidade das soluções por cluster de loja');
})();

paintIcons();

/* ---------------------------------------------------------------------
   Escala do palco: 900 de altura e largura de 1600 a 2100
   (ou 1600 de largura e altura até 1100 em telas mais altas)
   --------------------------------------------------------------------- */
const qa = parseFloat((location.search.match(/[?&]ar=([\d.]+)/) || [])[1]) || 0; // QA: ?desktop&ar=2.2
function fit() {
  if (mobile) return;
  const vw = innerWidth, vh = innerHeight; if (!vw || !vh) return;
  const a = qa || vw / vh;
  let W = 1600, H = 900;
  if (a > 16 / 9) W = Math.min(2100, Math.round(900 * a));
  else H = Math.min(1100, Math.round(1600 / a));
  stage.style.width = W + 'px'; stage.style.height = H + 'px';
  stage.style.setProperty('--scale', Math.min(vw / W, vh / H).toFixed(4));
}
fit();
const getScale = () => parseFloat(stage.style.getPropertyValue('--scale')) || 1;

/* ---------------------------------------------------------------------
   Contadores
   --------------------------------------------------------------------- */
const nf = (v, dec) => v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
function runCounts(s) {
  $$('[data-count]', s).forEach(el => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    if (RM) { el.textContent = nf(to, dec); return; }
    const delay = 450, dur = 1700, t0 = performance.now() + delay;
    cancelAnimationFrame(el._raf);
    const tick = t => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      el.textContent = nf(to * (1 - Math.pow(1 - p, 4)), dec);
      if (p < 1) el._raf = requestAnimationFrame(tick); else el.textContent = nf(to, dec);
    };
    el._raf = requestAnimationFrame(tick);
    clearTimeout(el._fin); el._fin = setTimeout(() => { cancelAnimationFrame(el._raf); el.textContent = nf(to, dec); }, delay + dur + 150);
  });
}
function resetCounts(s) {
  $$('[data-count]', s).forEach(el => { cancelAnimationFrame(el._raf); clearTimeout(el._fin); el.textContent = nf(0, +(el.dataset.dec || 0)); });
}
$$('[data-count]').forEach(el => { el.textContent = nf(0, +(el.dataset.dec || 0)); });

/* ---------------------------------------------------------------------
   Telas com comportamento próprio (entrada e saída)
   --------------------------------------------------------------------- */
const onEnter = {}, onLeave = {};

// 06 · produtos × ocasiões
(function portfolio() {
  const pm = $('#pm'), svg = $('#pmLinks'); if (!pm) return;
  const MAP = { mus: ['lan', 'rec'], req: ['caf', 'lan', 'rec'], ric: ['caf', 'rec'], par: ['mas', 'fin', 'rec'] };
  const prods = $('.prods', pm), occs = $('.occs', pm);
  function draw() {
    if (mobile) return;
    const W = pm.clientWidth, H = pm.clientHeight; if (!W) return;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('preserveAspectRatio', 'none');
    const x1 = prods.offsetLeft + prods.offsetWidth, x2 = occs.offsetLeft, dx = (x2 - x1) * .45;
    let out = '', n = 0;
    Object.entries(MAP).forEach(([p, list]) => {
      const pe = $(`[data-p="${p}"]`, prods), y1 = prods.offsetTop + pe.offsetTop + pe.offsetHeight / 2;
      list.forEach(o => {
        const oe = $(`[data-o="${o}"]`, occs), y2 = occs.offsetTop + oe.offsetTop + oe.offsetHeight / 2;
        out += `<path class="draw" pathLength="1" data-p="${p}" data-o="${o}" style="--d:${(.7 + n++ * .08).toFixed(2)}s" d="M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}"/>`;
      });
    });
    svg.innerHTML = out;
  }
  draw(); addEventListener('resize', draw);
  if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(pm);
  document.fonts?.ready.then(draw);
  const hl = (p, o) => {
    pm.classList.add('hl');
    $$('path', svg).forEach(x => x.classList.toggle('on', (p && x.dataset.p === p) || (o && x.dataset.o === o)));
    const onP = new Set(), onO = new Set();
    Object.entries(MAP).forEach(([pp, l]) => l.forEach(oo => { if (pp === p || oo === o) { onP.add(pp); onO.add(oo); } }));
    $$('.prod', pm).forEach(e => e.classList.toggle('on', onP.has(e.dataset.p)));
    $$('.occ', pm).forEach(e => e.classList.toggle('on', onO.has(e.dataset.o)));
  };
  const clear = () => { pm.classList.remove('hl'); $$('.on', pm).forEach(e => e.classList.remove('on')); };
  $$('.prod', pm).forEach(e => { e.addEventListener('mouseenter', () => hl(e.dataset.p)); e.addEventListener('mouseleave', clear); e.addEventListener('focusin', () => hl(e.dataset.p)); e.addEventListener('focusout', clear); });
  $$('.occ', pm).forEach(e => { e.addEventListener('mouseenter', () => hl(null, e.dataset.o)); e.addEventListener('mouseleave', clear); });
})();

// 14 · prateleira: embalagens dispersas que viram bloco
(function shelf() {
  const f = $('#field'); if (!f) return;
  const R = 4, C = 13, G = [[0, 2], [0, 9], [1, 5], [1, 12], [2, 1], [2, 7], [3, 4], [3, 10]];
  const isG = (r, c) => G.some(g => g[0] === r && g[1] === c);
  const blockSlots = []; for (let r = 1; r <= 2; r++) for (let c = 8; c <= 11; c++) blockSlots.push([r, c]);
  const free = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (!blockSlots.some(b => b[0] === r && b[1] === c)) free.push([r, c]);
  const dots = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const d = document.createElement('i'); d.className = 'd';
    d.dataset.r = r; d.dataset.c = c;
    if (isG(r, c)) { d.classList.add('g'); if ((r + c) % 2) d.classList.add('r'); }
    else d.style.background = ['#D9D2C4', '#E4DED2', '#CFC7B8', '#E9E4DA'][(r * 7 + c * 3) % 4];
    f.appendChild(d); dots.push(d);
  }
  for (let r = 0; r < R; r++) { const s = document.createElement('span'); s.className = 'shelf'; s.dataset.r = r; f.appendChild(s); }
  const blk = document.createElement('div'); blk.className = 'blk'; blk.innerHTML = '<span>Bloco Galbani</span>'; f.appendChild(blk);
  function layout() {
    const W = f.clientWidth, H = f.clientHeight; if (!W) return;
    const padX = W * .06, padT = H * .2, stepX = (W - padX * 2) / C, rowH = (H - padT - H * .06) / R;
    const dw = stepX * .66, dh = rowH * .62;
    const pos = (r, c) => [padX + c * stepX + (stepX - dw) / 2, padT + r * rowH + (rowH - dh) - 6];
    $$('.shelf', f).forEach(s => { s.style.top = (padT + (+s.dataset.r + 1) * rowH - 4) + 'px'; });
    let gi = 0, fi = 0;
    dots.forEach(d => {
      d.style.width = dw + 'px'; d.style.height = dh + 'px';
      const [x0, y0] = pos(+d.dataset.r, +d.dataset.c);
      d.style.setProperty('--x0', x0 + 'px'); d.style.setProperty('--y0', y0 + 'px');
      let target;
      if (d.classList.contains('g')) target = blockSlots[gi++];
      else target = free[fi++];
      const [x1, y1] = pos(target[0], target[1]);
      const key = d.classList.contains('g') ? '1' : '2';
      d.style.setProperty('--x' + key, x1 + 'px'); d.style.setProperty('--y' + key, y1 + 'px');
      d.style.setProperty('--dl', (d.classList.contains('g') ? gi * .07 : .2 + Math.random() * .3).toFixed(2) + 's');
    });
    const [bx, by] = pos(1, 8), [ex, ey] = pos(2, 11);
    Object.assign(blk.style, { left: (bx - 10) + 'px', top: (by - 12) + 'px', width: (ex - bx + dw + 20) + 'px', height: (ey - by + dh + 22) + 'px' });
  }
  layout(); addEventListener('resize', layout);
  document.fonts?.ready.then(layout);
  if (window.ResizeObserver) new ResizeObserver(() => layout()).observe(f);
  const tag = $('#fieldTag');
  const set = on => {
    f.classList.toggle('grouped', on);
    tag.textContent = on ? '2027 · bloco de marca por ocasião' : 'Hoje · SKUs dispersos';
    $$('.tog button', f).forEach(b => b.setAttribute('aria-pressed', String((b.dataset.st === '1') === on)));
  };
  $$('.tog button', f).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); set(b.dataset.st === '1'); }));
  let t = 0;
  onEnter.s14 = () => { layout(); set(false); clearTimeout(t); t = setTimeout(() => { if (cur && cur.id === 's14') set(true); }, RM ? 200 : 1700); };
  onLeave.s14 = () => { clearTimeout(t); set(false); };
  if (mobile) set(true);
})();

// 18 · bloco em vista explodida
(function exploded() {
  const ex = $('#ex'), rig = $('#rig'), gap = $('#exGap'); if (!ex) return;
  let ry = -28, rx = -14, drag = null, anim = 0;
  const apply = () => { rig.style.setProperty('--ry', ry + 'deg'); rig.style.setProperty('--rx', rx + 'deg'); };
  const setGap = v => { rig.style.setProperty('--gap', v + 'px'); gap.value = v; ex.classList.toggle('open', v > 20); };
  ex.addEventListener('pointerdown', e => { if (e.target === gap) return; drag = { x: e.clientX, y: e.clientY, rx, ry }; ex.classList.add('dragging'); ex.setPointerCapture(e.pointerId); });
  ex.addEventListener('pointermove', e => {
    if (!drag) return;
    const s = mobile ? 1 : getScale();
    ry = Math.max(-70, Math.min(70, drag.ry + (e.clientX - drag.x) / s * .3));
    rx = Math.max(-40, Math.min(20, drag.rx - (e.clientY - drag.y) / s * .2));
    apply();
  });
  const end = () => { drag = null; ex.classList.remove('dragging'); };
  ex.addEventListener('pointerup', end); ex.addEventListener('pointercancel', end);
  gap.addEventListener('input', e => setGap(+e.target.value));
  gap.addEventListener('pointerdown', e => e.stopPropagation());
  $$('#s18 .bk-l li').forEach(li => {
    const ls = li.dataset.layer.split(',');
    li.addEventListener('mouseenter', () => { $$('.lay', rig).forEach(l => l.classList.toggle('hl', ls.includes(l.dataset.l))); if (+gap.value < 30) setGap(46); });
    li.addEventListener('mouseleave', () => $$('.lay', rig).forEach(l => l.classList.remove('hl')));
  });
  apply(); setGap(0);
  onEnter.s18 = () => { clearTimeout(anim); setGap(0); anim = setTimeout(() => { if (cur && cur.id === 's18') setGap(46); }, RM ? 100 : 1500); };
  onLeave.s18 = () => { clearTimeout(anim); };
  if (mobile) setGap(40);
})();

// 07 · pontos do bloco: número na imagem e item da lista acendem juntos
(function blockPins() {
  const els = $$('#s18 [data-n]'); if (!els.length) return;
  $$('#s18 .pin').forEach((p, i) => p.style.setProperty('--k', i));
  const shot = $('#s18 .shot');
  const set = n => {
    els.forEach(e => e.classList.toggle('on', e.dataset.n === n));
    const pin = n && $(`#s18 .pin[data-n="${n}"]`);
    if (pin) { shot.style.setProperty('--sx', pin.style.left); shot.style.setProperty('--sy', pin.style.top); }
    shot.classList.toggle('lit', !!pin);
  };
  els.forEach(e => { e.addEventListener('mouseenter', () => set(e.dataset.n)); e.addEventListener('mouseleave', () => set(null)); });
})();

// 04 · mapa de territórios: legenda no hover, clique fixa (toque e apresentação)
(function territories() {
  const m = $('#tmap'); if (!m) return;
  const pls = $$('.pl', m);
  const pin = el => pls.forEach(p => p.classList.toggle('on', p === el && !p.classList.contains('on')));
  pls.forEach(p => p.addEventListener('click', e => { e.stopPropagation(); pin(p); }));
  m.addEventListener('click', () => pls.forEach(p => p.classList.remove('on')));
  m.addEventListener('keydown', e => { if (e.key === 'Escape') { pls.forEach(p => p.classList.remove('on')); e.stopPropagation(); } });
  onLeave.s8 = () => pls.forEach(p => p.classList.remove('on'));
  // no celular não há hover: as legendas viram lista abaixo do mapa
  $('#s8 .tmap-list').innerHTML = pls.filter(p => !p.classList.contains('risk')).map(p => `<li><b>${$('b', p).textContent}</b><span>${$('.tip span', p).textContent}</span><strong>${$('.tip strong', p).textContent}</strong></li>`).join('');
})();

// 28 · teia de benefícios
(function web() {
  const w = $('#web'), svg = $('#webLinks'); if (!w) return;
  const pts = $$('.bn', w).map(b => [parseFloat(b.style.left), parseFloat(b.style.top)]);
  let out = '';
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    out += `<path d="M${p[0]} ${p[1]} L${q[0]} ${q[1]}"/>`;
  });
  pts.forEach(p => { out += `<path class="sp" d="M50 50 L${p[0]} ${p[1]}"/>`; });
  svg.innerHTML = out;
})();

/* ---------------------------------------------------------------------
   Navegação
   --------------------------------------------------------------------- */
let cur = null, returnTo = mainS[0], busy = false, busyT = 0;
const pad = n => String(n).padStart(2, '0');

// régua de progresso no cabeçalho, com um marco por capítulo
const pfill = $('#pfill'), ticks = $('#ticks');
const chList = [...new Set(mainS.map(chOf))];
chList.forEach(c => {
  const firstOf = mainS.find(s => chOf(s) === c);
  const b = document.createElement('button'); b.type = 'button';
  b.style.left = (mainS.indexOf(firstOf) / (mainS.length - 1) * 100) + '%';
  b.setAttribute('aria-label', CHAPTERS[c]); b.title = CHAPTERS[c];
  b.dataset.ch = c; b.addEventListener('click', () => go(firstOf));
  ticks.appendChild(b);
});

const LIGHT = ['paper', 'sand'];
function setTheme(t) { body.dataset.theme = t; }
function activate(s) {
  s.classList.add('is-active');
  void s.offsetWidth;
  const enter = () => {
    if (s.classList.contains('is-in') || !s.classList.contains('is-active') || (s.id === 's0' && introOn)) return;
    s.classList.add('is-in'); runCounts(s); onEnter[s.id]?.();
  };
  requestAnimationFrame(enter); setTimeout(enter, 120);
  if (s.id === 's0') coverIn();
}
function deactivate(s) {
  s.getAnimations?.().forEach(a => a.cancel());
  const was = s.classList.contains('is-in');
  s.classList.remove('is-active', 'is-in');
  s.style.zIndex = '';
  resetCounts(s);
  if (was) onLeave[s.id]?.();
}
function chrome(s) {
  const isApx = s.classList.contains('apx');
  stage.classList.toggle('in-apx', isApx);
  stage.classList.toggle('on-cover', s.id === 's0');
  $('#chap').textContent = s.id === 's0' ? '' : CHAPTERS[chOf(s)];
  const cnt = $('#count');
  if (isApx) {
    const i = apxS.indexOf(s);
    cnt.innerHTML = `<b>A${i + 1}</b><span>/${apxS.length}</span>`;
    pfill.style.transform = 'scaleX(1)';
    $('#prevBtn').disabled = i === 0; $('#nextBtn').disabled = i === apxS.length - 1;
  } else {
    const i = mainS.indexOf(s), c = chOf(s);
    cnt.innerHTML = `<b>${pad(i + 1)}</b><span>/${pad(mainS.length)}</span>`;
    pfill.style.transform = `scaleX(${i / (mainS.length - 1)})`;
    [...ticks.children].forEach(b => { b.classList.toggle('done', +b.dataset.ch <= c); b.classList.toggle('cur', +b.dataset.ch === c); });
    $('#prevBtn').disabled = i === 0; $('#nextBtn').disabled = i === mainS.length - 1;
  }
  cornerArrow(s);
  $$('#menu ol button').forEach(b => b.classList.toggle('cur', b.dataset.id === s.id));
  if (np.classList.contains('open')) fillNotes(s);
  try { history.replaceState(null, '', '#' + s.id); } catch (e) {}
}

// chama fn uma única vez: no fim da animação ou, se o navegador pausar animações, pelo relógio
function after(anim, ms, fn) {
  let ok = false; const run = () => { if (ok) return; ok = true; fn(); };
  if (anim) anim.onfinish = run;
  setTimeout(run, ms);
}
// estado final garantido: só a tela atual ativa
function settle() {
  slides.forEach(s => { if (s !== cur && s.classList.contains('is-active')) deactivate(s); });
  if (cur && !cur.classList.contains('is-active')) activate(cur);
  if (cur) { cur.style.zIndex = ''; cur.getAnimations?.().forEach(a => { if (a.effect?.getKeyframes?.().some(k => k.clipPath || k.transform)) a.cancel(); }); setTheme(cur.dataset.theme); }
  busy = false;
}
function show(next, dir) {
  if (!next || next === cur) return;
  if (busy && performance.now() - busyT < 1400) return;
  if (busy) settle();
  const prev = cur; cur = next;
  slides.forEach(s => { if (s !== prev && s !== next && s.classList.contains('is-active')) deactivate(s); });
  chrome(next);
  if (!prev || RM) {
    if (prev) deactivate(prev);
    setTheme(next.dataset.theme); activate(next);
    return;
  }
  busy = true; busyT = performance.now();
  const ez = 'cubic-bezier(.77,0,.18,1)';
  next.style.zIndex = 5;
  setTheme(next.dataset.theme); activate(next);

  // arco: a plataforma nasce de um arco no centro da página
  if (next.dataset.iris && dir > 0) {
    const W = stage.offsetWidth, H = stage.offsetHeight, w = 300, side = (W - w) / 2;
    const a = next.animate([{ clipPath: `inset(${H * .45}px ${side}px 0px ${side}px round ${w / 2}px ${w / 2}px 0px 0px)` }, { clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)' }], { duration: 1500, easing: 'cubic-bezier(.7,0,.2,1)' });
    prev.animate([{ opacity: 1 }, { opacity: .35 }], { duration: 1500, fill: 'forwards' });
    after(a, 1750, settle);
    return;
  }
  // salto pelo índice ou pelo apoio: troca suave
  if (dir === 0) {
    const a = next.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 750, easing: 'cubic-bezier(.16,.84,.24,1)' });
    after(a, 950, settle);
    return;
  }
  // página de outra cor: sobe como uma lâmina
  if (!(LIGHT.includes(prev.dataset.theme) && LIGHT.includes(next.dataset.theme)) && prev.dataset.theme !== next.dataset.theme) {
    const a = next.animate([{ clipPath: dir > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 1050, easing: ez });
    prev.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-dir * 70}px)` }], { duration: 1050, easing: ez, fill: 'forwards' });
    after(a, 1300, settle);
    return;
  }
  // mesma família: a nova página desliza por cima, como uma folha virada
  const sh = dir > 0 ? '-36px 0 60px -34px' : '36px 0 60px -34px';
  const a = next.animate([{ transform: `translateX(${dir * 100}%)`, boxShadow: `${sh} rgba(15,31,61,.45)` }, { transform: 'translateX(0)', boxShadow: `${sh} rgba(15,31,61,0)` }], { duration: 950, easing: ez });
  prev.animate([{ transform: 'translateX(0)', filter: 'brightness(1)' }, { transform: `translateX(${-dir * 16}%)`, filter: 'brightness(.93)' }], { duration: 950, easing: ez, fill: 'forwards' });
  after(a, 1200, settle);
}

function go(target, dir) {
  if (typeof target === 'string') target = document.getElementById(target);
  if (!target) return;
  if (mobile) {
    if (target.classList.contains('apx')) html.classList.add('show-apx');
    target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    return;
  }
  const fromApx = cur && cur.classList.contains('apx'), toApx = target.classList.contains('apx');
  if (toApx && cur && !fromApx) returnTo = cur;
  if (dir === undefined) {
    if (fromApx !== toApx) dir = 0;
    else {
      const list = toApx ? apxS : mainS;
      dir = list.indexOf(target) >= list.indexOf(cur) ? 1 : -1;
    }
  }
  show(target, dir);
}
function step(d) {
  if (!cur) return;
  const list = cur.classList.contains('apx') ? apxS : mainS;
  const i = list.indexOf(cur) + d;
  if (i >= 0 && i < list.length) go(list[i], d);
}
const back = () => go(returnTo || mainS[0], 0);

$('#prevBtn').addEventListener('click', () => step(-1));
$('#nextBtn').addEventListener('click', () => step(1));
$('#backBtn').addEventListener('click', back);
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]'); if (!g) return;
  e.preventDefault(); closeMenu(); go(g.dataset.goto);
});

/* ---------------------------------------------------------------------
   Capa: trailer de abertura (uma vez por sessão do navegador)
   --------------------------------------------------------------------- */
const intro = $('#intro');
let introOn = false, introTimers = [];
function coverIn() {
  if (introOn) return;
  if (store.sget('gal-intro') || RM || mobile) { intro.classList.add('done'); return; }
  store.sset('gal-intro', '1');
  introOn = true; intro.classList.remove('done');
  $('#s0').classList.remove('is-in');
  const words = $$('.word', intro), line = $('.line', intro), bar = $('.ibar i', intro), bgs = $$('.ibg img', intro);
  const T = 640, total = words.length * T + 2700;
  bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: total, fill: 'forwards' });
  words.forEach((w, i) => {
    introTimers.push(setTimeout(() => { w.classList.add('on'); bgs.forEach(b => b.classList.toggle('on', +b.dataset.w === i)); }, 250 + i * T));
    introTimers.push(setTimeout(() => { w.classList.remove('on'); w.classList.add('off'); }, 250 + (i + 1) * T));
  });
  introTimers.push(setTimeout(() => bgs.forEach(b => b.classList.remove('on')), 250 + words.length * T));
  introTimers.push(setTimeout(() => line.classList.add('on'), 350 + words.length * T));
  introTimers.push(setTimeout(endIntro, total + 300));
}
function endIntro() {
  if (!introOn) return;
  introOn = false; introTimers.forEach(clearTimeout); introTimers = [];
  intro.classList.add('done');
  const s0 = $('#s0');
  setTimeout(() => { if (cur === s0) { s0.classList.add('is-in'); runCounts(s0); } }, 200);
}
$('.skip', intro).addEventListener('click', e => { e.stopPropagation(); endIntro(); });
intro.addEventListener('click', endIntro);

/* ---------------------------------------------------------------------
   Teclado, roda e toque
   --------------------------------------------------------------------- */
document.addEventListener('keydown', e => {
  if (introOn) { if (!e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); endIntro(); } return; }
  if (lb.classList.contains('open')) {
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowRight') lbStep(1);
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'Tab') trap(e, lb);
    return;
  }
  if (menu.classList.contains('open')) {
    if (e.key === 'Escape' || e.key === 'm' || e.key === 'M') { e.preventDefault(); closeMenu(); }
    else if (e.key === 'Tab') trap(e, menu);
    return;
  }
  const t = e.target, typing = t.matches?.('input,textarea,select');
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case 'ArrowDown':
      if (typing) return; e.preventDefault(); step(1); break;
    case ' ':
      if (t.matches?.('button,a,input')) return; e.preventDefault(); step(1); break;
    case 'ArrowLeft': case 'PageUp': case 'ArrowUp':
      if (typing) return; e.preventDefault(); step(-1); break;
    case 'Home': e.preventDefault(); go(cur?.classList.contains('apx') ? apxS[0] : mainS[0], -1); break;
    case 'End': e.preventDefault(); go(cur?.classList.contains('apx') ? apxS[apxS.length - 1] : mainS[mainS.length - 1], 1); break;
    case 'Escape': if (np.classList.contains('open')) np.classList.remove('open'); else if (cur?.classList.contains('apx')) back(); break;
    case 'm': case 'M': e.preventDefault(); openMenu(); break;
    case 'n': case 'N': toggleNotes(); break;
    case 'f': case 'F': if (!document.fullscreenElement) html.requestFullscreen?.().catch(() => {}); else document.exitFullscreen?.(); break;
  }
});
if (!mobile) {
  let wAcc = 0, wLast = 0;
  addEventListener('wheel', e => {
    if (introOn || lb.classList.contains('open') || menu.classList.contains('open')) return;
    if (e.target.closest?.('.ex,input')) return;
    const now = performance.now();
    if (now - wLast > 260) wAcc = 0;
    wAcc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(wAcc) > 70 && now - wLast > 950) { step(wAcc > 0 ? 1 : -1); wAcc = 0; wLast = now; }
    else if (now - wLast <= 950) wLast = Math.max(wLast, now - 900);
  }, { passive: true });
  let tx = 0, ty = 0, tt = 0;
  stage.addEventListener('touchstart', e => { const p = e.changedTouches[0]; tx = p.clientX; ty = p.clientY; tt = Date.now(); }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (e.target.closest('.ex,input')) return;
    const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
    if (Date.now() - tt < 800 && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
  }, { passive: true });
}

function trap(e, root) {
  const f = $$('button,a[href],input,[tabindex]:not([tabindex="-1"])', root).filter(x => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------------------------------------------------------------------
   Menu de capítulos
   --------------------------------------------------------------------- */
const menu = $('#menu');
let menuFocus = null;
(function buildMenu() {
  const cols = [$('#menuA'), $('#menuB')];
  [...new Set(slides.map(chOf))].forEach(c => {
    const col = cols[c <= 3 ? 0 : 1];
    const h = document.createElement('h3'); h.textContent = CHAPTERS[c]; col.appendChild(h);
    const ol = document.createElement('ol');
    slides.filter(s => chOf(s) === c).forEach(s => {
      const li = document.createElement('li'), b = document.createElement('button');
      const isApx = s.classList.contains('apx');
      b.type = 'button'; b.dataset.id = s.id;
      b.innerHTML = `<span class="t">${s.dataset.title}</span><span class="ld" aria-hidden="true"></span><span class="n">${isApx ? 'A' + (apxS.indexOf(s) + 1) : pad(mainS.indexOf(s) + 1)}</span>`;
      b.addEventListener('click', () => { closeMenu(); go(s); });
      li.appendChild(b); ol.appendChild(li);
    });
    col.appendChild(ol);
  });
})();
function openMenu() { menuFocus = document.activeElement; menu.classList.add('open'); setTimeout(() => ($('#menu ol button.cur') || $('#menu ol button'))?.focus(), 60); }
function closeMenu() { if (!menu.classList.contains('open')) return; menu.classList.remove('open'); menuFocus?.focus?.(); }
$('#menuBtn').addEventListener('click', openMenu);
$('#menuClose').addEventListener('click', closeMenu);
menu.addEventListener('click', e => { if (e.target === menu || e.target.classList.contains('mc')) closeMenu(); });

/* ---------------------------------------------------------------------
   Lightbox
   --------------------------------------------------------------------- */
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
let lbList = [], lbI = 0, lbFocus = null;
function lbRender() {
  const el = lbList[lbI], [t, d] = (el.dataset.caption || '').split('|');
  lbImg.classList.remove('ld');
  lbImg.onload = () => requestAnimationFrame(() => lbImg.classList.add('ld'));
  lbImg.src = el.dataset.zoom;
  lbImg.alt = el.querySelector('img')?.alt || t || '';
  lbCap.innerHTML = (t ? `<small>${t}</small>` : '') + (d || '');
  $('#lbCount').textContent = lbList.length > 1 ? `${lbI + 1} / ${lbList.length}` : '';
  $('#lbPrev').style.display = $('#lbNext').style.display = lbList.length > 1 ? '' : 'none';
}
function openLb(el) {
  const g = el.dataset.gallery;
  lbList = g ? $$(`[data-zoom][data-gallery="${g}"]`) : [el];
  lbI = Math.max(0, lbList.indexOf(el));
  lbFocus = document.activeElement;
  lbRender(); lb.classList.add('open');
  setTimeout(() => $('#lbClose').focus(), 50);
}
function closeLb() { lb.classList.remove('open'); lbFocus?.focus?.(); }
function lbStep(d) { lbI = (lbI + d + lbList.length) % lbList.length; lbRender(); }
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', () => lbStep(-1));
$('#lbNext').addEventListener('click', () => lbStep(1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
document.addEventListener('click', e => {
  const z = e.target.closest('[data-zoom]'); if (!z) return;
  e.preventDefault(); e.stopPropagation(); openLb(z);
}, true);
$$('[data-zoom]').forEach(z => z.setAttribute('aria-label', 'Ampliar imagem: ' + ((z.dataset.caption || '').split('|')[0] || z.querySelector('img')?.alt || '')));
$$('.zi').forEach(z => { z.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9"/></svg>'; });

/* ---------------------------------------------------------------------
   Notas da apresentadora (tecla N) e copiar e-mail
   --------------------------------------------------------------------- */
const np = $('#np');
function fillNotes(s) {
  const n = $('.notes', s);
  np.innerHTML = `<h5>Notas · ${s.dataset.title}</h5>` + (n ? n.innerHTML : '<p>Sem notas para esta tela.</p>');
}
function toggleNotes() { if (!cur) return; fillNotes(cur); np.classList.toggle('open'); }
const toast = $('#toast');
document.addEventListener('click', e => {
  const c = e.target.closest('[data-copy]'); if (!c) return;
  const done = () => { toast.textContent = 'Copiado: ' + c.dataset.copy; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 1800); };
  if (navigator.clipboard) navigator.clipboard.writeText(c.dataset.copy).then(done, done); else done();
});

/* ---------------------------------------------------------------------
   Seta discreta no canto inferior direito: avança uma tela
   --------------------------------------------------------------------- */
const cnext = $('#cnext');
cnext.addEventListener('click', () => step(1));
function cornerArrow(s) {
  const list = s.classList.contains('apx') ? apxS : mainS;
  cnext.hidden = list.indexOf(s) === list.length - 1;
}

addEventListener('resize', fit);

/* ---------------------------------------------------------------------
   Celular: rolagem vertical com entrada por interseção
   --------------------------------------------------------------------- */
if (mobile) {
  intro.classList.add('done');
  setTheme('paper');
  const enter = s => {
    if (!s.classList.contains('is-in')) { s.classList.add('is-active', 'is-in'); runCounts(s); onEnter[s.id]?.(); }
    cur = s; $('#chap').textContent = CHAPTERS[chOf(s)];
  };
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) enter(en.target); }), { threshold: .15 });
  slides.forEach(s => io.observe(s));
  // reserva para quando o navegador atrasa a interseção: mede na rolagem
  let raf = 0;
  const check = () => { raf = 0; const vh = innerHeight; slides.forEach(s => { const r = s.getBoundingClientRect(); if (r.height && r.top < vh * .85 && r.bottom > vh * .15) enter(s); }); };
  addEventListener('scroll', () => { if (!raf) raf = setTimeout(check, 60); }, { passive: true });
  setTimeout(check, 300);
  $('#apxOpen').addEventListener('click', () => { html.classList.add('show-apx'); apxS[0].scrollIntoView({ behavior: 'smooth' }); });
  // QA: ?solo=s6 mostra só uma tela
  const solo = (location.search.match(/[?&]solo=([\w-]+)/) || [])[1];
  if (solo) slides.forEach(s => { if (s.id !== solo) s.style.display = 'none'; else { s.style.display = 'block'; enter(s); } });
  const h = location.hash.slice(1), t = h && document.getElementById(h);
  if (t && !solo) { if (t.classList.contains('apx')) html.classList.add('show-apx'); setTimeout(() => { t.scrollIntoView(); check(); }, 60); }
  return;
}

/* ---------------------------------------------------------------------
   Início
   --------------------------------------------------------------------- */
const start = document.getElementById(location.hash.slice(1));
const first = start && start.classList.contains('slide') ? start : mainS[0];
if (first !== mainS[0]) store.sset('gal-intro', '1');
show(first, 1);
addEventListener('hashchange', () => { const t = document.getElementById(location.hash.slice(1)); if (t && t !== cur && t.classList.contains('slide')) go(t); });
})();
