import { Grid, Drawer, Box, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import Header from '../components/root/Header'
import { makeStyles } from '@mui/styles'
import Routers from '../components/root/Routers'
import { useNavigate, Outlet } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

}))

export default function HomePage() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const navigate = useNavigate()
    function toggleDrawer() {
        setDrawerOpen(!drawerOpen)
    }
    return (
        <>
            {/* main container */}
            <Grid style={{ height: '100vh', width: '100vw', backgroundColor: '#f2f2f2', display: 'flex', flexDirection: 'column' }}>
                {/* header container */}
                <Grid style={{ height: '4.5rem', width: '100%', zIndex: '1201' }}>
                    <Header toggleDrawer={toggleDrawer} />
                </Grid>

                {/* main content */}
                <Grid style={{ display: 'flex', flex: 1 }}>
                    {/* drawer */}
                    <Drawer variant="persistent" anchor="left" open={drawerOpen}
                        transitionDuration={300}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'pink',
                                top: '4.5rem'
                            }
                        }}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            // onClick={toggleDrawer}
                            // onKeyDown={toggleDrawer}
                        >
                            <List>
                                <ListItem button onClick={() => navigate('/item1')}>
                                    <ListItemText primary="Item 1" />
                                </ListItem>
                                <ListItem button onClick={() => navigate('/item2')}>
                                    <ListItemText primary="Item 2" />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>

                    {/* content container */}
                    <Grid style={{
                        flex: 1, backgroundColor: 'red', padding: '1rem', marginLeft: drawerOpen ? 250 : 0,
                        transition: 'margin 0.3s'
                    }}>
                        {/* Your content goes here */}
                        <Grid style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                            <Outlet />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}