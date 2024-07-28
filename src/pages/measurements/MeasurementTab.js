import { Grid, Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState, useEffect } from 'react'
import AddMeasurements from '../../components/measurements/AddMeasurements'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMeasurements } from '../../store/logics/measurements/MeasurementsSlice'
import ViewMeasurementsDialog from '../../components/measurements/ViewMeasurementsDialog'

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
    const dispatch = useDispatch()
    const [openAddMeasurementsDialog, setOpenAddMeasurementsDialog] = useState(false)
    const [openViewMeasurementsDialog, setOpenViewMeasurementsDialog] = useState(false)
    const [measurementId, setMeasuremenId] = useState(0)
    const { measurements } = useSelector((state) => state.measurements)
    console.log(measurements);
    useEffect(() => {
        console.log('measurement tab mounted');
        dispatch(fetchAllMeasurements())
    }, [])

    function extractMeasurementDescription(values, targetFieldName) {
        const field = values.find(value => value.fieldName === targetFieldName)
        return field ? field.fieldValue : 'Not Available'
    }

    return (
        <>
            <Grid container style={{ height: '100%', width: 'auto', backgroundColor: 'blue', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <Grid style={{ width: '100%', height: '4rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid></Grid>
                    <Grid><Button sx={{ border: '1px solid black' }} onClick={() => setOpenAddMeasurementsDialog(true)}>Add Measurements</Button></Grid>
                </Grid>

                {/* customer table container*/}
                <Grid style={{ width: '100%', height: 'calc(100% - 4rem)', backgroundColor: 'pink', display: 'flex', flexDirection: 'column' }}>
                    <Grid style={{ backgroundColor: 'rgb(127, 12, 134)', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', position: 'sticky', marginRight: '4px' }}>
                        <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                        <Box style={{ width: '20%' }} className={classes.column}>Customer Name</Box>
                        <Box style={{ width: '15%' }} className={classes.column}>Cloth Type</Box>
                        <Box style={{ width: '30%' }} className={classes.column}>Description</Box>
                        <Box style={{ width: '35%', border: 'none' }} className={classes.column}>Actions</Box>
                    </Grid>
                    <Grid style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                        {
                            measurements.map((measurement, index) => (
                                <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', height: '4rem', overflow: 'hidden' }} key={measurement.id}>
                                    <Box style={{ width: '5%' }} className={classes.recordColumn}>{index + 1}</Box>
                                    <Box style={{ width: '20%' }} className={classes.recordColumn}>{measurement?.customer.customerName}</Box>
                                    <Box style={{ width: '15%' }} className={classes.recordColumn}>{measurement?.type.typeName}</Box>
                                    <Box style={{ width: '30%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn}>{extractMeasurementDescription(measurement.values, 'Measurement Description')}</Box>
                                    <Box style={{ width: '35%', display: 'flex', justifyContent: 'space-evenly', }} className={classes.recordColumn}>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }} onClick={() => { setOpenViewMeasurementsDialog(true); setMeasuremenId(measurement.id) }}>View</Button>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }}>Edit</Button>
                                        <Button style={{ textTransform: 'none', border: '1px solid black' }} onClick={() => { }}>Delete</Button>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                {
                    openAddMeasurementsDialog && <AddMeasurements open={openAddMeasurementsDialog} onClose={() => setOpenAddMeasurementsDialog(false)} />
                }
                {
                    openViewMeasurementsDialog && <ViewMeasurementsDialog open={openViewMeasurementsDialog} onClose={() => setOpenViewMeasurementsDialog(false)} measurementId={measurementId} />
                }
            </Grid>
        </>
    )
}

export default MeasurementTab