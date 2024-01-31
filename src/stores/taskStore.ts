import { makeAutoObservable } from 'mobx'
import { ITask, ITaskRes } from '../types'
import { getAllTasks, addTask, updateTask, deleteTask } from '../service/taskOperations'
class TaskStore {
    tasks: ITaskRes[] = []
    constructor() {
        makeAutoObservable(this)
        this.getAllTasks()
    }

    async getAllTasks() {
        const data = await getAllTasks()
        this.tasks = data as ITaskRes[];
    }

    async addTask(task: ITask) {
        const newTask = await addTask(task)
        this.tasks.push(newTask as ITaskRes)
        return newTask;
    }

    async updateTask(task: ITaskRes) {
        return await updateTask(task)
    }
}
  
const taskStore = new TaskStore();

export default taskStore