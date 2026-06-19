import express from "express";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataPath = path.join(rootDir, "data", "db.json");
const distDir = path.join(rootDir, "dist");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

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

async function readDb() {
  const raw = await readFile(dataPath, "utf8");
  const db = JSON.parse(raw);
  return normalizeDb(db);
}

async function writeDb(db) {
  await mkdir(path.dirname(dataPath), { recursive: true });
  await writeFile(dataPath, JSON.stringify(db, null, 2));
}

function normalizeDb(db) {
  return {
    patients: Array.isArray(db.patients) ? db.patients : [],
    settings: {
      clinicName: "PMB Shabrina Nur Islami",
      ownerName: "Shabrina Nur Islami, S.Tr.Keb.,Bdn.,CPHCT",
      phone: "0812 3456 7890",
      email: "shabrina.pmb@gmail.com",
      address: "Jl. Kesehatan No. 12, Jakarta Timur",
      reminders: [],
      ...(db.settings || {})
    },
    reminders: {
      sentToday: 0,
      successRate: 0,
      logs: [],
      ...(db.reminders || {})
    }
  };
}

function daysBetween(from, to) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function parseDateKey(value) {
  return new Date(`${value}T00:00:00`);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function labelMonth(date) {
  return new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(date);
}

function getMonthSpan(from, to) {
  const start = new Date(from.getFullYear(), from.getMonth(), 1);
  const end = new Date(to.getFullYear(), to.getMonth(), 1);
  const months = [];

  while (start <= end) {
    months.push(new Date(start));
    start.setMonth(start.getMonth() + 1);
  }

  return months;
}

function decoratePatient(patient) {
  const days = daysBetween(getTodayKey(), patient.nextControlDate);
  return {
    ...patient,
    daysUntil: days,
    relativeLabel: days === 0 ? "(Hari Ini)" : days > 0 ? `(H-${days})` : `Terlambat ${Math.abs(days)} hari`,
    isLate: days < 0
  };
}

function getStats(patients) {
  const decorated = patients.map(decoratePatient);
  return {
    activePatients: patients.length,
    todaySchedules: decorated.filter((patient) => patient.daysUntil === 0).length,
    lateControls: decorated.filter((patient) => patient.isLate).length,
    replacements: patients.filter((patient) => ["Implant", "IUD"].includes(patient.kbType)).length
  };
}

function getReports(patients, range = {}) {
  const types = ["Suntik 1 Bulan", "Suntik 2 Bulan", "Suntik 3 Bulan F3", "Suntik 3 Bulan Depo", "IUD", "Implant"];
  const decorated = patients.map(decoratePatient);
  const today = parseDateKey(getTodayKey());
  const defaultFrom = startOfMonth(today);
  const defaultTo = endOfMonth(today);
  const rangeFrom = range.from ? parseDateKey(range.from) : defaultFrom;
  const rangeTo = range.to ? parseDateKey(range.to) : defaultTo;
  const from = rangeFrom <= rangeTo ? rangeFrom : rangeTo;
  const to = rangeFrom <= rangeTo ? rangeTo : rangeFrom;
  const fromKey = formatDateKey(from);
  const toKey = formatDateKey(to);
  const periodRows = decorated.filter((patient) => patient.serviceDate && parseDateKey(patient.serviceDate) >= from && parseDateKey(patient.serviceDate) <= to);
  const periodLabel = `${fromKey} s.d. ${toKey}`;
  const weeklyLabels = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"];
  const weeklyTrend = [0, 0, 0, 0, 0];

  for (const patient of periodRows) {
    const weekOffset = daysBetween(fromKey, patient.serviceDate);
    const weekIndex = Math.max(0, Math.min(4, Math.floor(weekOffset / 7)));
    weeklyTrend[weekIndex] += 1;
  }

  const monthBuckets = getMonthSpan(from, to).map((date) => ({
    key: formatDateKey(date).slice(0, 7),
    label: labelMonth(date),
    count: 0
  }));

  for (const patient of periodRows) {
    if (!patient.serviceDate) continue;
    const key = patient.serviceDate.slice(0, 7);
    const bucket = monthBuckets.find((item) => item.key === key);
    if (bucket) bucket.count += 1;
  }

  const byType = types.map((type) => {
    const rows = periodRows.filter((patient) => patient.kbType === type);
    return {
      type,
      active: decorated.filter((patient) => patient.kbType === type).length,
      visits: rows.length,
      late: rows.filter((patient) => patient.isLate).length,
      replacements: ["Implant", "IUD"].includes(type) ? rows.length : 0
    };
  });

  return {
    from: fromKey,
    to: toKey,
    periodLabel,
    weeklyLabels,
    monthlyLabels: monthBuckets.map((item) => item.label),
    byType,
    weeklyTrend,
    monthlyTrend: monthBuckets.map((item) => item.count),
    summary: {
      totalVisits: periodRows.length,
      kbVisits: periodRows.filter((patient) => patient.kbType !== "IUD" && patient.kbType !== "Implant").length,
      iudImplantVisits: periodRows.filter((patient) => patient.kbType === "IUD" || patient.kbType === "Implant").length,
      lateControls: decorated.filter((patient) => patient.isLate).length
    }
  };
}

function bootstrap(db) {
  const patients = db.patients.map(decoratePatient).sort((a, b) => a.time.localeCompare(b.time));
  return {
    today: getTodayKey(),
    patients,
    settings: db.settings,
    reminders: db.reminders,
    stats: getStats(db.patients),
    reports: getReports(db.patients)
  };
}

function toCsv(rows) {
  return rows
    .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function validatePatient(input) {
  const required = ["name", "phone", "kbType", "nextControlDate", "time"];
  const missing = required.filter((key) => !String(input[key] || "").trim());
  if (missing.length) {
    return `Field wajib belum lengkap: ${missing.join(", ")}`;
  }
  return null;
}

app.get("/api/bootstrap", async (req, res, next) => {
  try {
    res.json(bootstrap(await readDb()));
  } catch (error) {
    next(error);
  }
});

app.get("/api/reports", async (req, res, next) => {
  try {
    const db = await readDb();
    const from = typeof req.query.from === "string" && /^\d{4}-\d{2}-\d{2}$/.test(req.query.from) ? req.query.from : undefined;
    const to = typeof req.query.to === "string" && /^\d{4}-\d{2}-\d{2}$/.test(req.query.to) ? req.query.to : undefined;
    res.json(getReports(db.patients, { from, to }));
  } catch (error) {
    next(error);
  }
});

app.post("/api/patients", async (req, res, next) => {
  try {
    const error = validatePatient(req.body);
    if (error) return res.status(400).json({ error });

    const db = await readDb();
    const patient = {
      id: `p-${Date.now()}`,
      name: req.body.name.trim(),
      phone: req.body.phone.trim(),
      kbType: req.body.kbType,
      status: req.body.status || "Kontrol Ulang",
      nextControlDate: req.body.nextControlDate,
      time: req.body.time,
      avatar: req.body.avatar || "hijab"
    };
    db.patients.push(patient);
    await writeDb(db);
    res.status(201).json(decoratePatient(patient));
  } catch (error) {
    next(error);
  }
});

app.patch("/api/patients/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    const index = db.patients.findIndex((patient) => patient.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Akseptor tidak ditemukan" });

    db.patients[index] = { ...db.patients[index], ...req.body };
    await writeDb(db);
    res.json(decoratePatient(db.patients[index]));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/patients/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    db.patients = db.patients.filter((patient) => patient.id !== req.params.id);
    await writeDb(db);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/reminders/send-today", async (req, res, next) => {
  try {
    const db = await readDb();
    const targets = req.body?.patientIds?.length ? db.patients.filter((patient) => req.body.patientIds.includes(patient.id)) : db.patients.filter((patient) => decoratePatient(patient).daysUntil <= 7);
    const sentCount = Math.max(1, targets.length);
    db.reminders.sentToday += sentCount;
    db.reminders.successRate = Math.min(99, db.reminders.successRate + 1);
    db.reminders.logs.unshift(...targets.map((patient) => ({
      id: `r-${Date.now()}-${patient.id}`,
      patientId: patient.id,
      patientName: patient.name,
      phone: patient.phone,
      message: req.body?.message || `Halo ${patient.name}, ini pengingat jadwal kontrol KB Anda di ${db.settings.clinicName}.`,
      sentAt: new Date().toISOString(),
      status: "Terkirim"
    })));
    db.reminders.logs = db.reminders.logs.slice(0, 100);
    await writeDb(db);
    res.json(db.reminders);
  } catch (error) {
    next(error);
  }
});

app.get("/api/reports/patients.csv", async (req, res, next) => {
  try {
    const db = await readDb();
    const from = typeof req.query.from === "string" && /^\d{4}-\d{2}-\d{2}$/.test(req.query.from) ? req.query.from : undefined;
    const to = typeof req.query.to === "string" && /^\d{4}-\d{2}-\d{2}$/.test(req.query.to) ? req.query.to : undefined;
    const filteredPatients = from && to
      ? db.patients.filter((patient) => patient.serviceDate && patient.serviceDate >= from && patient.serviceDate <= to)
      : db.patients;
    const rows = [
      ["Nama", "WhatsApp", "Jenis KB", "Status", "Tanggal Kontrol", "Jam", "Keterangan"],
      ...filteredPatients.map((patient) => {
        const decorated = decoratePatient(patient);
        return [patient.name, patient.phone, patient.kbType, patient.status, patient.nextControlDate, patient.time, decorated.relativeLabel];
      })
    ];
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=laporan-akseptor.csv");
    res.send(toCsv(rows));
  } catch (error) {
    next(error);
  }
});

app.patch("/api/settings/reminders/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    const reminder = db.settings.reminders.find((item) => item.id === req.params.id);
    if (!reminder) return res.status(404).json({ error: "Pengingat tidak ditemukan" });

    if (typeof req.body.enabled === "boolean") reminder.enabled = req.body.enabled;
    if (req.body.time) reminder.time = req.body.time;
    await writeDb(db);
    res.json(reminder);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/settings/profile", async (req, res, next) => {
  try {
    const db = await readDb();
    const allowed = ["clinicName", "ownerName", "phone", "email", "address"];
    for (const key of allowed) {
      if (typeof req.body[key] === "string") db.settings[key] = req.body[key].trim();
    }
    await writeDb(db);
    res.json(db.settings);
  } catch (error) {
    next(error);
  }
});

app.get("/api/export", async (req, res, next) => {
  try {
    const db = await readDb();
    res.setHeader("Content-Disposition", "attachment; filename=pmb-shabrina-backup.json");
    res.json(db);
  } catch (error) {
    next(error);
  }
});

app.post("/api/import", async (req, res, next) => {
  try {
    const incoming = normalizeDb(req.body);
    await writeDb(incoming);
    res.json(bootstrap(await readDb()));
  } catch (error) {
    next(error);
  }
});

app.use(express.static(distDir));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Terjadi masalah pada server" });
});

app.listen(port, () => {
  console.log(`PMB Shabrina API berjalan di http://127.0.0.1:${port}`);
});
