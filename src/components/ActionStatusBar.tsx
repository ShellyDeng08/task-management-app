import { useState, useContext } from 'react'
import { StoreContext } from '../utils/context'
import {Stepper, StepButton, Popover, Typography} from '@mui/material';
import Step from '@mui/material/Step';
import { IActionWithStatus, ActionStatus, ITaskRes } from '../types';
import dayjs from 'dayjs';

interface ActionStatusBarProps {
    task: ITaskRes;
}
const ActionStatusBar = ({task}: ActionStatusBarProps) => {
    const { action } = task
    const store = useContext(StoreContext);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<boolean[]>(action.map(item => item.status === ActionStatus.COMPLETED));

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openedPopoverId, setOpenedPopoverId] = useState(null);

    const handlePopoverOpen = (event: any, itemId: any) => {
        setAnchorEl(event.currentTarget);
        setOpenedPopoverId(itemId); // 设置当前打开的Popover的ID
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenedPopoverId(null); // 重置打开的Popover的ID
    };
  
    const open = Boolean(anchorEl);

    const handleStep = (stepIndex: number) => {
        const firstIncompleteStepIndex = action.findIndex((item) => item.status === ActionStatus.PENDING);
        
        if (firstIncompleteStepIndex === stepIndex) {
            task.action[stepIndex] = {
                ...task.action[stepIndex],
                status:  ActionStatus.COMPLETED,
                completedTime: dayjs().valueOf()
            }            
            setCompleted(action.map(item => item.status === ActionStatus.COMPLETED))
            store.taskStore.updateTask(task)
        }
    };

    return (
        <div style={{marginTop: 50}}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {action.map((item: IActionWithStatus, index: number) => (
                <Step key={index} completed={completed[index]}>
                    <Typography sx={{
                        position: 'absolute', top: '-30px', left: '40%'
                    }}>{item.completedTime ? dayjs(item.completedTime).format('YYYY-MM-DD') : 'pending'}</Typography>
                    <StepButton 
                        aria-owns={openedPopoverId === item.id ? `mouse-over-popover-${item.id}` : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(e) => handlePopoverOpen(e, item.id)}
                        onMouseLeave={handlePopoverClose}
                        color="inherit" onClick={() => handleStep(index)}>
                        {item.name}
                    </StepButton>
                    {item.desc &&
                        <Popover
                            id={`mouse-over-popover-${item.id}`}
                            sx={{
                                pointerEvents: 'none',
                                maxWidth: '400px'
                            }}
                            open={openedPopoverId === item.id}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography sx={{ p: 2, minWidth: 200 }}>{item.desc}</Typography>
                        </Popover>
                    }
                    
                </Step>
                ))}
            </Stepper>
        </div>
        
    )
}

export default ActionStatusBar;