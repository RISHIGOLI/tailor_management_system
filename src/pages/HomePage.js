import { Grid, Drawer, Box, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import Header from '../components/root/Header'
import { makeStyles } from '@mui/styles'
import Routers from '../components/root/Routers'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import VisitPage from './VisitPage'

const useStyles = makeStyles((theme) => ({

}))

export default function HomePage() {
    const location = useLocation()
    console.log('location', location.pathname);
    const [selectedTab, setSelectedTab] = useState(location.pathname)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showHomePage, setShowHomePage] = useState(true)
    const navigate = useNavigate()
    function toggleDrawer() {
        setDrawerOpen(!drawerOpen)
    }
    function verifyLogin(username, password) {
        console.log(username, password);
        if (username === 'admin' && password === '12345678') {
            setShowHomePage(true)
        }

    }
    return (
        <>
            {
                !showHomePage ?
                    <VisitPage verifyLogin={verifyLogin} /> :
                    <>
                        {/* main container */}
                        < Grid style={{ height: '100vh', width: '100vw', backgroundColor: '#f2f2f2', display: 'flex', flexDirection: 'column' }}>
                            {/* header container */}
                            <Grid style={{ height: '4.5rem', width: '100%', zIndex: '1201' }}>
                                <Header toggleDrawer={toggleDrawer} />
                            </Grid>

                            {/* main content */}
                            <Grid style={{ display: 'flex', height: 'calc(100vh - 4.5rem)' }}>
                                {/* drawer */}
                                <Drawer variant="persistent" anchor="left" open={drawerOpen}
                                    transitionDuration={300}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            backgroundColor: 'white',
                                            top: '4.5rem',
                                            height: `calc(100% - 4.5rem)`
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
                                            <ListItem button onClick={() => { navigate('/item1'); setSelectedTab('/item1') }} style={{ backgroundColor: selectedTab === '/item1' && 'gray', color: selectedTab === '/item1' && 'white' }}>
                                                <ListItemText primary="Dashboard" />
                                            </ListItem>
                                            <ListItem button onClick={() => { navigate('/customers'); setSelectedTab('/customers') }} style={{ backgroundColor: selectedTab === '/customers' && 'gray', color: selectedTab === '/customers' && 'white' }}>
                                                <ListItemText primary="Customers" />
                                            </ListItem>
                                            <ListItem button onClick={() => { navigate('/measurements'); setSelectedTab('/measurements') }} style={{ backgroundColor: selectedTab === '/measurements' && 'gray', color: selectedTab === '/measurements' && 'white' }}>
                                                <ListItemText primary="Measurements" />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Drawer>

                                {/* content container */}
                                <Grid style={{
                                    flex: 1, backgroundColor: '#f2f2f2', padding: '0.5rem', marginLeft: drawerOpen ? 250 : 0, transition: 'margin 0.3s',
                                }}>
                                    {/* Your content goes here */}
                                    <Grid style={{ height: '100%', width: '100%' }}>
                                        <Outlet />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}