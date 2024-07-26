import { Dialog, Grid, Divider, Box, Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { addCustomer } from '../../store/logics/customer/CustomerSlice'

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
    }
}))

function AddCustomer({ open, onClose }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [body, setBody] = useState({
        customerName: '',
        customerAddress: '',
        customerMobileNo : '',
        referredBy: ''
    })
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

    function handleInputChange(e){
        setBody({...body, [e.target.name] : e.target.value})
    }

    useEffect(()=>{
        console.log('body',body);
    },[body])

    function handleAddCustomer(){
        dispatch(addCustomer({body}))
    }

    return (
        <>
            <Dialog
                open={open}
                className={classes.dialog}
            >
                {/* main container */}
                <Grid style={{ height: 'fit-content', width: '50vw', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {/* title container */}
                    <Grid style={{ height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px' }}>
                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Box style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Customer</Box>
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
                                    <Grid item xs={12}>
                                        <Box style={{ margin: '5px 10px' }}>
                                            <TextField
                                                variant="outlined"
                                                label={textField.label}
                                                name={textField.name}
                                                fullWidth
                                                className={classes.textField}
                                                value={body[textField.name]}
                                                onChange={handleInputChange}
                                            />
                                        </Box>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12} container justifyContent='center'>
                                <Button sx={{ border: '1px solid black' }} onClick={() => handleAddCustomer()}>+Add</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddCustomer