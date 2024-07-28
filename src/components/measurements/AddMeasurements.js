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
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [inputValue, setInputValue] = useState('')
    const [values, setValues] = useState({})
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

    const handleCustomerSelect = (event, newValue) => {
        setSelectedCustomer(newValue);
        // setInputValue(newValue?.customerName || '');
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (event && event.type === 'change') {
            dispatch(fetchCustomersByCustomerName({ customerName: newInputValue }));
        }
    };

    function getTypeIdFromMeasurementType(measurementType) {
        switch (measurementType) {
            case 'shirt':
                return 2
            case 'pant':
                return 3
            default:
                return 2
        }
    }

    function addMeasurementHandler() {
        const requestBody = {
            customer: {
                customerId: selectedCustomer?.customerId,
                customerName: selectedCustomer?.customerName,
                customerAddress: selectedCustomer?.customerAddress,
                customerMobileNo: selectedCustomer?.customerMobileNo,
                referredBy: selectedCustomer?.referredBy
            },
            type: {
                typeId: getTypeIdFromMeasurementType(measurementType)
            },
            values: transformMeasurementData(values)
        }
        console.log('request body = ', requestBody);
    }

    function measurementsInputHandler(e) {
        console.log('event name = ', e.target.name, 'event value = ', e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    function transformMeasurementData(data) {
        return Object.keys(data).map(key => ({
            fieldName: key,
            fieldValue: data[key]
        }))
    }

    useEffect(() => {
        console.log(values)
    }, [values])

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

                            <Grid item xs={6}>
                                <Box style={{ margin: '5px 10px' }}>
                                    <Autocomplete
                                        id="autocomplete-input"
                                        options={customers}
                                        getOptionLabel={(option) => option?.customerName || ''}
                                        value={selectedCustomer?.customerName}
                                        onChange={handleCustomerSelect}
                                        onInputChange={handleInputChange}
                                        renderInput={(params) => <TextField {...params} label='Customer Name' variant="outlined" name='customerName' />}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box style={{ margin: '5px 10px' }}>
                                    <TextField
                                        label='Customer Mobile No'
                                        variant="outlined"
                                        fullWidth
                                        value={selectedCustomer?.customerMobileNo || ''}
                                    // onChange={handleDetailChange('customerMobileNo')}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box style={{ margin: '5px 10px' }}>
                                    <TextField
                                        label='Customer Address'
                                        variant="outlined"
                                        fullWidth
                                        value={selectedCustomer?.customerAddress || ''}
                                    // onChange={handleDetailChange('customerAddress')}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box style={{ margin: '5px 10px' }}>
                                    <TextField
                                        label='Referred By'
                                        variant="outlined"
                                        fullWidth
                                        value={selectedCustomer?.referredBy || ''}
                                    // onChange={handleDetailChange('referredBy')}
                                    />
                                </Box>
                            </Grid>

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
                                        name="Measurement Description"
                                        fullWidth
                                        className={classes.textField}
                                        onChange={(e) => measurementsInputHandler(e)}
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
                                                onChange={(e) => measurementsInputHandler(e)}
                                            />
                                        </Box>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={3} justifyContent='center' margin="auto">
                                <Button sx={{ border: '1px solid black', fontWeight: 'bold', width: '90%' }} onClick={() => addMeasurementHandler()}>+Add</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddMeasurements