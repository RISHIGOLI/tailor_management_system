import { Grid, Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddMeasurements from '../../components/measurements/AddMeasurements'

const useStyles = makeStyles((theme) => ({
    recordColumn: {
        display: 'flex',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        borderRight: '1px solid lightgray',
        "&::-webkit-scrollbar": {
            width: "4px",
        },
        "&::-webkit-scrollbar-track": {
            background: "lightgray",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "darkgray",
            borderRadius: "2px",
            "&:hover": {
                background: "rgb(127, 12, 134)",
            },
        },
        '& .MuiTabs-indicator': { backgroundColor: 'rgb(127, 12, 134)' },
    },
    column: {
        display: 'flex',
        justifyContent: 'center',
        borderRight: '1px solid lightgrey'
    }
}))

function MeasurementTab() {
    const classes = useStyles()
    return (
        <>
            <Grid container style={{ height: '100%', width: 'auto', backgroundColor: 'blue', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <Grid style={{ width: '100%', height: '4rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid></Grid>
                    <Grid><Button sx={{ border: '1px solid black' }} onClick={() => { }}>Add Measurements</Button></Grid>
                </Grid>

                {/* customer table container*/}
                <Grid style={{ width: '100%', height: 'calc(100% - 4rem)', backgroundColor: 'pink', display: 'flex', flexDirection: 'column' }}>
                    <Grid style={{ backgroundColor: 'rgb(127, 12, 134)', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', position: 'sticky', marginRight: '4px' }}>
                        <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                        <Box style={{ width: '20%' }} className={classes.column}>Name</Box>
                        <Box style={{ width: '30%' }} className={classes.column}>Address</Box>
                        <Box style={{ width: '15%' }} className={classes.column}>Mobile Number</Box>
                        <Box style={{ width: '35%', border: 'none' }} className={classes.column}>Actions</Box>
                    </Grid>
                    <Grid style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                        {
                            Array(10).fill(1).map((customer, index) => (
                                <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', height: '4rem', overflow: 'hidden' }} key={index}>
                                    <Box style={{ width: '5%' }} className={classes.recordColumn}>{index + 1}</Box>
                                    <Box style={{ width: '20%' }} className={classes.recordColumn}>{'customerName'}</Box>
                                    <Box style={{ width: '30%' }} className={classes.recordColumn}>{'customerAddress'}</Box>
                                    <Box style={{ width: '15%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn}>{'customerMobileNo'}</Box>
                                    <Box style={{ width: '35%', display: 'flex', justifyContent: 'space-evenly', }} className={classes.recordColumn}>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }}>View</Button>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }}>Edit</Button>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }} onClick={() => { }}>Delete</Button>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                {
                    <AddMeasurements />
                }
            </Grid>
        </>
    )
}

export default MeasurementTab