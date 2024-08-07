import { Grid, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {makeStyles} from '@mui/styles'
import { useState } from 'react'
import ProfileOptionsPopover from './ProfileOptionsPopover'

const useStyles = makeStyles((theme)=>({
    activeButton: {
        backgroundColor: 'gray !important',
        color: 'white !important',
        margin: '5px !important',
        '&:hover': {
            backgroundColor: 'gray !important',
            color: 'white !important',
        },
        textTransform: 'none !important'
    }
}))

function Header({ toggleDrawer }) {
    const classes = useStyles()
    const [openProfileOptionsPopover, setOpenProfileOptionsPopover] = useState(false)
    const [anchorE1, setAnchorE1] = useState()

    function handleOpenProfilePopover(e){
        setAnchorE1(e.target)
        setOpenProfileOptionsPopover(true)
    }

    return (
        <>
            {/* main container */}
            <Grid style={{ height: 'inherit', width: 'inherit', backgroundColor: 'white', padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed' }}>
                {/* left side container */}
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                    <Box><Button className={classes.activeButton} style={{border: '1px solid black', marginRight: '5px'}} onClick={toggleDrawer}><MenuIcon /></Button></Box>
                    <Box><h3>ABC Tailor</h3></Box>
                </Grid>
                {/* right side container */}
                <Grid style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box><Button className={classes.activeButton} style={{border: '1px solid black'}} onClick={(e)=>handleOpenProfilePopover(e)}>Profile</Button></Box>
                </Grid>
            </Grid>
            {
                openProfileOptionsPopover && <ProfileOptionsPopover open={openProfileOptionsPopover} anchorE1={anchorE1} onClose={()=>setOpenProfileOptionsPopover(false)}/>
            }
        </>
    )
}

export default Header