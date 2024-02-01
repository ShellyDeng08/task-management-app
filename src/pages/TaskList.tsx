import { useContext } from 'react'
import {Button, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Collapse, Card, CardContent, Typography} from '@mui/material';
import CreateTask from "../components/CreateTask"
import { StoreContext } from '../utils/context'
import { observer } from 'mobx-react'
import ActionStatusBar from '../components/ActionStatusBar';
import { useState } from 'react';
import dayjs from 'dayjs'
const TaskList = observer(() => {
    const store = useContext(StoreContext);
    const { tasks } = store.taskStore
    const [open, setOpen] = useState(false)
    const handleCreateTask = () => {
        setOpen(true)
    }
    return (
        <div>
            <div style={{textAlign: 'center', margin: '2rem 0'}}>
                <Button onClick={handleCreateTask} variant='outlined' sx={{margin: 'center'}}>
                    Create Task
                </Button>
            </div>
            
            <CreateTask open={open} handleClose={() => setOpen(false)} />
            {tasks.length > 0 ? tasks.map(task => (
                <Card key={task.id}>
                    <CardContent>
                        <Typography>Title: {task.title}</Typography>
                        <Typography>Detail: {task.desc}</Typography>
                        <Typography>Owner: {task.owner}</Typography>
                        <Typography>Creator: {task.creator}</Typography>
                        <Typography>Deadline: {dayjs(task.deadline).format('YYYY-MM-DD')}</Typography>
                        <ActionStatusBar task={task} />
                    </CardContent>
                </Card>
            )): 
            <div style={{textAlign:'center'}}>
                <Typography>There are no tasks created yet. Create them now.</Typography>
            </div>}
            
            
            {/* <TableContainer>  
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Detail</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Creator</TableCell>
                        <TableCell align="right">Deadline</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <>
                                <TableRow>
                                    <TableCell align="right">{task.title}</TableCell>
                                    <TableCell align="right">{task.desc}</TableCell>
                                    <TableCell align="right">{task.owner}</TableCell>
                                    <TableCell align="right">{task.creator}</TableCell>
                                    <TableCell align="right">{dayjs(task.deadline).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <ActionStatusBar task={task} />
                                        </Collapse>
                                        
                                    </TableCell>
                                    
                                </TableRow>
                            </>
                            
                        ))}
                    </TableBody>
                </Table>
                
            </TableContainer> */}
            
        </div>
        
    )
})

export default TaskList