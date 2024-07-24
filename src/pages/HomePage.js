import { Grid } from '@mui/material'
import Header from '../components/root/Header'

export default function HomePage() {
    return (
        <>
            {/* main container */}
            <Grid style={{ height: '100vh', width: '100vw', backgroundColor: '#f2f2f2', display: 'flex', flexDirection: 'column' }}>
                {/* header container */}
                <Grid style={{ height: '4.5rem', width: '100%' }}>
                    <Header />
                </Grid>
            </Grid>
        </>
    )
}