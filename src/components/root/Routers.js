import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import Item1 from './temps/Item1'
import Item2 from './temps/Item2'

function Routers() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} >
                    <Route path='/item1' element={<Item1 />} />
                    <Route path='/item2' element={<Item2 />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default Routers