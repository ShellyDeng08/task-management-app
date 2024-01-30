const dbRequest = indexedDB.open('TaskManagement', 1)
dbRequest.onupgradeneeded = (event) => {
    const db = (event?.target as IDBOpenDBRequest).result

}

export const connectDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        dbRequest.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result as IDBDatabase)
        }
        dbRequest.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error)
        }
    })
}