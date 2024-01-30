import taskStore from './taskStore';
import userStore from './userStore';

class RootStore {
    taskStore: typeof taskStore;
    userStore: typeof userStore
    constructor() {
        this.taskStore = taskStore;
        this.userStore = userStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
