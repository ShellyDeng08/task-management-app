import { useContext } from 'react'
import {Button, Table, TableBody, TableCell, TableRow, TableContainer, TableHead} from '@mui/material';
import CreateTask from "../components/CreateTask"
import { StoreContext } from '../utils/context'

import { useState } from 'react';
const TaskList = () => {
    const store = useContext(StoreContext);
    const { tasks } = store.taskStore
    const [open, setOpen] = useState(false)
    const handleCreateTask = () => {
        setOpen(true)
    }
    return (
        <div>
            <h1>hello list</h1>
            <Button onClick={handleCreateTask}>
                Create Task
            </Button>
            <CreateTask open={open} handleClose={() => setOpen(false)} />
            <TableContainer>  
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Detail</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Creator</TableCell>
                        <TableCell align="right">Deadline</TableCell>
                        <TableCell align="right">Current Stage</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow>
                                <TableCell align="right">{task.title}</TableCell>
                                <TableCell align="right">{task.desc}</TableCell>
                                <TableCell align="right">{task.owner}</TableCell>
                                <TableCell align="right">{task.creator}</TableCell>
                                <TableCell align="right">{task.deadline.getDate()}</TableCell>
                                <TableCell align="right">{task.action[0].name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            </TableContainer>
            
        </div>
        
    )
}

export default TaskList