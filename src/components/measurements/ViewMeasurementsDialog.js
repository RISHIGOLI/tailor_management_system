import { Dialog, Grid, Divider, Box, Button, TextField, Autocomplete } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

function ViewMeasurementsDialog({ open, onClose, measurementId }) {
    const classes = useStyles()
    const { measurements } = useSelector((state) => state.measurements)
    const measurement = measurements.filter((measurement) => measurement.id === measurementId)[0]
    console.log('measurement', measurement);
    function extractMeasurementDescription(values, targetFieldName) {
        const field = values.find(value => value.fieldName === targetFieldName)
        return field ? field.fieldValue : ''
    }
    // useEffect(()=>{
    //     console.log('view measurements dialog mounted');
    // },[])
    return (
        <>
            <Dialog
                open={true}
                className={classes.dialog}
            // onClose={onClose}
            >
                {/* main container */}
                <Grid style={{ height: '98vh', maxHeight: '100vh', width: '90vw', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {/* title container */}
                    <Grid style={{ height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px' }}>
                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Grid display="flex" alignItems="center">
                                <Box style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '0.25rem' }}>View Measurements</Box>
                                <Box>{`(All numbers are in inches)`}</Box>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Box onClick={() => onClose()}><Button><CloseIcon style={{ fontSize: '30px', marginTop: '5px', cursor: 'pointer' }} /></Button></Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* content container */}
                    <Grid style={{ height: 'calc(100% - 50px)', width: '100%', backgroundColor: 'white', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box style={{ margin: '5px 10px', fontWeight: 'bold' }}>Customer Details :</Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid style={{ margin: '5px 10px', display: 'flex', width: '100%' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>Name :</Box>
                                    <Box>{measurement?.customer?.customerName}</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid style={{ margin: '5px 10px', display: 'flex' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>Mobile No :</Box>
                                    <Box>{measurement.customer.customerMobileNo}</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid style={{ margin: '5px 10px', display: 'flex' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>Address :</Box>
                                    <Box>{measurement.customer.customerAddress}</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid style={{ margin: '5px 10px', display: 'flex' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>Referred By :</Box>
                                    <Box>{measurement.customer.referredBy}</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={3}>
                                <Box style={{ margin: '5px 10px', fontWeight: 'bold' }}>Measurement Details :</Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid style={{ margin: '5px 10px', display: 'flex' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>Cloth Type :</Box>
                                    <Box>{measurement.type.typeName.toUpperCase()}</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid style={{ margin: '5px 10px', display: 'flex' }}>
                                    <Box style={{ fontWeight: 'bold', marginRight: '10px' }}>{extractMeasurementDescription(measurement.values, 'Measurement Description')}</Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                {
                                    measurement.values.map((value, index) => (
                                        <>
                                            {
                                                value.fieldName !== 'Measurement Description' &&
                                                <Grid item xs={4} key={value.id}>
                                                    <Grid style={{ margin: '5px 10px', display: 'flex', border: '1px solid black', padding: '1rem' }}>
                                                        <Box style={{ fontWeight: 'bold', marginRight: '10px', minWidth: 'fit-content' }}>{value.fieldName} :</Box>
                                                        <Box>{value.fieldValue}</Box>
                                                    </Grid>
                                                </Grid>
                                            }
                                        </>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default ViewMeasurementsDialog