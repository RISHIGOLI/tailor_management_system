import { Dialog, Grid, Divider, Box, Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

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
    const [measurementType, setMeasurementType] = useState('')
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
                    <Grid style={{ height: 'calc(100% - 50px)', width: '100%', backgroundColor: 'pink', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
                        <Grid container spacing={1}>
                            {
                                textFields.map((textField, index) => (
                                    <Grid item xs={6}>
                                        <Box style={{ margin: '5px 10px' }}>
                                            <TextField
                                                variant="outlined"
                                                label={textField.label}
                                                name={textField.name}
                                                fullWidth
                                                className={classes.textField}
                                            />
                                        </Box>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
                                <Box>Measurement Type</Box>
                                <Button className={measurementType === 'shirt' ? classes.activeButton : classes.button} onClick={() => setMeasurementType('shirt')}>Shirt</Button>
                                <Button className={measurementType === 'pant' ? classes.activeButton : classes.button} onClick={() => setMeasurementType('pant')}>Pant</Button>
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
                        </Grid>
                        <Grid item xs={12} justifyContent='center' margin="auto">
                            <Button sx={{ border: '1px solid black', fontWeight: 'bold' }} onClick={() => { }}>+Add</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddMeasurements