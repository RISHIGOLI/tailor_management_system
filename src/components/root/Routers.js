import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import MeasurementTab from '../../pages/measurements/MeasurementTab'
import CustomersTab from '../customers/CustomersTab'
import Item1 from './temps/Item1'

function Routers() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} >
                        <Route path='/item1' element={<Item1 />} />
                        <Route path='/customers' element={<CustomersTab />} />
                        <Route path='/measurements' element={<MeasurementTab />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default Routers