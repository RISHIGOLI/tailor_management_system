import { Dialog, Grid, Divider, Box, Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../../store/logics/customer/CustomerSlice'


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

function ConfirmationDialog({ open, onClose, customerId }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    function handleDeleteCustomer(customerId) {
        console.log('customer id',customerId,typeof customerId);
        dispatch(deleteCustomer(customerId))
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
                    <Grid style={{ height: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px' }}>
                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'red' }}>
                            <Box style={{ fontSize: '20px', fontWeight: 'bold' }}>Delete Customer</Box>
                        </Grid>
                        <Grid>
                            <Box onClick={() => onClose()}><Button><CloseIcon style={{ fontSize: '30px', marginTop: '5px', cursor: 'pointer' }} /></Button></Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* content container */}
                    <Grid style={{ height: 'calc(100% - 50px)', width: '90%', paddingTop: '0.5rem', display: 'flex', paddingBottom: '0.5rem', justifyContent: 'space-between', margin: '0px auto' }}>
                        <Grid >
                            <Button sx={{ border: '1px solid black', color: 'red', fontWeight: 'bold' }} onClick={() => handleDeleteCustomer(customerId)}>Delete</Button>
                        </Grid>
                        <Grid >
                            <Button sx={{ border: '1px solid black', fontWeight: 'bold' }} onClick={() => { }}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog