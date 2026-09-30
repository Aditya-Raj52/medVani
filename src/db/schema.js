// src/db/schema.js

const DB_NAME = 'medvani_local_db';
const DB_VERSION = 2;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Object Store 1: Emergency Profile (Medical ID)
      if (!db.objectStoreNames.contains('medical_id')) {
        db.createObjectStore('medical_id', { keyPath: 'id' });
      }

      // Object Store 2: Saved OCR Scans & Medicines
      if (!db.objectStoreNames.contains('scanned_prescriptions')) {
        db.createObjectStore('scanned_prescriptions', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const saveMedicalID = async (profileData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('medical_id', 'readwrite');
    const store = tx.objectStore('medical_id');
    store.put({ id: 'user_profile', ...profileData, updatedAt: new Date().toISOString() });
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
};

export const getMedicalID = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('medical_id', 'readonly');
    const store = tx.objectStore('medical_id');
    const request = store.get('user_profile');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const saveScanResult = async (scanData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('scanned_prescriptions', 'readwrite');
    const store = tx.objectStore('scanned_prescriptions');
    const entry = {
      id: 'scan_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      ...scanData
    };
    store.put(entry);
    tx.oncomplete = () => resolve(entry);
    tx.onerror = (e) => reject(e.target.error);
  });
};

export const getSavedScans = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('scanned_prescriptions', 'readonly');
    const store = tx.objectStore('scanned_prescriptions');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = (e) => reject(e.target.error);
  });
};