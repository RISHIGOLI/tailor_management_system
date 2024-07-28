import { Dialog, Grid, Divider, Box, Button, TextField, Autocomplete } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeasurementFieldsByType } from '../../store/logics/measurements/MeasurementsSlice'
import { fetchCustomersByCustomerName } from '../../store/logics/customer/CustomerSlice'

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-paperWidthSm': {
            /* Add your custom styles for paperWidthSm here */
            maxWidth: '100vw', // Example custom style
            maxHeight: '100vh'
        },
    },
    button: {
        backgroundColor: 'whitesmoke !important',
        color: 'black !important',
        margin: '5px !important',
        '&:hover': {
            backgroundColor: 'whitesmoke !important',
            color: 'black !important',
        },
        textTransform: 'none !important'
    },

    activeButton: {
        backgroundColor: 'rgb(127, 12, 134) !important',
        color: 'white !important',
        margin: '5px !important',
        '&:hover': {
            backgroundColor: 'rgb(127, 12, 134) !important',
            color: 'white !important',
        },
        textTransform: 'none !important'
    }
}))

function AddMeasurements({ open, onClose }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [measurementType, setMeasurementType] = useState('shirt')
    const textFields = [{
        label: 'Customer Name',
        name: 'customerName'
    },
    {
        label: 'Customer Mobile Number',
        name: 'customerMobileNo'
    },
    {
        label: 'Customer Address',
        name: 'customerAddress'
    },
    {
        label: 'Referred By',
        name: 'referredBy'
    }
    ]

    useEffect(() => {
        console.log('add measurement dialog mounted');
        dispatch(fetchMeasurementFieldsByType({ type: measurementType }))
    }, [])

    const { measurementFields } = useSelector((state) => state.measurements)
    const { customers } = useSelector((state) => state.customers)
    // const customers = [
    //     { id: 1, name: 'John Doe' },
    //     { id: 2, name: 'Jane Smith' },
    //     // more customers
    // ];

    return (
        <>
            <Dialog
                open={true}
                className={classes.dialog}
            >
                {/* main container */}
                <Grid style={{ height: '98vh', maxHeight: '100vh', width: '90vw', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {/* title container */}
                    <Grid style={{ height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px' }}>
                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Box style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Measurements</Box>
                        </Grid>
                        <Grid>
                            <Box onClick={() => onClose()}><Button><CloseIcon style={{ fontSize: '30px', marginTop: '5px', cursor: 'pointer' }} /></Button></Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* content container */}
                    <Grid style={{ height: 'calc(100% - 50px)', width: '100%', backgroundColor: 'white', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} spacing={1}>
                                <Box style={{ margin: '5px 10px', fontWeight: 'bold' }}>Customer Details :</Box>
                            </Grid>
                            {
                                textFields.map((textField, index) => (
                                    <Grid item xs={6}>
                                        <Box style={{ margin: '5px 10px' }}>
                                            <Autocomplete
                                                id="autocomplete-input"
                                                options={customers}
                                                getOptionLabel={(option) => option?.customerName}
                                                // value={states.find((state) => state.name === body.stateName) || states.find((state) => state.state_code === body.stateName) || null}
                                                onInputChange={(event, newInputValue) => {
                                                    dispatch(fetchCustomersByCustomerName({ customerName: event.target.value }))
                                                }}
                                                renderInput={(params) => <TextField {...params} label={textField.label} variant="outlined" name={textField.name} />}
                                            />
                                        </Box>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={6} spacing={1} display="flex" alignItems="center" justifyContent="flex-start">
                                <Box style={{ margin: '5px 10px', fontWeight: 'bold' }}>Measurement Details :</Box>
                                <Box>Measurement Type</Box>
                                <Button className={measurementType === 'shirt' ? classes.activeButton : classes.button} onClick={() => { setMeasurementType('shirt'); dispatch(fetchMeasurementFieldsByType({ type: 'shirt' })) }}>Shirt</Button>
                                <Button className={measurementType === 'pant' ? classes.activeButton : classes.button} onClick={() => { setMeasurementType('pant'); dispatch(fetchMeasurementFieldsByType({ type: 'pant' })) }}>Pant</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Box style={{ margin: '5px 10px' }}>
                                    <TextField
                                        variant="outlined"
                                        label="Measurement Description"
                                        name="measurementDesc"
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Box>
                            </Grid>
                            {
                                measurementFields.map((field, index) => (
                                    <Grid item xs={3} key={field.id}>
                                        <Box style={{ margin: '5px 10px' }}>
                                            <TextField
                                                variant="outlined"
                                                label={field.fieldName}
                                                name={field.fieldName}
                                                fullWidth
                                                className={classes.textField}
                                            />
                                        </Box>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={3} justifyContent='center' margin="auto">
                                <Button sx={{ border: '1px solid black', fontWeight: 'bold', width: '90%' }} onClick={() => { }}>+Add</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddMeasurements