import logo from './logo.svg';
import './App.css';
import { Grid} from '@mui/material'
import { makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme)=>({
  mainContainer:{
    height: '100vh',
    width: '100vw',
    backgroundColor: 'pink'
  },
  mobileContainer:{
    display: 'none',
    [theme.breakpoints.down(767)]:{
      display: 'block'
    }
  }
}))

function App() {
  const classes = useStyles()
  return (
    <Grid className={classes.mainContainer}>
      <Grid className={classes.mobileContainer}>mobile container</Grid>
    </Grid>
  );
}

export default App;
