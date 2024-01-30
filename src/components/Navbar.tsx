import { useState } from 'react'
import { Button, Menu, MenuItem, Avatar } from '@mui/material'
import { observer } from 'mobx-react'
const Navbar = observer((userList: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl); 
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button>Create Task</Button>
            <Button
                id="open-user-list-btn"
                aria-controls={open ? 'user-list-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar>H</Avatar>
            </Button>
            <Menu 
                id="user-list-menu"
                MenuListProps={{
                    'aria-labelledby': 'open-user-list-btn',
                  }}
                open={open} anchorEl={anchorEl}>
                {userList.map((user: any) => (
                    <MenuItem key={user.id}>{user.name}</MenuItem>
                ))}
            </Menu>
        </div>
        
    )
})

export default Navbar;