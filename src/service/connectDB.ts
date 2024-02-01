

export const connectDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const dbRequest = indexedDB.open('TaskManagement', 1)
        dbRequest.onupgradeneeded = (event) => {
            const db = (event?.target as IDBOpenDBRequest).result
            db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true  });
        }
        const timeout = 3000;
        const timeoutTimer = setTimeout(() => {
            reject('Connection to DB timed out');
        }, timeout);
        dbRequest.onsuccess = (event) => {
            clearTimeout(timeoutTimer);
            resolve((event.target as IDBOpenDBRequest).result as IDBDatabase)
        }
        dbRequest.onerror = (event) => {
            clearTimeout(timeoutTimer);
            reject((event.target as IDBOpenDBRequest).error)
        }
    })
}