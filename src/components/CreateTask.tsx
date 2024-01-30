import { useForm, SubmitHandler } from "react-hook-form"
import { observer } from 'mobx-react'
import {TextField, Autocomplete, Button} from '@mui/material';
import { userList } from '../utils/userData'
import { ITask } from "../types";

enum TaskStatusEnum {
    female = "female",
    male = "male",
    other = "other",
}
  

interface IFormInput {
    title: string;
    desc: string;
    owner: string;
    deadline: string;
}


const CreateTask = observer(() => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField required label="title" {...register('title')}/>
            <TextField label="desc" multiline maxRows={4} {...register('desc')}/>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={userList.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="freeSolo" />}
            />
          {/* <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <input type="submit" /> */}
          <Button>Create</Button>
        </form>
      )
})


export default CreateTask