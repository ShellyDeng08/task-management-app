import { connectDB } from './connectDB'
import { ITask, ITaskRes } from '../types'
import { generateId } from '../utils/generateID';
const KEY = 'tasks'
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
            const data = localStorage.getItem(KEY) || '[]'
            resolve(JSON.parse(data))
        }
    });
};

export const addTask = async (task: ITask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectDB();
            const transaction = db.transaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks')
            const request = store.add(task);
            request.onsuccess = (event) => {
                const generatedKey = (event.target as IDBRequest).result
                const getRequest = store.get(generatedKey);

                getRequest.onsuccess = (event) => {
                    const taskData = (event.target as IDBRequest).result;
                    resolve(taskData); 
                };
                getRequest.onerror = () => {
                    resolve({
                        ...task,
                        id: generatedKey
                    }); 
                };
            }
            request.onerror = () => reject('Error when add data from DB, please try again');
        } catch (e) {
            const data = localStorage.getItem(KEY) || '[]';
            const parsedData = JSON.parse(data);
            const newTask = {
                ...task,
                id: generateId()
            }
            parsedData.push(newTask)
            localStorage.setItem(KEY, JSON.stringify(parsedData))
            resolve(newTask);
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

export const updateTask = async (task: ITaskRes) => {
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
            const data = localStorage.getItem(KEY) || '[]';
            const parsedData = JSON.parse(data);
            const currentIdx = parsedData.findIndex((item: ITaskRes) => item.id === task.id)
            if(currentIdx > -1) {
                parsedData[currentIdx] = task
                localStorage.setItem(KEY, JSON.stringify(parsedData))
            }
            resolve(currentIdx)
        }
    });
}


