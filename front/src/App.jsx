import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import MyAppointments from './views/Home/MyAppointments/MyAppointments'
import Login from './views/Login/Login';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Register from './views/Register/Register';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="pageLayout">
     <Navbar />
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
     </Routes>
    </div>
  );
}



export default App;
