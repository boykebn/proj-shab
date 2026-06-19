import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeDb, withUpdatedMeta } from "./normalize.js";

export function createJsonStore(filePath) {
  async function read() {
    const raw = await readFile(filePath, "utf8");
    return normalizeDb(JSON.parse(raw));
  }

  async function write(db) {
    const normalized = withUpdatedMeta(normalizeDb(db));
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(normalized, null, 2));
    return normalized;
  }

  return {
    async readDb() {
      return read();
    },

    async writeDb(db) {
      return write(db);
    },

    async getBootstrap(buildBootstrap) {
      return buildBootstrap(await read());
    },

    async createPatient(patient) {
      const db = await read();
      db.patients.push(patient);
      await write(db);
      return patient;
    },

    async updatePatient(id, updater) {
      const db = await read();
      const index = db.patients.findIndex((patient) => patient.id === id);
      if (index === -1) return null;
      const nextPatient = typeof updater === "function"
        ? updater(db.patients[index])
        : { ...db.patients[index], ...updater };
      db.patients[index] = nextPatient;
      await write(db);
      return nextPatient;
    },

    async deletePatient(id) {
      const db = await read();
      const nextPatients = db.patients.filter((patient) => patient.id !== id);
      const deleted = nextPatients.length !== db.patients.length;
      db.patients = nextPatients;
      if (deleted) await write(db);
      return deleted;
    },

    async replaceDb(db) {
      return write(db);
    }
  };
}
