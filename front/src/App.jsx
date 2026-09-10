import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import MyAppointments from './views/Home/MyAppointments/MyAppointments'
import Login from './views/Login/Login';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Register from './views/Register/Register';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NewAppointment from './views/Home/NewAppointment/NewAppointment';


function App() {
  return (
    <div className="pageLayout">
     <Navbar />
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
            path="/appointments"
            element={
            <PrivateRoute>
             <MyAppointments />
               </PrivateRoute>
                }
          />
          <Route
  path="/appointments/new"
  element={
    <PrivateRoute>
      <NewAppointment />
    </PrivateRoute>
  }
/>
     </Routes>
    </div>
  );
}



export default App;
