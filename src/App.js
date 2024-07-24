import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import VisitPage from './pages/VisitPage';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Routers from './components/root/Routers';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'pink'
  },
  mobileContainer: {
    display: 'none',
    [theme.breakpoints.down(767)]: {
      display: 'block'
    }
  }
}))

function App() {
  const classes = useStyles()
  const [showHomePage, setShowHomePage] = useState(true)

  function verifyLogin(username, password) {
    console.log(username, password);
    setShowHomePage(true)
  }
  return (
    <>
      <Routers/>
    </>
  );
}

export default App;
