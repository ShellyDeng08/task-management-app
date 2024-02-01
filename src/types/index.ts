export interface IAction {
    id: string;
    name: string;
    desc: string;
}

export enum ActionStatus {
    'PENDING' = 1,
    'IN_PROGRESS' = 2,
    'COMPLETED' = 3
}

export interface IActionWithStatus extends IAction {
    status: ActionStatus;
    completedTime?: number;
}

export interface ITask {
    title: string;
    desc: string;
    owner: string;
    creator: string;
    createTime: number;
    updateTime: number;
    deadline: number;
    action: IActionWithStatus[];
}

export interface ITaskRes extends ITask {
    id: number;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}

export enum TaskType {
    CREATE = 'Create',
    EDIT = 'Edit'
}
