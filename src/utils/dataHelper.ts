import { ActionStatus, IAction, IActionWithStatus } from '../types'

export const initialActions = (actionList: IAction[]): IActionWithStatus[] => {
    return actionList.map(action => {
        if(action.id === '0') return {
            ...action,
            status: ActionStatus.COMPLETED
        }
        return {
            ...action,
            status: ActionStatus.NOT_START
        }
    })
}