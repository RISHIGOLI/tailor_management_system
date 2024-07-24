import { Grid, Box, TextField, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white', // Set the border color to white by default
            },
            '&:hover fieldset': {
                borderColor: 'white', // Set the border color to white on hover
            },
            '& input': {
                color: 'white', // Set the font color to white by default
            },
            '& input:focus': {
                color: 'pink', // Set the font color to white on focus
                borderColor: 'white', // Set the border color to white on focus
            },
        },
        '& label': {
            color: 'white', // Set the label color to black by default
        },
    },
    button: {
        border: '1px solid white',
        color: 'white'
    }
}))

function VisitPage({verifyLogin}) {
    const classes = useStyles()

    const [body, setBody] = useState({
        username: '',
        password: ''
    })

    function handleInputChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value })
    }

    function doReset() {
        setBody({ username: '', password: '' })
    }

    function doLogin() {
        verifyLogin(body.username,body.password)
    }

    return (
        <Grid style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid style={{ height: '50%', width: '25%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(175 171 171)', justifyContent: 'center', alignItems: 'center', padding: '0.75rem' }}>
                <Box> ABC Tailors</Box>
                <Box style={{ width: '100%', margin: '0.8rem' }}>
                    <TextField
                        label="username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        value={body.username}
                        className={classes.textField}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box style={{ width: '100%', margin: '0.8rem' }}>
                    <TextField
                        label="password"
                        variant="outlined"
                        name="password"
                        value={body.password}
                        fullWidth
                        className={classes.textField}
                        onChange={handleInputChange}
                    />
                </Box>
                <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Button className={classes.button} style={{ border: '1px solid white', color: 'white' }} onClick={() => doLogin()}>Login</Button>
                    <Button className={classes.button} style={{ border: '1px solid white', color: 'white' }} onClick={() => doReset()}>Reset</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default VisitPage