import { useState, useContext } from 'react'
import { StoreContext } from '../utils/context'
import {Stepper, StepButton, Popover, Typography} from '@mui/material';
import Step from '@mui/material/Step';
import { IActionWithStatus, ActionStatus, ITaskRes } from '../types';

interface ActionStatusBarProps {
    task: ITaskRes;
}
const ActionStatusBar = ({task}: ActionStatusBarProps) => {
    const { action } = task
    const store = useContext(StoreContext);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<boolean[]>(action.map(item => item.status === ActionStatus.COMPLETED));

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    const handleStep = (stepIndex: number) => {
        const firstIncompleteStepIndex = action.findIndex((item) => item.status === ActionStatus.NOT_START);
        
        if (firstIncompleteStepIndex === stepIndex) {
            task.action[stepIndex].status = ActionStatus.COMPLETED;
            setCompleted(action.map(item => item.status === ActionStatus.COMPLETED))
            store.taskStore.updateTask(task)
        }
    };

    return (
        <div>
            <Stepper nonLinear activeStep={activeStep}>
                {action.map((item: IActionWithStatus, index: number) => (
                <Step key={index} completed={completed[index]}>
                    <StepButton 
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        color="inherit" onClick={() => handleStep(index)}>
                        {item.name}
                    </StepButton>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
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
                        <Typography sx={{ p: 1 }}>{task.desc}</Typography>
                    </Popover>
                </Step>
                ))}
            </Stepper>
        </div>
        
    )
}

export default ActionStatusBar;