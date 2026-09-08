// IndexedDB Helper for Muganiyaa-Mobiles Demo
// Allows storing uploaded images and blob assets locally in the browser
// without overflowing localStorage quotas.

const DB_NAME = 'MuganiyaaImageStore';
const DB_VERSION = 1;
const STORE_NAME = 'images';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImageBlob(id, fileOrBlob) {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ id, dataUrl: reader.result, updatedAt: Date.now() });
        tx.oncomplete = () => resolve(reader.result);
        tx.onerror = () => reject(tx.error);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(fileOrBlob);
    });
  } catch (err) {
    console.warn('IndexedDB write error, falling back:', err);
    return null;
  }
}

export async function getImageBlob(id) {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.dataUrl : null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
}

export async function deleteImageBlob(id) {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete error:', err);
    return false;
  }
}
