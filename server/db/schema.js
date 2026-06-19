export const APP_SCHEMA_VERSION = 1;

export const defaultSettings = {
  clinicName: "PMB Shabrina Nur Islami",
  ownerName: "Shabrina Nur Islami, S.Tr.Keb.,Bdn.,CPHCT",
  phone: "0812 3456 7890",
  email: "shabrina.pmb@gmail.com",
  address: "Jl. Kesehatan No. 12, Jakarta Timur",
  reminders: []
};

export const defaultReminderState = {
  sentToday: 0,
  successRate: 0,
  logs: []
};

export const defaultPatient = {
  id: "",
  name: "",
  phone: "",
  kbType: "",
  status: "Kontrol Ulang",
  serviceDate: "",
  nextControlDate: "",
  time: "08:00",
  avatar: "hijab",
  spouseName: "",
  address: "",
  methodNote: ""
};
