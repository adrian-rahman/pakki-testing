/* PAKKI prototype - shared behaviour
   Setiap blok hanya aktif kalau elemennya ada di halaman. */
(function () {
  "use strict";

  /* ---------- Mobile drawer ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('backdrop');
  var closeBtn = document.getElementById('drawer-close');

  if (burger && drawer) {
    function openNav() {
      document.body.classList.add('nav-open');
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.hidden = false;
      var first = drawer.querySelector('a, summary, button');
      if (first) first.focus({ preventScroll: true });
    }
    function closeNav() {
      document.body.classList.remove('nav-open');
      drawer.setAttribute('inert', '');
      drawer.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus({ preventScroll: true });
      if (backdrop) setTimeout(function () { backdrop.hidden = true; }, 260);
    }
    burger.addEventListener('click', openNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    if (backdrop) backdrop.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && document.body.classList.contains('nav-open')) closeNav();
    });
  }

  /* ---------- Close desktop dropdowns on outside click ---------- */
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-dd[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  /* ---------- Member verification ---------- */
  var MEMBERS = {
    'PAKKI-2019-00417': {
      name: 'dr. Anisa Prameswari, M.K.K.K.',
      initials: 'AP',
      role: 'Ahli Kesehatan Kerja Madya',
      na: 'PAKKI-2019-00417',
      nik: '3174••••••••0012',
      region: 'DPD DKI Jakarta',
      status: 'Aktif',
      valid: '31 Desember 2027',
      note: 'Iuran tahun 2026 terverifikasi.'
    },
    'PAKKI-2023-01104': {
      name: 'Ns. Rina Kartika, S.Kep., M.K.K.K.',
      initials: 'RK',
      role: 'Ahli Kesehatan Kerja Muda',
      na: 'PAKKI-2023-01104',
      nik: '3578••••••••0041',
      region: 'DPD Jawa Timur',
      status: 'Tidak aktif',
      valid: '31 Desember 2025',
      note: 'Iuran tahun 2026 belum diterima.'
    }
  };
  var NIK_MAP = { '3174015205900001': 'PAKKI-2019-00417' };

  var form = document.getElementById('check-form');
  if (form) {
    var mode = 'na';
    var tabs = [].slice.call(document.querySelectorAll('.tab'));
    var input = document.getElementById('check-input');
    var msg = document.getElementById('check-msg');
    var btn = document.getElementById('check-btn');
    var result = document.getElementById('check-result');
    var btnHTML = btn.innerHTML;

    var setMode = function (next) {
      mode = next;
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', t.getAttribute('data-mode') === next ? 'true' : 'false');
      });
      input.value = '';
      input.placeholder = next === 'na' ? 'PAKKI-2019-00417' : '16 digit NIK';
      input.inputMode = next === 'na' ? 'text' : 'numeric';
      hideMsg();
      clearResult();
      input.focus();
    };

    var hideMsg = function () {
      msg.classList.remove('show');
      msg.textContent = '';
      input.setAttribute('aria-invalid', 'false');
    };
    var showMsg = function (text) {
      msg.textContent = text;
      msg.classList.add('show');
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    };
    var clearResult = function () {
      result.classList.remove('show');
      result.innerHTML = '';
    };
    var esc = function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };

    var renderMember = function (m) {
      var ok = m.status === 'Aktif';
      result.innerHTML =
        '<div class="result-head">' +
          '<h3>Hasil verifikasi</h3>' +
        '</div>' +
        '<figure class="kta kta-result">' +
          '<div class="kta-head">' +
            '<div class="kta-brand">' +
              '<img src="assets/logo-pakki.png" alt="">' +
              '<span><b>PAKKI</b>Kartu Tanda Anggota</span>' +
            '</div>' +
            '<span class="status ' + (ok ? 'ok' : 'warn') + '"><span class="d"></span>' + esc(m.status) + '</span>' +
          '</div>' +
          '<div class="kta-person">' +
            '<span class="avatar" aria-hidden="true">' + esc(m.initials) + '</span>' +
            '<div><div class="nm">' + esc(m.name) + '</div><div class="rl">' + esc(m.role) + '</div></div>' +
          '</div>' +
          '<div class="kta-grid">' +
            '<div class="kta-fields">' +
              '<div class="kta-field"><span>Nomor Anggota</span><b>' + esc(m.na) + '</b></div>' +
              '<div class="kta-field"><span>Wilayah</span><b>' + esc(m.region) + '</b></div>' +
              '<div class="kta-field"><span>Berlaku s.d.</span><b>' + esc(m.valid) + '</b></div>' +
            '</div>' +
            '<div class="kta-qr">' +
              '<img src="assets/qr-demo.png" alt="QR verifikasi anggota">' +
              '<span>Pindai</span>' +
            '</div>' +
          '</div>' +
          '<div class="kta-foot">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>' +
            'Diverifikasi Dewan Pengurus Pusat' +
          '</div>' +
        '</figure>' +
        '<div class="result-foot">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>' +
          '<span>NIK ' + esc(m.nik) + ' &middot; ' + esc(m.note) + ' &middot; Sumber: basis data DPP PAKKI</span>' +
        '</div>';
      result.classList.add('show');
    };

    var renderEmpty = function (q) {
      result.innerHTML =
        '<div class="result-empty">' +
          '<div class="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg></div>' +
          '<b>Data tidak ditemukan</b>' +
          '<p>Nomor <strong>' + esc(q) + '</strong> tidak terdaftar. Periksa kembali atau hubungi sekretariat DPP.</p>' +
        '</div>';
      result.classList.add('show');
    };

    var runCheck = function () {
      var q = input.value.trim();
      if (mode === 'na') {
        if (!/^PAKKI-\d{4}-\d{5}$/i.test(q)) {
          showMsg('Format Nomor Anggota: PAKKI-YYYY-##### (contoh: PAKKI-2019-00417).');
          return;
        }
      } else if (!/^\d{16}$/.test(q)) {
        showMsg('NIK harus terdiri dari 16 digit angka.');
        return;
      }
      hideMsg();
      clearResult();

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Memverifikasi…';

      setTimeout(function () {
        var member = null;
        if (mode === 'na') member = MEMBERS[q.toUpperCase()] || null;
        else {
          var na = NIK_MAP[q];
          member = na ? MEMBERS[na] : null;
        }
        if (member) renderMember(member);
        else renderEmpty(q);

        btn.disabled = false;
        btn.innerHTML = btnHTML;
      }, 750);
    };

    tabs.forEach(function (t) {
      t.addEventListener('click', function () { setMode(t.getAttribute('data-mode')); });
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); runCheck(); });

    [].slice.call(document.querySelectorAll('.chip-demo')).forEach(function (chip) {
      chip.addEventListener('click', function () {
        var v = chip.getAttribute('data-demo');
        setMode(/^\d{16}$/.test(v) ? 'nik' : 'na');
        input.value = v;
        runCheck();
      });
    });
  }

  /* ---------- Newsletter ---------- */
  var nlForm = document.getElementById('nl-form');
  if (nlForm) {
    var nlEmail = document.getElementById('nl-email');
    var nlOk = document.getElementById('nl-ok');
    var nlMsg = document.getElementById('nl-msg');
    var nlBtn = document.getElementById('nl-btn');
    var nlBtnHTML = nlBtn.innerHTML;

    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = nlEmail.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        nlEmail.setAttribute('aria-invalid', 'true');
        nlMsg.textContent = 'Masukkan alamat email yang valid, contoh: nama@perusahaan.com.';
        nlMsg.classList.add('show');
        nlEmail.focus();
        return;
      }
      nlEmail.removeAttribute('aria-invalid');
      nlMsg.classList.remove('show');
      nlBtn.disabled = true;
      nlBtn.innerHTML = 'Mengirim…';
      setTimeout(function () {
        nlForm.style.display = 'none';
        nlOk.classList.add('show');
        nlBtn.disabled = false;
        nlBtn.innerHTML = nlBtnHTML;
      }, 600);
    });
  }

  /* ---------- Article filter ---------- */
  var filters = [].slice.call(document.querySelectorAll('.filter'));
  if (filters.length) {
    var articles = [].slice.call(document.querySelectorAll('.article'));
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        var cat = f.getAttribute('data-cat');
        filters.forEach(function (o) { o.setAttribute('aria-pressed', o === f ? 'true' : 'false'); });
        articles.forEach(function (a) {
          a.hidden = !(cat === 'all' || a.getAttribute('data-cat') === cat);
        });
      });
    });
  }

  /* ---------- Sub navigation scroll spy ---------- */
  var subLinks = [].slice.call(document.querySelectorAll('.subnav a'));
  if (subLinks.length && 'IntersectionObserver' in window) {
    var targets = subLinks
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        subLinks.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-96px 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- Stat count-up ---------- */
  var statNums = [].slice.call(document.querySelectorAll('.stat-num[data-count]'));
  if (statNums.length) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var countUp = function (el, delay) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (!isFinite(target)) return;
      var out = el.querySelector('.num') || el;
      if (reduceMotion) { out.textContent = target; return; }

      var start = null;
      var duration = 300;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        out.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else out.textContent = target;
      };
      out.textContent = '0';
      setTimeout(function () { requestAnimationFrame(step); }, delay || 0);
    };

    if (!reduceMotion) {
      statNums.forEach(function (el) {
        var out = el.querySelector('.num') || el;
        out.textContent = '0';
      });
    }

    if ('IntersectionObserver' in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = statNums.indexOf(en.target);
          countUp(en.target, i > 0 ? i * 90 : 0);
          statObserver.unobserve(en.target);
        });
      }, { threshold: 0.4 });
      statNums.forEach(function (el) { statObserver.observe(el); });
    } else {
      statNums.forEach(function (el) { countUp(el, 0); });
    }
  }

  /* ---------- Year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
