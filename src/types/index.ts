export interface IAction {
    id: string;
    name: string;
}

export enum ActionStatus {
    'NOT_START' = 1,
    'IN_PROGRESS' = 2,
    'COMPLETED' = 3
}

export interface IActionWithStatus extends IAction {
    status: ActionStatus
}

export interface ITask {
    title: string;
    desc: string;
    owner: string;
    creator: string;
    createTime: number;
    updateTime: number;
    deadline: Date;
    action: IActionWithStatus[];
}

export interface ITaskRes extends ITask {
    id: string;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}
