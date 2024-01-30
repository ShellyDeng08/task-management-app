import { makeAutoObservable } from 'mobx'
import { ITask } from '../types'
import { getAllTasks, addTask, updateTask, deleteTask } from '../service/taskOperations'
class TaskStore {
    tasks = []
    constructor() {
        makeAutoObservable(this)
    }

    getAllTasks() {

    }

    addTask(task: ITask) {
        
    }

    updateTask(task: ITask) {

    }
}
  
const taskStore = new TaskStore();

export default taskStore