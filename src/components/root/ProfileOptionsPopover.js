import React from "react"
import { Grid, Box, Divider } from '@mui/material'
import Popover from '@mui/material/Popover'
import LogoutIcon from '@mui/icons-material/Logout'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    popoverContainer: {
        // Add your styles here
        backgroundColor: 'white',
        padding: '0px',
        // minHeight: '200px', // Set the minimum height (replace '200px' with your desired value)
        minWidth: '300px', // Set the minimum width (replace '300px' with your desired value)
        display: 'flex',
        flexDirection: 'column !important',
        // height: '300px'
    },
    popover: {
        top: '70px !important',
        right: '8px !important',
        borderRadius: '10px !important',
        width: '225px !important',
        height: 'max-content !important'
    },
    menuItem: {
        height: '50px',
        width: '100%',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column !important'
    },
    itemLogout: {
        height: '50px',
        width: '100%',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'whitesmoke'
        }
    }
}))

export default function ProfileOptionsPopover({ open, anchorE1, onClose }) {
    const classes = useStyles()

    return (
        <Popover
            open={open}
            anchorEl={anchorE1}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            classes={{ paper: classes.popover }}
        >
            <Grid className={classes.popoverContainer}>
                <Grid className={classes.menuItem}>
                    <Box style={{ display: 'flex' }}><Box style={{ fontWeight: 'bolder' }}>Good Morning</Box>, John Doe</Box>
                    <Box>Project Admin</Box>
                </Grid>
                <Divider />
                <Grid className={classes.itemLogout} onClick={() => { }}><LogoutIcon style={{ marginRight: '10px', marginTop: '4px' }} /> Logout</Grid>
            </Grid>
        </Popover>
    )
}