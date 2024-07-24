import { Grid, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

function Header({ toggleDrawer }) {
    return (
        <>
            {/* main container */}
            <Grid style={{ height: 'inherit', width: 'inherit', backgroundColor: 'pink', padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed' }}>
                {/* left side container */}
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                    <Box><Button style={{border: '1px solid black', marginRight: '5px'}} onClick={toggleDrawer}><MenuIcon /></Button></Box>
                    <Box><h3>ABC Tailor</h3></Box>
                </Grid>
                {/* right side container */}
                <Grid style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box><Button style={{border: '1px solid black'}}>Profile</Button></Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Header