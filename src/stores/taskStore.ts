import { makeAutoObservable } from 'mobx'
import { ITask } from '../types'
import { getAllTasks, addTask, updateTask, deleteTask } from '../service/taskOperations'
class TaskStore {
    tasks: ITask[] = []
    constructor() {
        makeAutoObservable(this)
        this.getAllTasks()
    }

    async getAllTasks() {
        const data = await getAllTasks()
        this.tasks = data as ITask[];
    }

    async addTask(task: ITask) {
        await addTask(task)
        this.tasks.push(task)
    }

    updateTask(task: ITask) {

    }
}
  
const taskStore = new TaskStore();

export default taskStore