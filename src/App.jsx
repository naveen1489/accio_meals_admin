import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Category from './Pages/Category/Category';
import Partners from './Pages/Partners/Partners';
import Help from './Pages/Help/Help';
import PartnerDetails from './Pages/Partners/PartnerDetails';
import ProtectedRoute from './Component/ProtectedRoutes';

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
            <Route
            path="/partners"
            element={
              <ProtectedRoute>
                <Partners />
              </ProtectedRoute>
            }
          />
            <Route
            path="/partners/view"
            element={
              <ProtectedRoute>
                <PartnerDetails />
              </ProtectedRoute>
            }
          />
            <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
     </Routes>
    </>
  )
}

export default App