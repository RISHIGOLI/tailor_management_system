import { Grid, Button, Box, Autocomplete, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState, useEffect } from 'react'
import AddMeasurements from '../../components/measurements/AddMeasurements'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMeasurements, fetchMeasurementsByCustomer } from '../../store/logics/measurements/MeasurementsSlice'
import ViewMeasurementsDialog from '../../components/measurements/ViewMeasurementsDialog'
import { fetchCustomersByCustomerName } from '../../store/logics/customer/CustomerSlice'

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
    },
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

function MeasurementTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openAddMeasurementsDialog, setOpenAddMeasurementsDialog] = useState(false)
    const [openViewMeasurementsDialog, setOpenViewMeasurementsDialog] = useState(false)
    const [measurementId, setMeasuremenId] = useState(0)
    const { measurements } = useSelector((state) => state.measurements)
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [inputValue, setInputValue] = useState('')
    const { customers } = useSelector((state) => state.customers)
    console.log(measurements);
    useEffect(() => {
        console.log('measurement tab mounted');
        dispatch(fetchAllMeasurements())
    }, [])

    function extractMeasurementDescription(values, targetFieldName) {
        const field = values?.find(value => value?.fieldName === targetFieldName)
        return field ? field.fieldValue : 'Not Available'
    }

    const handleCustomerSelect = (event, newValue) => {
        setSelectedCustomer(newValue);
        newValue && dispatch(fetchMeasurementsByCustomer({ customerId: newValue?.customerId }))
        // setInputValue(newValue?.customerName || '');
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (event && event.type === 'change') {
            dispatch(fetchCustomersByCustomerName({ customerName: newInputValue }));
        }
    };

    return (
        <>
            <Grid container style={{ height: '100%', width: 'auto', backgroundColor: 'blue', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <Grid style={{ width: '100%', height: '4.5rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs={4}>
                        <Box style={{ margin: '5px 10px' }}>
                            <Autocomplete
                                id="autocomplete-input"
                                options={customers}
                                getOptionLabel={(option) => `${option?.customerName} ${option?.customerMobileNo}` || ''}
                                fullWidth
                                value={selectedCustomer?.customerName}
                                onChange={handleCustomerSelect}
                                onInputChange={handleInputChange}
                                renderInput={(params) => <TextField {...params} label='Search For Customer' variant="outlined" name='customerName' />}
                            />
                        </Box>
                    </Grid>
                    {
                        selectedCustomer &&
                        <Grid item xs={4}>
                            <Grid display="flex" alignItems="center">
                                <Box style={{ marginRight: '5px' }}>Showing result for</Box>
                                <Box style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '0.25rem' }}>{selectedCustomer?.customerName}</Box>
                            </Grid>
                        </Grid>
                    }
                    <Grid><Button className={classes.activeButton} sx={{ border: '1px solid black' }} onClick={() => setOpenAddMeasurementsDialog(true)}>Add Measurements</Button></Grid>
                </Grid>

                {/* customer table container*/}
                <Grid style={{ width: '100%', height: 'calc(100% - 4.5rem)', backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: '0rem 0.25rem' }}>
                    {
                        measurements === null || measurements.length === 0 ?
                            <Grid style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box style={{ marginTop: '-4rem', fontSize: '30px', fontWeight: 'bold', color: 'gray' }}>No Measurements Available</Box>
                            </Grid> :
                            <>
                                <Grid style={{ backgroundColor: 'gray', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', position: 'sticky', paddingRight: '4px' }}>
                                    <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                                    <Box style={{ width: '20%' }} className={classes.column}>Customer Name</Box>
                                    <Box style={{ width: '15%' }} className={classes.column}>Cloth Type</Box>
                                    <Box style={{ width: '30%' }} className={classes.column}>Description</Box>
                                    <Box style={{ width: '35%', border: 'none' }} className={classes.column}>Actions</Box>
                                </Grid>
                                <Grid style={{ height: '100%', width: '100%', overflowY: 'auto', border: '1px solid gray', borderBottom: '1px solid gray' }}>
                                    {
                                        measurements.map((measurement, index) => (
                                            <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', height: '4rem', overflow: 'hidden' }} key={measurement.id}>
                                                <Box style={{ width: '5%' }} className={classes.recordColumn}>{index + 1}</Box>
                                                <Box style={{ width: '20%' }} className={classes.recordColumn}>{measurement?.customer.customerName}</Box>
                                                <Box style={{ width: '15%' }} className={classes.recordColumn}>{measurement?.type.typeName}</Box>
                                                <Box style={{ width: '30%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn}>{extractMeasurementDescription(measurement.values, 'Measurement Description')}</Box>
                                                <Box style={{ width: '35%', display: 'flex', justifyContent: 'space-evenly', }} className={classes.recordColumn}>
                                                    <Button className={classes.activeButton} style={{ textTransform: 'none', border: '1px solid black' }} onClick={() => { setOpenViewMeasurementsDialog(true); setMeasuremenId(measurement.id) }}>View</Button>
                                                    <Button className={classes.activeButton} style={{ textTransform: 'none', border: '1px solid black' }}>Edit</Button>
                                                    <Button className={classes.activeButton} style={{ textTransform: 'none', border: '1px solid black' }} onClick={() => { }}>Delete</Button>
                                                </Box>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </>
                    }
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