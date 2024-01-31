import { makeAutoObservable } from "mobx";
import { IUser } from '../types'

const userList: IUser[] = [
    {
        name: 'John',
        avatar: '',
        id: "1"
    },
    {
        name: 'Tonny',
        avatar: '',
        id: "2"
    },
    {
        name: 'Stella',
        avatar: '',
        id: "3"
    },
    {
        name: 'Jasse',
        avatar: '',
        id: "4"
    },
    {
        name: 'Tomas',
        avatar: '',
        id: "5"
    },
]

class UserStore {
    userList: Array<IUser> = []
    constructor() {
        makeAutoObservable(this)
        this.userList = userList
    }

    async getUserList() {
        return userList
    }
}
  
const userStore = new UserStore();

export default userStore