import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Category from './Pages/Category/Category';
import Partners from './Pages/Partners/Partners';
import Help from './Pages/Help/Help';
import PartnerDetails from './Pages/Partners/PartnerDetails';

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/partners' element={<Partners/>}/>
      <Route path='/view' element={<PartnerDetails/>}/>
      <Route path='/help' element={<Help/>}/>
     </Routes>
    </>
  )
}

export default App
