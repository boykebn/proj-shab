import { APP_SCHEMA_VERSION, defaultPatient, defaultReminderState, defaultSettings } from "./schema.js";

function cleanString(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeReminder(reminder = {}, index = 0) {
  return {
    id: cleanString(reminder.id, `auto-${index + 1}`),
    label: cleanString(reminder.label, `Pengingat ${index + 1}`),
    time: cleanString(reminder.time, "08:00"),
    enabled: Boolean(reminder.enabled)
  };
}

function normalizeReminderLog(log = {}, index = 0) {
  return {
    id: cleanString(log.id, `log-${index + 1}`),
    patientId: cleanString(log.patientId),
    patientName: cleanString(log.patientName),
    phone: cleanString(log.phone),
    message: cleanString(log.message),
    sentAt: cleanString(log.sentAt),
    status: cleanString(log.status, "Terkirim")
  };
}

export function normalizePatient(patient = {}, index = 0) {
  return {
    ...defaultPatient,
    ...patient,
    id: cleanString(patient.id, `patient-${index + 1}`),
    name: cleanString(patient.name),
    phone: cleanString(patient.phone),
    kbType: cleanString(patient.kbType),
    status: cleanString(patient.status, defaultPatient.status),
    serviceDate: cleanString(patient.serviceDate),
    nextControlDate: cleanString(patient.nextControlDate),
    time: cleanString(patient.time, defaultPatient.time),
    avatar: cleanString(patient.avatar, defaultPatient.avatar),
    spouseName: cleanString(patient.spouseName),
    address: cleanString(patient.address),
    methodNote: cleanString(patient.methodNote)
  };
}

export function normalizeDb(db = {}) {
  const settings = {
    ...defaultSettings,
    ...(db.settings || {})
  };

  settings.reminders = Array.isArray(settings.reminders)
    ? settings.reminders.map(normalizeReminder)
    : [];

  return {
    meta: {
      schemaVersion: APP_SCHEMA_VERSION,
      updatedAt: cleanString(db.meta?.updatedAt, new Date().toISOString())
    },
    patients: Array.isArray(db.patients) ? db.patients.map(normalizePatient) : [],
    settings,
    reminders: {
      ...defaultReminderState,
      ...(db.reminders || {}),
      logs: Array.isArray(db.reminders?.logs) ? db.reminders.logs.map(normalizeReminderLog) : []
    }
  };
}

export function withUpdatedMeta(db) {
  return {
    ...db,
    meta: {
      ...(db.meta || {}),
      schemaVersion: APP_SCHEMA_VERSION,
      updatedAt: new Date().toISOString()
    }
  };
}
