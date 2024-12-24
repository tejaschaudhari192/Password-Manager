import React from 'react'
import useOnlineStatus from '../utils/useOnlineStatus'
import profile from "../assets/profile.png"
import { useSelector } from 'react-redux'
import { Button, CircularProgress, Fade, Menu, MenuItem } from '@mui/material'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const status = useSelector(store => store.passwords.status)
    const navigate = useNavigate();
    // console.log(status);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        navigate("/")
    }

    return (
        <div className='justify-end text-black dark:text-white right-0 top-0 z-10 p-4 text-lg flex gap-4 items-center'>

            {status == "Connected" ? (status) : <div className='flex gap-2'>
                {status} < CircularProgress size={30} />
            </div>}


            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img className='h-10 w-10' src={profile} />
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    handleSignOut();
                }}>Sign Out</MenuItem>
            </Menu>
        </div>
    )
}

export default Navbar
