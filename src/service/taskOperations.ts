import { connectDB } from './connectDB'
import { ITask } from '../types'

export const getAllTasks = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectDB();
            const request = db
            .transaction(["tasks"], 'readonly')
            .objectStore("tasks")
            .getAll()
            request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result)
            request.onerror = () => reject('Error when get data from DB, please try again')
        } catch (e) {
            reject('Error connecting to the database');
        }
    });
};

export const addTask = async (task: ITask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectDB();
            const transaction = db.transaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks')
            store.add(task);

            transaction.oncomplete = () => resolve('Task added successfully');
            transaction.onerror = () => reject('Error when add data from DB, please try again');
        } catch (e) {
            reject('Error connecting to the database');
        }
    });
};

export const deleteTask = async (taskId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectDB();
            const request = db.transaction(['tasks'], 'readwrite').objectStore('tasks').delete(taskId)

            request.onsuccess = () => resolve('Task delete successfully');
            request.onerror = () => reject('Error when delete data from DB, please try again');
        } catch (e) {
            reject('Error connecting to the database');
        }
    });
}

export const updateTask = async (task: ITask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectDB();
            const store = db.transaction(['tasks'], 'readwrite').objectStore('tasks')
            const request = store.get(task.id)

            request.onsuccess = (e) => {
                const updateRequest = store.put(task)
                updateRequest.onsuccess = () => resolve('Task update successfully');
                updateRequest.onerror = () => reject('Task update failed')
                
            }
            request.onerror = () => reject('Task update failed');
        } catch (e) {
            reject('Error connecting to the database');
        }
    });
}


