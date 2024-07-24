import { Grid, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

function Header() {
    return (
        <>
            {/* main container */}
            <Grid style={{ height: '100%', width: '100%', backgroundColor: 'pink', padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 1px 5px black' }}>
                {/* left side container */}
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                    <Box><Button><MenuIcon /></Button></Box>
                    <Box><h3>ABC Tailor</h3></Box>
                </Grid>
                {/* right side container */}
                <Grid style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box><Button>Profile</Button></Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Header