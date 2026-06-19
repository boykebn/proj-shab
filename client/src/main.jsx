import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./styles.css";

const navItems = [
  ["home", "Beranda", "home"],
  ["akseptor", "Akseptor", "users"],
  ["jadwal", "Jadwal", "calendar"],
  ["laporan", "Laporan", "file"],
  ["pengaturan", "Pengaturan", "settings"]
];

const sideItems = [
  ...navItems.slice(0, 3),
  ["kunjungan", "Kunjungan", "calendar-check"],
  ["terlambat", "Terlambat Kontrol", "clock"],
  ["implan", "Ganti Implan/IUD", "iud"],
  ["reminder", "Reminder", "send"],
  ...navItems.slice(3)
];

const kbTypes = ["Semua", "Suntik 1 Bulan", "Suntik 2 Bulan", "Suntik 3 Bulan F3", "Suntik 3 Bulan Depo", "IUD", "Implant"];
const emptyForm = { name: "", phone: "", kbType: "Suntik 3 Bulan F3", status: "Kontrol Ulang", nextControlDate: "2026-06-27", time: "09:00", avatar: "hijab" };

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
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'
};

function Icon({ name, small = false }) {
  return <span className={small ? "small-icon" : ""} data-icon={name} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.home}</svg>` }} />;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Request gagal");
  }
  if (response.status === 204) return null;
  return response.json();
}

function App() {
  const akseptorPageSize = 12;
  const [route, setRoute] = useState("home");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [detailPatient, setDetailPatient] = useState(null);
  const [notice, setNotice] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [akseptorPage, setAkseptorPage] = useState(1);
  const [reportRange, setReportRange] = useState(() => {
    const today = new Date(`${getTodayKey()}T00:00:00`);
    return {
      from: toDateKey(new Date(today.getFullYear(), today.getMonth(), 1)),
      to: toDateKey(new Date(today.getFullYear(), today.getMonth() + 1, 0))
    };
  });
  const [reportLoading, setReportLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("pmb-sidebar-collapsed") === "true";
    } catch {
      return false;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function load() {
    setError("");
    const bootstrap = await api("/api/bootstrap");
    setData(bootstrap);
    setLoading(false);
  }

  useEffect(() => {
    load().catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pmb-sidebar-collapsed", String(sidebarCollapsed));
    } catch {
      // ignore storage issues in local preview
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    setAkseptorPage(1);
  }, [query, typeFilter, sortAsc]);

  useEffect(() => {
    if (!data) return;
    let active = true;

    async function loadReports() {
      setReportLoading(true);
      try {
        const query = new URLSearchParams(reportRange).toString();
        const reports = await api(`/api/reports?${query}`);
        if (!active) return;
        setData((current) => ({ ...current, reports }));
      } catch (err) {
        if (!active) return;
        setError(err.message);
      } finally {
        if (active) setReportLoading(false);
      }
    }

    loadReports();
    return () => {
      active = false;
    };
  }, [reportRange.from, reportRange.to]);

  const stats = data?.stats || { activePatients: 0, todaySchedules: 0, lateControls: 0, replacements: 0 };
  const today = data?.today || getTodayKey();
  const statCards = [
    ["users", stats.activePatients, "Akseptor Aktif"],
    ["calendar", stats.todaySchedules, "Jadwal Hari Ini"],
    ["clock", stats.lateControls, "Terlambat Kontrol"],
    ["iud", stats.replacements, "Ganti Implan/IUD"]
  ];

  const filteredPatients = useMemo(() => {
    const patients = data?.patients || [];
    const q = query.trim().toLowerCase();
    return patients.filter((patient) => {
      const matchesQuery = !q || [patient.name, patient.phone, patient.kbType].some((value) => value.toLowerCase().includes(q));
      const matchesType = typeFilter === "Semua" || patient.kbType === typeFilter;
      return matchesQuery && matchesType;
    }).sort((a, b) => sortAsc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time));
  }, [data, query, typeFilter, sortAsc]);

  async function submitPatient(event) {
    event.preventDefault();
    if (editingPatientId) {
      await api(`/api/patients/${editingPatientId}`, { method: "PATCH", body: JSON.stringify(form) });
    } else {
      await api("/api/patients", { method: "POST", body: JSON.stringify(form) });
    }
    setForm(emptyForm);
    setEditingPatientId(null);
    setShowForm(false);
    await load();
    setRoute("akseptor");
  }

  async function deletePatient(id) {
    if (!confirm("Hapus data akseptor ini?")) return;
    await api(`/api/patients/${id}`, { method: "DELETE" });
    await load();
  }

  async function sendReminder(patientIds = null) {
    const reminders = await api("/api/reminders/send-today", { method: "POST", body: JSON.stringify({ patientIds }) });
    setData((current) => ({ ...current, reminders }));
    setNotice({ title: "Reminder terkirim", body: patientIds?.length ? `Reminder dikirim ke ${patientIds.length} akseptor.` : "Reminder massal dikirim ke target 7 hari ke depan." });
  }

  async function updatePatient(id, patch) {
    await api(`/api/patients/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
    await load();
  }

  function openCreateForm() {
    setEditingPatientId(null);
    setForm({ ...emptyForm, nextControlDate: data?.today || getTodayKey() });
    setShowForm(true);
  }

  function openEditForm(patient) {
    setEditingPatientId(patient.id);
    setForm({
      name: patient.name,
      phone: patient.phone,
      kbType: patient.kbType,
      status: patient.status,
      nextControlDate: patient.nextControlDate,
      time: patient.time,
      avatar: patient.avatar || "hijab"
    });
    setShowForm(true);
  }

  function downloadReportCsv(range = reportRange) {
    const query = new URLSearchParams(range).toString();
    window.open(`/api/reports/patients.csv?${query}`, "_blank");
    setNotice({ title: "Laporan dibuat", body: `CSV laporan periode ${range.from} s.d. ${range.to} sedang dibuka/diunduh dari backend.` });
  }

  async function restoreBackup(file) {
    if (!file) return;
    const text = await file.text();
    const imported = await api("/api/import", { method: "POST", body: text });
    setData(imported);
    setNotice({ title: "Restore berhasil", body: "Data dummy dari file backup JSON berhasil dimuat kembali." });
  }

  async function updateReminder(id, patch) {
    const updated = await api(`/api/settings/reminders/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
    setData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        reminders: current.settings.reminders.map((item) => (item.id === id ? updated : item))
      }
    }));
  }

  async function updateProfile(event) {
    event.preventDefault();
    const settings = await api("/api/settings/profile", { method: "PATCH", body: JSON.stringify(profileForm) });
    setData((current) => ({ ...current, settings }));
    setShowProfileForm(false);
    setNotice({ title: "Profil diperbarui", body: "Data profil PMB dummy sudah disimpan ke backend lokal." });
  }

  function openProfileForm() {
    setProfileForm(data.settings);
    setShowProfileForm(true);
  }

  function downloadBackup() {
    window.open("/api/export", "_blank");
    setNotice({ title: "Backup dibuat", body: "File backup JSON dibuka/diunduh dari data dummy backend." });
  }

  function showNotifications() {
    const late = data.patients.filter((patient) => patient.isLate).length;
    const due = data.patients.filter((patient) => patient.daysUntil >= 0 && patient.daysUntil <= 7).length;
    setNotice({ title: "Notifikasi Hari Ini", body: `${late} akseptor terlambat kontrol, ${due} akseptor masuk target reminder 7 hari ke depan, dan ${data.reminders.sentToday} reminder sudah terkirim.` });
  }

  function navigate(nextRoute) {
    setRoute(nextRoute);
    setSidebarOpen(false);
  }

  if (loading) {
    return <div className="boot-screen">Memuat aplikasi PMB...</div>;
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${sidebarOpen ? "sidebar-open" : ""}`}>
      <SideNav
        route={route}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        open={sidebarOpen}
        onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="app-main">
        <Header onNotifications={showNotifications} onMenuToggle={() => setSidebarOpen((current) => !current)} />
        {error && <div className="toast error">{error}</div>}
        <section className="view" aria-live="polite">
          {route === "home" && <HomeView statCards={statCards} patients={data.patients} reminders={data.reminders} onSendReminder={sendReminder} onOpenForm={openCreateForm} onNavigate={setRoute} />}
          {route === "akseptor" && <AkseptorView statCards={statCards} patients={filteredPatients} query={query} setQuery={setQuery} typeFilter={typeFilter} setTypeFilter={setTypeFilter} sortAsc={sortAsc} setSortAsc={setSortAsc} page={akseptorPage} setPage={setAkseptorPage} pageSize={akseptorPageSize} onOpenForm={openCreateForm} onDelete={deletePatient} onEdit={openEditForm} onDetail={setDetailPatient} onNotice={setNotice} />}
          {route === "jadwal" && <JadwalView statCards={statCards} patients={filteredPatients} query={query} setQuery={setQuery} typeFilter={typeFilter} setTypeFilter={setTypeFilter} sortAsc={sortAsc} setSortAsc={setSortAsc} onNotice={setNotice} today={today} selectedDate={selectedDate || today} setSelectedDate={setSelectedDate} onUpdatePatient={updatePatient} onDetail={setDetailPatient} />}
          {route === "kunjungan" && <KunjunganView patients={data.patients} query={query} setQuery={setQuery} onUpdatePatient={updatePatient} onDetail={setDetailPatient} />}
          {route === "terlambat" && <TerlambatView patients={data.patients} onSendReminder={sendReminder} onUpdatePatient={updatePatient} onDetail={setDetailPatient} />}
          {route === "implan" && <ImplanView patients={data.patients} onUpdatePatient={updatePatient} onDetail={setDetailPatient} />}
          {route === "reminder" && <ReminderView patients={data.patients} reminders={data.reminders} settings={data.settings} onSendReminder={sendReminder} onUpdateReminder={updateReminder} />}
          {route === "laporan" && <LaporanView statCards={statCards} reports={data.reports} patients={data.patients} onNotice={setNotice} today={today} reportRange={reportRange} setReportRange={setReportRange} reportLoading={reportLoading} onDownloadCsv={downloadReportCsv} />}
          {route === "pengaturan" && <PengaturanView settings={data.settings} onUpdateReminder={updateReminder} onEditProfile={openProfileForm} onBackup={downloadBackup} onRestore={restoreBackup} onNotice={setNotice} />}
        </section>
      </main>
      <BottomNav route={route} onNavigate={navigate} />
      {showForm && <PatientForm form={form} setForm={setForm} onSubmit={submitPatient} onClose={() => setShowForm(false)} editing={Boolean(editingPatientId)} />}
      {showProfileForm && <ProfileForm form={profileForm} setForm={setProfileForm} onSubmit={updateProfile} onClose={() => setShowProfileForm(false)} />}
      {notice && <NoticeModal notice={notice} onClose={() => setNotice(null)} />}
      {detailPatient && <PatientDetail patient={detailPatient} onClose={() => setDetailPatient(null)} onEdit={() => { setDetailPatient(null); openEditForm(detailPatient); }} onSendReminder={() => sendReminder([detailPatient.id])} />}
    </div>
  );
}

function Header({ onNotifications, onMenuToggle }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-toggle" type="button" aria-label="Buka menu samping" onClick={onMenuToggle}><Icon name="home" /></button>
      <div className="brand">
        <img className="brand-logo" src="/assets/logo.jpeg" alt="Logo Praktek Mandiri Bidan" />
        <div>
          <p>PMB</p>
          <h1>Shabrina Nur Islami,<br />S.Tr.Keb.,Bdn.,CPHCT</h1>
        </div>
      </div>
      <button className="icon-button notification" type="button" aria-label="Notifikasi" onClick={onNotifications}><Icon name="bell" /><i /></button>
    </header>
  );
}

function SideNav({ route, onNavigate, collapsed, open, onToggleCollapse, onClose }) {
  return (
    <>
      <button className={`sidebar-overlay ${open ? "show" : ""}`} type="button" aria-label="Tutup menu samping" onClick={onClose} />
      <aside className={`side-nav ${collapsed ? "collapsed" : ""} ${open ? "open" : ""}`} aria-label="Navigasi utama">
        <div className="side-nav-top">
          <button
            className="side-collapse-toggle"
            type="button"
            aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
            onClick={onToggleCollapse}
          >
            <span className={collapsed ? "rotate" : ""}><Icon name="chevron" small /></span>
          </button>
        </div>
        {sideItems.map(([id, label, iconName]) => (
          <NavButton
            key={id}
            active={id === route}
            label={label}
            iconName={iconName}
            onClick={() => onNavigate(id)}
          />
        ))}
      </aside>
    </>
  );
}

function BottomNav({ route, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi bawah">
      {navItems.map(([id, label, iconName]) => <NavButton key={id} active={id === route} label={label} iconName={iconName} onClick={() => onNavigate(id)} />)}
    </nav>
  );
}

function NavButton({ active, label, iconName, onClick }) {
  return <button className={`nav-item ${active ? "active" : ""}`} type="button" onClick={onClick}><Icon name={iconName} small /><span>{label}</span></button>;
}

function StatsGrid({ cards, extra = "" }) {
  return (
    <div className={`stats-grid ${extra}`}>
      {cards.map(([iconName, value, label]) => (
        <article className="card stat-card" key={label}><Icon name={iconName} /><div><b>{value}</b><span>{label}</span></div></article>
      ))}
    </div>
  );
}

function Avatar({ type = "" }) {
  return <div className={`avatar ${type === "hair" ? "hair" : type === "brown" ? "brown" : ""}`} aria-hidden="true" />;
}

function HomeView({ statCards, patients, reminders, onSendReminder, onOpenForm, onNavigate }) {
  const late = patients.filter((patient) => patient.isLate).slice(0, 2);
  return (
    <>
      <section className="hero-dashboard">
        <div className="welcome"><p>Selamat datang kembali, Bidan Shabrina <strong>&hearts;</strong></p></div>
        <div className="midwife-illustration" aria-hidden="true"><div className="flower" /><div className="person midwife" /><div className="person patient" /><div className="clipboard" /></div>
      </section>
      <StatsGrid cards={statCards} />
      <section className="card quick-actions">
        <QuickAction iconName="plus" label="Tambah Akseptor" onClick={onOpenForm} />
        <QuickAction iconName="calendar" label="Jadwal Kunjungan" onClick={() => onNavigate("jadwal")} />
        <QuickAction iconName="send" label="Kirim Reminder" onClick={() => onNavigate("reminder")} />
        <QuickAction iconName="users" label="Daftar Akseptor" onClick={() => onNavigate("akseptor")} />
        <QuickAction iconName="file" label="Laporan" onClick={() => onNavigate("laporan")} />
        <QuickAction iconName="settings" label="Pengaturan" onClick={() => onNavigate("pengaturan")} />
      </section>
      <AppointmentSection patients={patients.slice(0, 5)} title="Jadwal Hari Ini" />
      <section className="dashboard-bottom">
        <article className="card section-card">
          <div className="section-title"><div className="left-title"><Icon name="send" small /><h2>Reminder Terkirim</h2></div><button className="link-button" onClick={() => onSendReminder()}>Kirim Satu</button></div>
          <div className="mini-metric"><div><Icon name="send" /><div className="big-number">{reminders.sentToday}</div><h2>Reminder<br />Hari Ini</h2></div><div><div className="donut"><b>{reminders.successRate}%</b></div><h2>Berhasil<br />Terkirim</h2></div></div>
        </article>
        <article className="card section-card">
          <div className="section-title"><div className="left-title"><Icon name="clock" small /><h2>Pasien Terlambat</h2></div><button className="link-button" onClick={() => onNavigate("terlambat")}>Lihat Semua</button></div>
          {late.length ? late.map((patient) => <PatientMini key={patient.id} patient={patient} />) : <p className="empty">Tidak ada pasien terlambat.</p>}
        </article>
      </section>
    </>
  );
}

function QuickAction({ iconName, label, onClick }) {
  return <button className="quick-action" type="button" onClick={onClick}><span className="icon-halo"><Icon name={iconName} /></span><span>{label}</span></button>;
}

function AppointmentSection({ patients, title = "Jadwal Hari Ini", onSeeAll, onUpdatePatient, onDetail }) {
  return (
    <section className="card section-card">
      <div className="section-title"><div className="left-title"><Icon name="calendar" small /><h2>{title}</h2></div><button className="link-button" onClick={onSeeAll}>Lihat Semua <Icon name="chevron" small /></button></div>
      <div className="appointment-list">
        {patients.map((patient) => <AppointmentRow key={patient.id} patient={patient} onUpdatePatient={onUpdatePatient} onDetail={onDetail} />)}
      </div>
    </section>
  );
}

function AppointmentRow({ patient, onUpdatePatient, onDetail }) {
  async function reschedule() {
    const nextControlDate = prompt("Tanggal kontrol baru (YYYY-MM-DD)", patient.nextControlDate);
    if (!nextControlDate) return;
    const time = prompt("Jam kontrol baru (HH:MM)", patient.time) || patient.time;
    await onUpdatePatient?.(patient.id, { nextControlDate, time, status: "Kontrol Ulang" });
  }

  return (
    <div className="appointment-row">
      <div className="time-pill">{patient.time.replace(":", ".")}</div>
      <Avatar type={patient.avatar} />
      <div><div className="name">{patient.name}</div><div className="sub">{patient.kbType}</div></div>
      <span className="tag">{patient.status}</span>
      <div className="date-cell">{formatDate(patient.nextControlDate)}<br />{patient.relativeLabel}</div>
      <div className="row-actions"><a href={`https://wa.me/62${patient.phone.replace(/\D/g, "").replace(/^0/, "")}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${patient.name}`}><Icon name="phone" small /></a><button className="icon-link" onClick={reschedule}><Icon name="calendar" small /></button><button className="icon-link" onClick={() => onDetail?.(patient)}><Icon name="chevron" small /></button></div>
    </div>
  );
}

function AkseptorView({ statCards, patients, query, setQuery, typeFilter, setTypeFilter, sortAsc, setSortAsc, page, setPage, pageSize, onOpenForm, onDelete, onEdit, onDetail, onNotice }) {
  const totalPages = Math.max(1, Math.ceil(patients.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visiblePatients = patients.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className="page-head"><div className="page-title"><h2>Akseptor</h2><p>Kelola data akseptor KB aktif</p></div><button className="primary-button" onClick={onOpenForm}><Icon name="plus" small />Tambah Akseptor</button></div>
      <Toolbar query={query} setQuery={setQuery} onFilter={() => onNotice({ title: "Filter aktif", body: `Filter jenis KB saat ini: ${typeFilter}. Gunakan chip di bawah untuk mengganti kategori.` })} sortAsc={sortAsc} setSortAsc={setSortAsc} />
      <StatsGrid cards={statCards} />
      <section className="card section-card">
        <div className="section-title pagination-head">
          <h2>Filter Jenis KB</h2>
          <span className="pagination-summary">Menampilkan {patients.length ? startIndex + 1 : 0}-{Math.min(startIndex + pageSize, patients.length)} dari {patients.length} data</span>
        </div>
        <Chips active={typeFilter} onChange={setTypeFilter} />
        <div className="patient-list">{visiblePatients.map((patient) => <PatientRow key={patient.id} patient={patient} onDelete={onDelete} onEdit={onEdit} onDetail={onDetail} />)}</div>
        {!patients.length && <p className="empty">Tidak ada data yang cocok.</p>}
        {patients.length > pageSize && (
          <div className="pagination-bar">
            <button className="ghost-button compact-action" type="button" onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              <span className="chevron-left"><Icon name="chevron" small /></span>Sebelumnya
            </button>
            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map((pageNumber) => (
                <button key={pageNumber} className={`page-chip ${pageNumber === currentPage ? "active" : ""}`} type="button" onClick={() => setPage(pageNumber)}>{pageNumber}</button>
              ))}
            </div>
            <button className="ghost-button compact-action" type="button" onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              Berikutnya<Icon name="chevron" small />
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function PatientRow({ patient, onDelete, onEdit, onDetail }) {
  return (
    <div className="patient-row">
      <Avatar type={patient.avatar} />
      <div><div className="name">{patient.name}</div><div className="sub">{patient.phone}<br />{patient.kbType}</div></div>
      <div className="date-cell patient-info-meta">
        <span className="tag">{patient.status}</span>
        <span className="patient-date-line">{formatDate(patient.nextControlDate)}</span>
        <span className="patient-note-line">{patient.relativeLabel}</span>
      </div>
      <div className="row-actions row-actions-stack"><button className="link-button" onClick={() => onDetail(patient)}>Detail</button><button className="link-button" onClick={() => onEdit(patient)}>Edit</button><button className="link-button danger-link" onClick={() => onDelete(patient.id)}>Hapus</button></div>
    </div>
  );
}

function JadwalView({ statCards, patients, query, setQuery, typeFilter, setTypeFilter, sortAsc, setSortAsc, onNotice, today, selectedDate, setSelectedDate, onUpdatePatient, onDetail }) {
  const days = getCalendarWeek(today);
  const todayLabel = formatLongDate(today);
  const visiblePatients = patients.filter((patient) => patient.nextControlDate === selectedDate);
  return (
    <>
      <div className="page-head"><div className="page-title"><h2>Jadwal Kunjungan dan Kontrol</h2><p>Kelola jadwal kunjungan akseptor KB</p></div><button className="select-button" onClick={() => onNotice({ title: "Tanggal hari ini", body: `Kalender aktif mengikuti tanggal hari ini: ${todayLabel}.` })}><Icon name="calendar" small />{todayLabel} <Icon name="chevron" small /></button></div>
      <div className="calendar-strip">{days.map((day) => <button key={day.key} className={`day-chip ${day.key === selectedDate ? "active" : ""}`} onClick={() => setSelectedDate(day.key)}><span>{day.shortDay}</span><b>{day.dayNumber}</b></button>)}</div>
      <Chips active={typeFilter} onChange={setTypeFilter} compact />
      <Toolbar query={query} setQuery={setQuery} sort onFilter={() => onNotice({ title: "Filter jadwal", body: `Kategori aktif: ${typeFilter}.` })} sortAsc={sortAsc} setSortAsc={setSortAsc} />
      <section className="card section-card"><div className="section-title"><div className="left-title"><Icon name="calendar" small /><h2>{formatLongDate(selectedDate)}</h2></div><button className="link-button" onClick={() => setSelectedDate(today)}>Hari Ini</button></div><div className="appointment-list">{visiblePatients.map((patient) => <AppointmentRow key={patient.id} patient={patient} onUpdatePatient={onUpdatePatient} onDetail={onDetail} />)}</div>{!visiblePatients.length && <p className="empty">Belum ada jadwal pada tanggal ini.</p>}</section>
      <StatsGrid cards={statCards} extra="soft-stats" />
      <AppointmentSection patients={patients.filter((patient) => patient.daysUntil >= 0).slice(0, 3)} title="Jadwal Mendatang" onUpdatePatient={onUpdatePatient} onDetail={onDetail} />
    </>
  );
}

function Toolbar({ query, setQuery, sort = false, onFilter, sortAsc, setSortAsc }) {
  return (
    <div className="toolbar">
      <label className="searchbox"><Icon name="search" small /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama / no. WA / jenis KB..." /></label>
      <button className="ghost-button" onClick={onFilter || (() => setQuery(""))}><Icon name="filter" small />Filter</button>
      {sort && <button className="ghost-button" onClick={() => setSortAsc(!sortAsc)}><Icon name="sort" small />{sortAsc ? "Terlama" : "Terbaru"}</button>}
    </div>
  );
}

function Chips({ active, onChange, compact = false }) {
  const list = compact ? ["Semua", "Kontrol Ulang", "Implant", "IUD"] : kbTypes;
  return <div className="chips">{list.map((type) => <button key={type} className={`chip ${active === type ? "active" : ""}`} onClick={() => onChange(type)}>{type}</button>)}</div>;
}

function KunjunganView({ patients, query, setQuery, onUpdatePatient, onDetail }) {
  const visits = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients
      .filter((patient) => patient.daysUntil >= 0)
      .filter((patient) => !q || [patient.name, patient.phone, patient.kbType].some((value) => value.toLowerCase().includes(q)))
      .sort((a, b) => a.daysUntil - b.daysUntil || a.time.localeCompare(b.time));
  }, [patients, query]);

  return (
    <>
      <div className="page-head">
        <div className="page-title"><h2>Kunjungan</h2><p>Daftar kunjungan dan kontrol yang akan datang</p></div>
        <button className="select-button"><Icon name="calendar-check" small />{visits.length} kunjungan aktif</button>
      </div>
      <Toolbar query={query} setQuery={setQuery} onFilter={() => setQuery("")} />
      <section className="card section-card">
        <div className="section-title"><div className="left-title"><Icon name="calendar-check" small /><h2>Jadwal Kunjungan</h2></div><button className="link-button" onClick={() => window.print()}>Cetak</button></div>
        <div className="appointment-list">{visits.map((patient) => <AppointmentRow key={patient.id} patient={patient} onUpdatePatient={onUpdatePatient} onDetail={onDetail} />)}</div>
        {!visits.length && <p className="empty">Belum ada jadwal kunjungan yang cocok.</p>}
      </section>
    </>
  );
}

function TerlambatView({ patients, onSendReminder, onUpdatePatient, onDetail }) {
  const late = patients.filter((patient) => patient.isLate).sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <>
      <div className="page-head">
        <div className="page-title"><h2>Terlambat Kontrol</h2><p>Akseptor yang melewati jadwal kontrol</p></div>
        <button className="primary-button" onClick={() => onSendReminder(late.map((patient) => patient.id))}><Icon name="send" small />Kirim Reminder Massal</button>
      </div>
      <section className="dashboard-bottom">
        <article className="card stat-card"><Icon name="clock" /><div><b>{late.length}</b><span>Total Terlambat</span></div></article>
        <article className="card stat-card"><Icon name="phone" /><div><b>{late.length}</b><span>Siap Dihubungi</span></div></article>
      </section>
      <section className="card section-card">
        <div className="section-title"><div className="left-title"><Icon name="clock" small /><h2>Daftar Pasien Terlambat</h2></div></div>
        <div className="patient-list">{late.map((patient) => <PatientAlertRow key={patient.id} patient={patient} actionLabel="Hubungi" onSendReminder={onSendReminder} onUpdatePatient={onUpdatePatient} onDetail={onDetail} />)}</div>
        {!late.length && <p className="empty">Tidak ada pasien terlambat saat ini.</p>}
      </section>
    </>
  );
}

function ImplanView({ patients, onUpdatePatient, onDetail }) {
  const replacements = patients.filter((patient) => ["Implant", "IUD"].includes(patient.kbType));
  const dueSoon = replacements.filter((patient) => patient.daysUntil <= 7);

  return (
    <>
      <div className="page-head">
        <div className="page-title"><h2>Ganti Implan/IUD</h2><p>Pantau akseptor Implant dan IUD yang perlu tindakan lanjutan</p></div>
        <button className="select-button" onClick={() => dueSoon[0] && onDetail(dueSoon[0])}><Icon name="iud" small />{dueSoon.length} prioritas minggu ini</button>
      </div>
      <section className="dashboard-bottom">
        <article className="card stat-card"><Icon name="iud" /><div><b>{replacements.length}</b><span>Total Implant/IUD</span></div></article>
        <article className="card stat-card"><Icon name="calendar" /><div><b>{dueSoon.length}</b><span>Jatuh Tempo Dekat</span></div></article>
      </section>
      <section className="card section-card">
        <div className="section-title"><div className="left-title"><Icon name="iud" small /><h2>Daftar Ganti Implan/IUD</h2></div></div>
        <div className="patient-list">{replacements.map((patient) => <PatientAlertRow key={patient.id} patient={patient} actionLabel="Jadwalkan" onUpdatePatient={onUpdatePatient} onDetail={onDetail} />)}</div>
        {!replacements.length && <p className="empty">Belum ada data Implant/IUD.</p>}
      </section>
    </>
  );
}

function ReminderView({ patients, reminders, settings, onSendReminder, onUpdateReminder }) {
  const duePatients = patients.filter((patient) => patient.daysUntil <= 7).sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <>
      <div className="page-head">
        <div className="page-title"><h2>Reminder</h2><p>Kirim dan atur pengingat WhatsApp untuk akseptor</p></div>
        <button className="primary-button" onClick={() => onSendReminder()}><Icon name="send" small />Kirim Reminder Hari Ini</button>
      </div>
      <section className="dashboard-bottom">
        <article className="card section-card">
          <div className="section-title"><div className="left-title"><Icon name="send" small /><h2>Status Pengiriman</h2></div></div>
          <div className="mini-metric"><div><div className="big-number">{reminders.sentToday}</div><h2>Terkirim<br />Hari Ini</h2></div><div><div className="donut"><b>{reminders.successRate}%</b></div><h2>Berhasil<br />Terkirim</h2></div></div>
        </article>
        <article className="card section-card">
          <div className="section-title"><div className="left-title"><Icon name="bell" small /><h2>Pengingat Aktif</h2></div></div>
          <div className="settings-list compact-list">
            {settings.reminders.map((reminder) => (
              <div className="reminder-line" key={reminder.id}>
                <button className={`switch ${reminder.enabled ? "" : "off"}`} onClick={() => onUpdateReminder(reminder.id, { enabled: !reminder.enabled })} aria-label="Toggle reminder" />
                <span>{reminder.label}</span>
                <select value={reminder.time} onChange={(event) => onUpdateReminder(reminder.id, { time: event.target.value })}><option>07:00</option><option>08:00</option><option>09:00</option><option>10:00</option></select>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="card section-card">
        <div className="section-title"><div className="left-title"><Icon name="clock" small /><h2>Target Reminder</h2></div><button className="link-button" onClick={() => onSendReminder()}>Tambah Terkirim</button></div>
        <div className="patient-list">{duePatients.map((patient) => <PatientAlertRow key={patient.id} patient={patient} actionLabel="Kirim WA" onSendReminder={onSendReminder} />)}</div>
        {!duePatients.length && <p className="empty">Belum ada target reminder dekat.</p>}
      </section>
      <section className="card section-card">
        <div className="section-title"><div className="left-title"><Icon name="file" small /><h2>Riwayat Reminder</h2></div></div>
        <table><thead><tr><th>Waktu</th><th>Nama</th><th>No. WA</th><th>Status</th></tr></thead><tbody>{(reminders.logs || []).slice(0, 10).map((log) => <tr key={log.id}><td>{new Date(log.sentAt).toLocaleString("id-ID")}</td><td>{log.patientName}</td><td>{log.phone}</td><td>{log.status}</td></tr>)}</tbody></table>
        {!(reminders.logs || []).length && <p className="empty">Belum ada riwayat reminder.</p>}
      </section>
    </>
  );
}

function PatientAlertRow({ patient, actionLabel, onSendReminder, onUpdatePatient, onDetail }) {
  async function reschedule() {
    const nextControlDate = prompt("Tanggal kontrol baru (YYYY-MM-DD)", patient.nextControlDate);
    if (!nextControlDate) return;
    const time = prompt("Jam kontrol baru (HH:MM)", patient.time) || patient.time;
    await onUpdatePatient?.(patient.id, { nextControlDate, time, status: "Kontrol Ulang" });
  }

  return (
    <div className="patient-row alert-row">
      <Avatar type={patient.avatar} />
      <div><div className="name">{patient.name}</div><div className="sub">{patient.phone}<br />{patient.kbType}</div></div>
      <div className="date-cell"><span className="tag">{patient.status}</span><br />{formatDate(patient.nextControlDate)}<br />{patient.relativeLabel}</div>
      <div className="alert-actions">
        {actionLabel === "Hubungi" ? (
          <a className="ghost-button compact-action" href={`https://wa.me/62${patient.phone.replace(/\D/g, "").replace(/^0/, "")}`} target="_blank" rel="noreferrer"><Icon name="phone" small />Hubungi</a>
        ) : (
          <button className="ghost-button compact-action" onClick={() => actionLabel.includes("Kirim") ? onSendReminder?.([patient.id]) : reschedule()}><Icon name={actionLabel.includes("Kirim") ? "send" : "calendar"} small />{actionLabel}</button>
        )}
        <button className="link-button" onClick={() => onDetail?.(patient)}>Detail</button>
      </div>
    </div>
  );
}

function LaporanView({ statCards, reports, patients, onNotice, today, reportRange, setReportRange, reportLoading, onDownloadCsv }) {
  const late = patients
    .filter((patient) => patient.isLate && patient.serviceDate >= reportRange.from && patient.serviceDate <= reportRange.to)
    .slice(0, 5);
  const due = patients
    .filter((patient) => patient.nextControlDate >= reportRange.from && patient.nextControlDate <= reportRange.to)
    .slice(0, 5);
  const period = reports.periodLabel || `${formatDate(today)} - ${formatDate(today)}`;
  const reportCards = [
    ["calendar-check", reports.summary?.totalVisits || 0, "Kunjungan Periode"],
    ["users", reports.summary?.kbVisits || 0, "Layanan KB"],
    ["iud", reports.summary?.iudImplantVisits || 0, "IUD/Implant"],
    ["clock", reports.summary?.lateControls || 0, "Terlambat Kontrol"]
  ];
  return (
    <>
      <div className="page-head">
        <div className="page-title"><h2>Laporan</h2><p>Ringkasan data pelayanan KB</p></div>
        <div className="report-toolbar">
          <div className="date-range-card">
            <label>
              <span>Dari</span>
              <input
                type="date"
                value={reportRange.from}
                max={reportRange.to}
                onChange={(event) => setReportRange((current) => ({ ...current, from: event.target.value }))}
              />
            </label>
            <label>
              <span>Sampai</span>
              <input
                type="date"
                value={reportRange.to}
                min={reportRange.from}
                onChange={(event) => setReportRange((current) => ({ ...current, to: event.target.value }))}
              />
            </label>
            <button
              className="select-button"
              type="button"
              onClick={() => onNotice({ title: "Periode laporan", body: `Laporan aktif untuk periode ${period}.` })}
            >
              <Icon name="calendar" small />{reportLoading ? "Memuat..." : period}
            </button>
          </div>
          <button className="ghost-button" onClick={() => window.print()}><Icon name="file" small />Cetak</button>
          <button className="primary-button" onClick={() => onDownloadCsv(reportRange)}><Icon name="download" small />Unduh CSV</button>
        </div>
      </div>
      <StatsGrid cards={reportCards} extra="soft-stats" />
      <section className="report-grid">
        <article className="card report-panel"><h3>Ringkasan Periode</h3><p>{period}</p><div className="summary-list">{reportCards.map((card) => <div key={card[2]}><span><i className="dot" />{card[2]}</span><b>{card[1]}</b></div>)}</div></article>
        <article className="card report-panel"><h3>Kunjungan per Jenis KB</h3><DonutReport rows={reports.byType} /></article>
        <article className="card report-panel"><h3>Tren Kunjungan (per Minggu)</h3><LineChart values={reports.weeklyTrend} labels={reports.weeklyLabels || ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"]} max={Math.max(5, ...(reports.weeklyTrend || [0]))} /></article>
      </section>
      <section className="tables-two">
        <SmallTable title="Akseptor Terlambat Kontrol" rows={late.map((patient) => [patient.name, patient.kbType, patient.relativeLabel])} total={`${late.length} Akseptor`} onSeeAll={() => onNotice({ title: "Akseptor terlambat", body: `${late.length} akseptor terlambat diambil dari data kontrol saat ini.` })} />
        <SmallTable title="Akan Jatuh Tempo (7 Hari ke Depan)" rows={due.map((patient) => [patient.name, patient.kbType, formatDate(patient.nextControlDate)])} total={`${due.length} Akseptor`} onSeeAll={() => onNotice({ title: "Jatuh tempo", body: `${due.length} akseptor masuk daftar jatuh tempo dari data real saat ini.` })} />
      </section>
      <section className="card section-card"><h2>Ringkasan Kunjungan per Jenis KB</h2><table className="progress-table"><thead><tr><th>Jenis KB</th><th>Akseptor Aktif</th><th>Kunjungan</th><th>Terlambat Kontrol</th><th>Ganti Implan/IUD</th><th>Persentase Kunjungan</th></tr></thead><tbody>{reports.byType.map((row) => <tr key={row.type}><td>{row.type}</td><td>{row.active}</td><td>{row.visits}</td><td>{row.late}</td><td>{row.replacements}</td><td><div className="bar"><i style={{ width: `${Math.max(8, row.visits * 14)}%` }} /></div> {row.visits}</td></tr>)}</tbody></table></section>
      <section className="card report-panel"><h3>Tren Kunjungan (6 Bulan Terakhir)</h3><LineChart values={reports.monthlyTrend} labels={reports.monthlyLabels || ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "Mei 2026", "Jun 2026"]} max={Math.max(5, ...(reports.monthlyTrend || [0]))} /></section>
    </>
  );
}

function DonutReport({ rows }) {
  const palette = ["#f061a7", "#8657ca", "#9f82db", "#ff9c55", "#82d4ba", "#68aee0"];
  const chartRows = rows.map((row, index) => ({
    name: row.type,
    value: row.visits,
    fill: palette[index]
  }));
  const total = chartRows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="donut-chart">
      <div className="chart-box donut-box">
        <PieChart width={220} height={220}>
            <Pie
              data={chartRows}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={86}
              stroke="none"
              paddingAngle={2}
            >
              {chartRows.map((row) => <Cell key={row.name} fill={row.fill} />)}
            </Pie>
          </PieChart>
        <div className="donut-center">
          <b>{total}</b>
          <span>Total Kunjungan</span>
        </div>
      </div>
      <div className="legend">
        {chartRows.map((row) => (
          <span key={row.name}>
            <i className="dot" style={{ background: row.fill }} />
            <em>{row.name}</em>
            <strong>{row.value}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallTable({ title, rows, total, onSeeAll }) {
  return <article className="card section-card table-card"><div className="section-title"><h3>{title}</h3><button className="link-button" onClick={onSeeAll}>Lihat Semua</button></div><table><thead><tr><th>No</th><th>Nama Akseptor</th><th>Jenis KB</th><th>{title.includes("Tempo") ? "Jatuh Tempo" : "Terlambat"}</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}><td>{index + 1}</td><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody><tfoot><tr><td colSpan="3">Total</td><td>{total}</td></tr></tfoot></table></article>;
}

function LineChart({ values, labels, max = 50 }) {
  const chartData = labels.map((label, index) => ({
    label,
    value: values[index] || 0
  }));
  return (
    <div className="chart-box line-chart-wrap" role="img" aria-label="Grafik tren">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>
          <defs>
            <linearGradient id="pinkAreaFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f12682" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#f12682" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f8dce8" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6b5361" }} />
          <YAxis allowDecimals={false} domain={[0, Math.max(max, 5)]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6b5361" }} width={28} />
          <Tooltip formatter={(value) => [value, "Kunjungan"]} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#e81372"
            strokeWidth={3}
            fill="url(#pinkAreaFill)"
            dot={{ r: 4, fill: "#e81372", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#e81372" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PengaturanView({ settings, onUpdateReminder, onEditProfile, onBackup, onRestore, onNotice }) {
  const rows = [
    ["bell", "Pengaturan Notifikasi", "Atur preferensi notifikasi dan pengingat"],
    ["whatsapp", "Pengaturan WhatsApp", "Atur pesan otomatis, template, dan nomor WhatsApp"],
    ["calendar", "Pengaturan Jadwal", "Atur jam layanan, hari kerja, dan waktu pengingat"],
    ["shield", "Privasi & Keamanan", "Atur keamanan akun dan data aplikasi"]
  ];
  return (
    <><div className="page-title"><h2>Pengaturan</h2><p>Kelola preferensi dan pengaturan aplikasi</p></div>
      <section className="settings-layout">
        <article className="card profile-card"><div className="profile-avatar" /><div><h3>{settings.ownerName}</h3><span className="tag">Pemilik PMB</span><div className="contact-lines"><span><Icon name="phone" small />{settings.phone}</span><span><Icon name="file" small />{settings.email}</span><span><Icon name="home" small />{settings.clinicName}<br />{settings.address}</span></div></div><button className="ghost-button" onClick={onEditProfile}><Icon name="edit" small />Edit Profil</button></article>
        <article className="card settings-list">{rows.map((row) => <button className="settings-row settings-button" key={row[1]} onClick={() => onNotice({ title: row[1], body: `${row[2]}. Fitur dummy ini aktif sebagai panel informasi.` })}><span className="icon-halo"><Icon name={row[0]} /></span><div><div className="name">{row[1]}</div><div className="sub">{row[2]}</div></div><Icon name="chevron" small /></button>)}</article>
        <article className="card automation"><div className="automation-head"><div><h2>Pengaturan Pengingat Otomatis</h2><p>Pilih waktu pengiriman pengingat ke akseptor</p></div><button className="ghost-button" onClick={() => settings.reminders.forEach((reminder) => onUpdateReminder(reminder.id, { enabled: true }))}><Icon name="clock" small />Atur Otomatis</button></div>{settings.reminders.map((reminder) => <div className="automation-item" key={reminder.id}><button className="check" onClick={() => onUpdateReminder(reminder.id, { enabled: !reminder.enabled })}>{reminder.enabled ? "OK" : ""}</button><span>{reminder.label}</span><select value={reminder.time} onChange={(event) => onUpdateReminder(reminder.id, { time: event.target.value })}><option>07:00</option><option>08:00</option><option>09:00</option><option>10:00</option></select><button className={`switch ${reminder.enabled ? "" : "off"}`} onClick={() => onUpdateReminder(reminder.id, { enabled: !reminder.enabled })} aria-label="Toggle reminder" /></div>)}</article>
        <article className="card settings-list"><div className="settings-row backup-row"><span className="icon-halo"><Icon name="cloud" /></span><div><div className="name">Backup & Restore Data</div><div className="sub">Unduh atau pulihkan backup JSON dari backend lokal</div><div className="inline-actions"><button className="ghost-button compact-action" onClick={onBackup}>Backup</button><label className="ghost-button compact-action">Restore<input type="file" accept="application/json" hidden onChange={(event) => onRestore(event.target.files?.[0])} /></label></div></div><Icon name="chevron" small /></div><button className="settings-row settings-button" onClick={() => onNotice({ title: "Tentang Aplikasi", body: "PMB Shabrina app. Stack: React, Vite, Express, JSON storage. Semua fitur inti aktif: CRUD akseptor, jadwal ulang, reminder tercatat, laporan CSV, backup dan restore." })}><span className="icon-halo"><Icon name="info" /></span><div><div className="name">Tentang Aplikasi</div><div className="sub">Informasi versi aplikasi dan kebijakan privasi</div></div><Icon name="chevron" small /></button></article>
      </section>
    </>
  );
}

function PatientMini({ patient }) {
  return <div className="two-patient-row"><Avatar type={patient.avatar} /><div><div className="name">{patient.name}</div><div className="sub">{patient.kbType}<br /><span className="tag">{patient.relativeLabel}</span></div></div><span className="icon-halo"><Icon name="phone" small /></span></div>;
}

function PatientForm({ form, setForm, onSubmit, onClose }) {
  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
      <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="card patient-form" onSubmit={onSubmit}>
        <div className="section-title"><h2>Tambah Akseptor</h2><button className="link-button" type="button" onClick={onClose}>Tutup</button></div>
        <label>Nama<input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
        <label>No. WhatsApp<input value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></label>
        <label>Jenis KB<select value={form.kbType} onChange={(event) => update("kbType", event.target.value)}>{kbTypes.filter((type) => type !== "Semua").map((type) => <option key={type}>{type}</option>)}</select></label>
        <div className="form-grid"><label>Tanggal Kontrol<input type="date" value={form.nextControlDate} onChange={(event) => update("nextControlDate", event.target.value)} required /></label><label>Jam<input type="time" value={form.time} onChange={(event) => update("time", event.target.value)} required /></label></div>
        <label>Status<select value={form.status} onChange={(event) => update("status", event.target.value)}><option>Kontrol Ulang</option><option>Kontrol Rutin</option><option>Jatuh Tempo</option><option>Terlambat</option></select></label>
        <button className="primary-button" type="submit"><Icon name="plus" small />Simpan Akseptor</button>
      </form>
    </div>
  );
}

function ProfileForm({ form, setForm, onSubmit, onClose }) {
  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="card patient-form" onSubmit={onSubmit}>
        <div className="section-title"><h2>Edit Profil PMB</h2><button className="link-button" type="button" onClick={onClose}>Tutup</button></div>
        <label>Nama Klinik<input value={form.clinicName} onChange={(event) => update("clinicName", event.target.value)} required /></label>
        <label>Nama Pemilik<input value={form.ownerName} onChange={(event) => update("ownerName", event.target.value)} required /></label>
        <label>No. WhatsApp<input value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></label>
        <label>Alamat<input value={form.address} onChange={(event) => update("address", event.target.value)} required /></label>
        <button className="primary-button" type="submit"><Icon name="edit" small />Simpan Profil</button>
      </form>
    </div>
  );
}

function NoticeModal({ notice, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="card patient-form notice-card">
        <div className="section-title"><h2>{notice.title}</h2><button className="link-button" type="button" onClick={onClose}>Tutup</button></div>
        <p>{notice.body}</p>
        <button className="primary-button" type="button" onClick={onClose}>Mengerti</button>
      </div>
    </div>
  );
}

function PatientDetail({ patient, onClose, onEdit, onSendReminder }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="card patient-form notice-card">
        <div className="section-title"><h2>Detail Akseptor</h2><button className="link-button" type="button" onClick={onClose}>Tutup</button></div>
        <div className="detail-grid">
          <span>Nama</span><b>{patient.name}</b>
          <span>No. WhatsApp</span><b>{patient.phone}</b>
          <span>Jenis KB</span><b>{patient.kbType}</b>
          <span>Status</span><b>{patient.status}</b>
          <span>Tanggal Kontrol</span><b>{formatDate(patient.nextControlDate)}</b>
          <span>Jam</span><b>{patient.time}</b>
          <span>Keterangan</span><b>{patient.relativeLabel}</b>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onEdit}><Icon name="edit" small />Edit</button>
          <button className="primary-button" type="button" onClick={onSendReminder}><Icon name="send" small />Kirim Reminder</button>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function formatLongDate(dateString) {
  return new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function getTodayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCalendarWeek(todayKey) {
  const today = new Date(`${todayKey}T00:00:00`);
  const mondayOffset = (today.getDay() + 6) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    return {
      key,
      shortDay: new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(date),
      dayNumber: String(date.getDate())
    };
  });
}

createRoot(document.getElementById("root")).render(<App />);
