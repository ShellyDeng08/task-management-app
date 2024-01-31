import { useContext } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { observer } from 'mobx-react'
import {TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { userList, actionList } from '../utils/data'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { initialActions } from '../utils/dataHelper'
import { StoreContext } from '../utils/context'


import { ITask } from "../types";
  
interface IFormInput {
    title: string;
    desc: string;
    owner: string;
    creator: string;
    deadline: Dayjs;
}

interface CreateTaskProps {
    open: boolean;
    handleClose: () => void;
}


const CreateTask = observer((props: CreateTaskProps) => {
    const store = useContext(StoreContext);
    const { open, handleClose } = props
    const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const timestamp = data.deadline.valueOf();
        const actions = initialActions(actionList)
        await store.taskStore.addTask({
            title: data.title,
            desc: data.desc,
            creator: data.creator,
            owner: data.owner,
            createTime: dayjs().valueOf(),
            deadline: timestamp,
            action: actions,
            updateTime: 0
        })
        handleClose()
    }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={'md'}
        >
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} id="taskForm">
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Title is required' }}
                        render={({field}) => (
                            <TextField 
                                {...field} sx={{display: 'block'}} margin="normal" label="title" 
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ''} />
                        )}
                    />

                    <Controller
                        name="desc"
                        control={control}
                        render={({field}) => (
                            <TextField 
                                {...field} sx={{display: 'block'}} margin="normal" label="detail"
                                multiline rows={4}
                            />
                        )}
                    />

                    <Controller
                        name="owner"
                        control={control}
                        rules={{ required: 'Please choose a owner' }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                sx={{
                                    margin: '8px 0'
                                }}
                                id="Owner"
                                freeSolo
                                options={userList.map((option) => option.name)}
                                onChange={(_, data) => field.onChange(data)}
                                renderInput={(params) => 
                                    <TextField {...params} 
                                        label="Creator" 
                                        error={!!errors.owner}
                                        helperText={errors.owner ? errors.owner.message : ''} />}
                                
                                
                            />
                        )}
                    />  
                    <Controller
                        name="creator"
                        control={control}
                        rules={{ required: 'Please choose a creator' }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                sx={{
                                    margin: '8px 0'
                                }}
                                id="Creator"
                                freeSolo
                                options={userList.map((option) => option.name)}
                                onChange={(_, data) => field.onChange(data)}
                                renderInput={(params) => 
                                    <TextField {...params} label="Creator" 
                                        error={!!errors.creator}
                                        helperText={errors.creator ? errors.creator.message : ''} />}
                                
                            />
                        )}
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name='deadline'
                            control={control}
                            rules={{ required: 'Deadline is required' }}
                            render={({ field }) => (
                                <DatePicker
                                    label="Select Date"
                                    value={field.value}
                                    onChange={(newValue: any) => {
                                        field.onChange(newValue);
                                    }}
                                    renderInput={(params: any) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.deadline}
                                            helperText={errors.deadline ? errors.deadline.message : ''}
                                        />
                                    )}
                                />
                            )}
                         />

                    </LocalizationProvider>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button type="submit" form="taskForm" variant="contained">Create</Button>
            </DialogActions>
      </Dialog>
      )
})


export default CreateTask