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
            path="/view"
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


// import './App.css';
// import { Route, Routes } from "react-router-dom";
// import Login from './Pages/Auth/Login';
// import Dashboard from './Pages/Dashboard/Dashboard';
// import Category from './Pages/Category/Category';
// import Partners from './Pages/Partners/Partners';
// import Help from './Pages/Help/Help';
// import PartnerDetails from './Pages/Partners/PartnerDetails';
// import ProtectedRoutes from './Component/ProtectedRoutes';

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/" element={<Login />} />

//         {/* Protected Routes */}
//         <Route element={<ProtectedRoutes />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/category" element={<Category />} />
//           <Route path="/partners" element={<Partners />} />
//           <Route path="/view" element={<PartnerDetails />} />
//           <Route path="/help" element={<Help />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;