const logoPath = "./WhatsApp Image 2026-06-14 at 20.25.09 (2).jpeg";

const navItems = [
  ["home", "Beranda", "home"],
  ["akseptor", "Akseptor", "users"],
  ["jadwal", "Jadwal", "calendar"],
  ["laporan", "Laporan", "file"],
  ["pengaturan", "Pengaturan", "settings"],
];

const sideItems = [
  ...navItems.slice(0, 3),
  ["kunjungan", "Kunjungan", "calendar-check"],
  ["terlambat", "Terlambat Kontrol", "clock"],
  ["implan", "Ganti Implan/IUD", "iud"],
  ["reminder", "Reminder", "send"],
  ...navItems.slice(3),
];

const stats = [
  ["users", "245", "Akseptor Aktif"],
  ["calendar", "18", "Jadwal Hari Ini"],
  ["clock", "7", "Terlambat Kontrol"],
  ["iud", "4", "Ganti Implan/IUD"],
];

const patients = [
  ["09.00", "Siti Aisyah", "0812 3456 7890", "Suntik 3 Bulan F3", "Kontrol Ulang", "27 Jun 2026", "(H-7)", ""],
  ["10.30", "Dewi Kartika", "0821 2345 6789", "Implant", "Jatuh Tempo", "25 Jun 2026", "(H-5)", ""],
  ["11.30", "Lina Marlina", "0831 1111 2222", "Suntik 1 Bulan", "Kontrol Ulang", "22 Jun 2026", "(H-2)", "hair"],
  ["13.00", "Rika Apriyani", "0856 2222 3333", "Suntik 2 Bulan", "Kontrol Ulang", "30 Jun 2026", "(H-10)", ""],
  ["14.30", "Yeni Astuti", "0822 2333 4444", "Suntik 3 Bulan Depo", "Kontrol Ulang", "20 Jun 2026", "(Hari Ini)", ""],
  ["15.30", "Nur Hasanah", "0813 4567 8901", "IUD", "Kontrol Rutin", "23 Jun 2026", "(H-3)", "hair"],
];

const icons = {
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-5"/>',
  "calendar-check": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m8 15 2.5 2.5L16 12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M20 20l2 2"/>',
  iud: '<path d="M7 4c0 4 2 7 5 7s5-3 5-7"/><path d="M12 11v9"/><path d="M9 20h6"/><path d="M5 5c2 0 2 2 2 4M19 5c-2 0-2 2-2 4"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V21a2 2 0 1 1-4 0v-.09a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H3a2 2 0 1 1 0-4h.09a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.8 1.8 0 0 0 2 .36h.01A1.8 1.8 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.8 1.8 0 0 0-.36 2v.01A1.8 1.8 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09a1.8 1.8 0 0 0-1.51 1Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  filter: '<path d="M22 3H2l8 9v7l4 2v-9Z"/>',
  sort: '<path d="M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.58 2.6a2 2 0 0 1-.45 2.11L8 9.67a16 16 0 0 0 6.33 6.33l1.24-1.24a2 2 0 0 1 2.11-.45c.83.26 1.7.46 2.6.58A2 2 0 0 1 22 16.92Z"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M8.5 8.5c.5 3 2.1 4.7 5 5l1-1.1"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9 12h6"/>',
  cloud: '<path d="M17.5 19H8a6 6 0 1 1 1-11.9 7 7 0 0 1 13 3.9A4 4 0 0 1 17.5 19Z"/><path d="M12 12v6M9 15l3-3 3 3"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
};

let current = "home";

function icon(name, small = false) {
  return `<span class="${small ? "small-icon" : ""}" data-icon="${name}"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.home}</svg></span>`;
}

function hydrateStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((slot) => {
    if (slot.querySelector("svg")) return;
    const name = slot.dataset.icon;
    slot.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.home}</svg>`;
  });
}

function statCards(extra = "") {
  return `<div class="stats-grid ${extra}">${stats
    .map(([ic, value, label]) => `<article class="card stat-card">${icon(ic)}<div><b>${value}</b><span>${label}</span></div></article>`)
    .join("")}</div>`;
}

function avatar(type = "") {
  return `<div class="avatar ${type}" aria-hidden="true"></div>`;
}

function appointmentRows(limit = patients.length) {
  return patients
    .slice(0, limit)
    .map(
      (p) => `<div class="appointment-row">
        <div class="time-pill">${p[0]}</div>
        ${avatar(p[7])}
        <div><div class="name">${p[1]}</div><div class="sub">${p[3]}</div></div>
        <span class="tag">${p[4]}</span>
        <div class="date-cell">${p[5]}<br />${p[6]}</div>
        <div class="row-actions">${icon("phone", true)}${icon("calendar", true)}${icon("chevron", true)}</div>
      </div>`
    )
    .join("");
}

function navMarkup(items, side = false) {
  return items
    .map(([id, label, ic]) => {
      const active = id === current || (current === "home" && id === "home");
      return `<button class="nav-item ${active ? "active" : ""}" data-route="${id}" type="button">${icon(ic, true)}<span>${label}</span></button>`;
    })
    .join("");
}

function renderNav() {
  document.querySelector(".bottom-nav").innerHTML = navMarkup(navItems);
  document.querySelector(".side-nav").innerHTML = navMarkup(sideItems, true);
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const route = button.dataset.route;
      current = navItems.some(([id]) => id === route) ? route : route === "kunjungan" ? "jadwal" : "akseptor";
      render();
    });
  });
}

function homeView() {
  return `
    <section class="hero-dashboard">
      <div class="welcome"><p>Selamat datang kembali, Bidan Shabrina <strong>&hearts;</strong></p></div>
      <div class="midwife-illustration" aria-hidden="true">
        <div class="flower"></div><div class="person midwife"></div><div class="person patient"></div><div class="clipboard"></div>
      </div>
    </section>
    ${statCards()}
    <section class="card quick-actions">
      ${[
        ["plus", "Tambah<br />Akseptor"],
        ["calendar", "Jadwal<br />Kunjungan"],
        ["send", "Kirim<br />Reminder"],
        ["users", "Daftar<br />Akseptor"],
        ["file", "Laporan"],
        ["settings", "Pengaturan"],
      ]
        .map(([ic, label]) => `<button class="quick-action" type="button"><span class="icon-halo">${icon(ic)}</span><span>${label}</span></button>`)
        .join("")}
    </section>
    <section class="card section-card">
      <div class="section-title"><div class="left-title">${icon("calendar", true)}<h2>Jadwal Hari Ini</h2></div><button class="link-button">Lihat Semua ${icon("chevron", true)}</button></div>
      <div class="appointment-list">${appointmentRows(5)}</div>
    </section>
    <section class="dashboard-bottom">
      <article class="card section-card">
        <div class="section-title"><div class="left-title">${icon("send", true)}<h2>Reminder Terkirim</h2></div><button class="link-button">Lihat Semua</button></div>
        <div class="mini-metric"><div>${icon("send")}<div class="big-number">25</div><h2>Reminder<br />Hari Ini</h2></div><div><div class="donut"><b>92%</b></div><h2>Berhasil<br />Terkirim</h2></div></div>
      </article>
      <article class="card section-card">
        <div class="section-title"><div class="left-title">${icon("clock", true)}<h2>Pasien Terlambat</h2></div><button class="link-button">Lihat Semua</button></div>
        <div class="two-patient-row">${avatar()}<div><div class="name">Siti Rohmah</div><div class="sub">Suntik 3 Bulan F3<br /><span class="tag">Terlambat 5 hari</span></div></div><span class="icon-halo">${icon("phone", true)}</span></div>
        <div class="two-patient-row">${avatar("hair")}<div><div class="name">Nur Hasanah</div><div class="sub">IUD<br /><span class="tag">Terlambat 7 hari</span></div></div><span class="icon-halo">${icon("phone", true)}</span></div>
      </article>
    </section>`;
}

function akseptorView() {
  return `
    <div class="page-head"><div class="page-title"><h2>Akseptor</h2><p>Kelola data akseptor KB aktif</p></div><button class="primary-button">${icon("plus", true)}Tambah Akseptor</button></div>
    <div class="toolbar"><label class="searchbox">${icon("search", true)}<input placeholder="Cari nama / no. WA / jenis KB..." /></label><button class="ghost-button">${icon("filter", true)}Filter</button></div>
    ${statCards()}
    <section class="card section-card">
      <h2>Filter Jenis KB</h2>
      <div class="chips">${["Semua", "Suntik 1 Bulan", "Suntik 2 Bulan", "Suntik 3 Bulan F3", "Suntik 3 Bulan Depo", "IUD", "Implant"].map((x, i) => `<button class="chip ${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div>
      <div class="patient-list">${patients
        .map(
          (p) => `<div class="patient-row">${avatar(p[7])}<div><div class="name">${p[1]}</div><div class="sub">${p[2]}<br />${p[3]}</div></div><div class="date-cell"><span class="tag">${p[4]}</span><br />${p[5]}<br />${p[6]}</div>${icon("chevron", true)}</div>`
        )
        .join("")}</div>
    </section>`;
}

function jadwalView() {
  return `
    <div class="page-head"><div class="page-title"><h2>Jadwal Kunjungan dan Kontrol</h2><p>Kelola jadwal kunjungan akseptor KB</p></div><button class="select-button">${icon("calendar", true)}Sabtu, 20 Juni 2026 ${icon("chevron", true)}</button></div>
    <div class="calendar-strip">${["Sen|15", "Sel|16", "Rab|17", "Kam|18", "Jum|19", "Sab|20", "Min|21"].map((d, i) => { const [day, num] = d.split("|"); return `<button class="day-chip ${i === 5 ? "active" : ""}"><span>${day}</span><b>${num}</b></button>`; }).join("")}</div>
    <div class="chips">${["Semua (18)", "Kontrol Ulang (10)", "Ganti Implan/IUD (4)", "Lainnya (4)"].map((x, i) => `<button class="chip ${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div>
    <div class="toolbar"><label class="searchbox">${icon("search", true)}<input placeholder="Cari nama / no. WA / jenis KB..." /></label><button class="ghost-button">${icon("filter", true)}Filter</button><button class="ghost-button">${icon("sort", true)}Urutkan</button></div>
    <section class="card section-card"><div class="appointment-list">${appointmentRows()}</div></section>
    ${statCards("soft-stats")}
    <section class="card section-card">
      <div class="section-title"><div class="left-title">${icon("clock", true)}<h2>Jadwal Mendatang</h2></div><button class="link-button">Lihat Semua ${icon("chevron", true)}</button></div>
      <div class="upcoming-strip">${patients.slice(0, 3).map((p, i) => `<div class="upcoming-card"><div>${i === 0 ? "21 Jun 2026<br />Minggu" : i === 1 ? "21 Jun 2026<br />Minggu" : "22 Jun 2026<br />Senin"}</div>${avatar(p[7])}<div><b>${p[1]}</b><br />${p[3]}<br /><span class="tag">${p[4]}</span></div></div>`).join("")}<button class="primary-button">${icon("chevron", true)}</button></div>
    </section>`;
}

function laporanView() {
  const rows = [
    ["Suntik 1 Bulan", 45, 4, 2, 0, "22%"],
    ["Suntik 2 Bulan", 40, 3, 1, 0, "17%"],
    ["Suntik 3 Bulan F3", 70, 5, 2, 0, "28%"],
    ["Suntik 3 Bulan Depo", 30, 2, 1, 0, "11%"],
    ["IUD", 35, 2, 1, 2, "11%"],
    ["Implant", 25, 2, 0, 2, "11%"],
  ];
  return `
    <div class="page-head"><div class="page-title"><h2>Laporan</h2><p>Ringkasan data pelayanan KB</p></div><div><button class="select-button">${icon("calendar", true)}20 Juni 2026 - 20 Juni 2026</button> <button class="primary-button">${icon("download", true)}Unduh Laporan</button></div></div>
    ${statCards("soft-stats")}
    <section class="report-grid">
      <article class="card report-panel"><h3>Ringkasan Periode</h3><p>20 Juni 2026 - 20 Juni 2026</p><div class="summary-list">${stats.map((s) => `<div><span><i class="dot"></i>${s[2].replace("Jadwal Hari Ini", "Kunjungan")}</span><b>${s[1]}</b></div>`).join("")}</div></article>
      <article class="card report-panel"><h3>Kunjungan per Jenis KB</h3><div class="donut-chart"><div class="multi-donut"></div><div class="legend">${rows.map((r, i) => `<span><i class="dot" style="background:${["#f061a7", "#8657ca", "#9f82db", "#ff9c55", "#82d4ba", "#68aee0"][i]}"></i>${r[0]} &nbsp; ${r[2]} (${r[5]})</span>`).join("")}</div></div></article>
      <article class="card report-panel"><h3>Tren Kunjungan (per Minggu)</h3>${lineChart([23, 29, 37, 42, 18], ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"])}</article>
    </section>
    <section class="tables-two">
      ${smallTable("Akseptor Terlambat Kontrol", [["Siti Rohmah", "Suntik 3 Bulan F3", "5 hari"], ["Dewi Kartika", "Implant", "5 hari"], ["Nur Hasanah", "IUD", "7 hari"], ["Lina Marlina", "Suntik 1 Bulan", "2 hari"], ["Rika Apriyani", "Suntik 2 Bulan", "1 hari"]], "7 Akseptor")}
      ${smallTable("Akan Jatuh Tempo (7 Hari ke Depan)", [["Dewi Kartika", "Implant", "25 Jun 2026"], ["Rika Apriyani", "Suntik 2 Bulan", "21 Jun 2026"], ["Ratna Sari", "IUD", "23 Jun 2026"], ["Siti Aisyah", "Suntik 3 Bulan F3", "27 Jun 2026"], ["Yeni Astuti", "Suntik 3 Bulan Depo", "20 Jun 2026"]], "5 Akseptor")}
    </section>
    <section class="card section-card"><h2>Ringkasan Kunjungan per Jenis KB</h2><table class="progress-table"><thead><tr><th>Jenis KB</th><th>Akseptor Aktif</th><th>Kunjungan</th><th>Terlambat Kontrol</th><th>Ganti Implan/IUD</th><th>Persentase Kunjungan</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><div class="bar"><i style="width:${r[5]}"></i></div> ${r[5]}</td></tr>`).join("")}</tbody><tfoot><tr><td>Total</td><td>245</td><td>18</td><td>7</td><td>4</td><td>100%</td></tr></tfoot></table></section>
    <section class="card report-panel"><h3>Tren Akseptor Aktif (per Bulan)</h3>${lineChart([190, 205, 215, 220, 230, 245], ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "Mei 2026", "Jun 2026"], 300)}</section>`;
}

function smallTable(title, rows, total) {
  return `<article class="card section-card table-card"><div class="section-title"><h3>${title}</h3><button class="link-button">Lihat Semua</button></div><table><thead><tr><th>No</th><th>Nama Akseptor</th><th>Jenis KB</th><th>${title.includes("Tempo") ? "Jatuh Tempo" : "Terlambat"}</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody><tfoot><tr><td colspan="3">Total</td><td>${total}</td></tr></tfoot></table></article>`;
}

function lineChart(values, labels, max = 50) {
  const width = 520;
  const height = 190;
  const points = values.map((v, i) => {
    const x = 34 + (i * (width - 68)) / (values.length - 1);
    const y = height - 26 - (v / max) * (height - 55);
    return [x, y, v];
  });
  const path = points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${path} L${points.at(-1)[0]},${height - 24} L${points[0][0]},${height - 24} Z`;
  return `<svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik tren">
    <defs><linearGradient id="pinkFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f12682" stop-opacity=".28"/><stop offset="1" stop-color="#f12682" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#pinkFill)"/><path d="${path}" stroke="#e81372" stroke-width="3" fill="none"/>
    ${points.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#e81372"/><text x="${p[0]}" y="${p[1] - 12}" text-anchor="middle" font-weight="800">${p[2]}</text>`).join("")}
    ${labels.map((l, i) => `<text x="${points[i][0]}" y="${height - 4}" text-anchor="middle" font-size="11">${l}</text>`).join("")}
  </svg>`;
}

function pengaturanView() {
  const settings = [
    ["bell", "Pengaturan Notifikasi", "Atur preferensi notifikasi dan pengingat"],
    ["whatsapp", "Pengaturan WhatsApp", "Atur pesan otomatis, template, dan nomor WhatsApp"],
    ["calendar", "Pengaturan Jadwal", "Atur jam layanan, hari kerja, dan waktu pengingat"],
    ["shield", "Privasi & Keamanan", "Atur keamanan akun dan data aplikasi"],
  ];
  return `
    <div class="page-title"><h2>Pengaturan</h2><p>Kelola preferensi dan pengaturan aplikasi</p></div>
    <section class="settings-layout">
      <article class="card profile-card"><div class="profile-avatar"></div><div><h3>Shabrina Nur Islami, S.Tr.Keb.,Bdn.,CPHCT</h3><span class="tag">Pemilik PMB</span><div class="contact-lines"><span>${icon("phone", true)}0812 3456 7890</span><span>${icon("file", true)}shabrina.pmb@gmail.com</span><span>${icon("home", true)}PMB Shabrina Nur Islami<br />Jl. Kesehatan No. 12, Jakarta Timur</span></div></div><button class="ghost-button">${icon("edit", true)}Edit Profil</button></article>
      <article class="card settings-list">${settings.map((s) => `<div class="settings-row"><span class="icon-halo">${icon(s[0])}</span><div><div class="name">${s[1]}</div><div class="sub">${s[2]}</div></div>${icon("chevron", true)}</div>`).join("")}</article>
      <article class="card automation"><div class="automation-head"><div><h2>Pengaturan Pengingat Otomatis</h2><p>Pilih waktu pengiriman pengingat ke akseptor</p></div><button class="ghost-button">${icon("clock", true)}Atur Otomatis</button></div>${["H-7 (7 hari sebelum jadwal)", "H-3 (3 hari sebelum jadwal)", "H-1 (1 hari sebelum jadwal)", "Hari H (Hari jadwal kontrol)"].map((label, i) => `<div class="automation-item"><span class="check">&#10003;</span><span>${label}</span><select><option>${i === 2 ? "09:00" : i === 3 ? "07:00" : "08:00"}</option></select><span class="switch"></span></div>`).join("")}</article>
      <article class="card settings-list"><div class="settings-row"><span class="icon-halo">${icon("cloud")}</span><div><div class="name">Backup & Restore Data</div><div class="sub">Cadangkan atau pulihkan data aplikasi</div></div>${icon("chevron", true)}</div><div class="settings-row"><span class="icon-halo">${icon("info")}</span><div><div class="name">Tentang Aplikasi</div><div class="sub">Informasi versi aplikasi dan kebijakan privasi</div></div>${icon("chevron", true)}</div></article>
      <article class="card settings-row danger"><span class="icon-halo">${icon("logout")}</span><div><div class="name">Keluar Akun</div><div class="sub">Keluar dari aplikasi dan akun Anda</div></div><button class="ghost-button">${icon("logout", true)}Keluar</button></article>
    </section>`;
}

function render() {
  const views = { home: homeView, akseptor: akseptorView, jadwal: jadwalView, laporan: laporanView, pengaturan: pengaturanView };
  document.querySelector("#view").innerHTML = (views[current] || homeView)();
  document.body.dataset.page = current;
  renderNav();
}

render();
hydrateStaticIcons();
