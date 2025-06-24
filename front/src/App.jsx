import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import MyAppointments from './views/Home/MyAppointments/MyAppointments'
import Login from './views/Login/Login';
import Register from './views/Register/Register';

function App() {
  return (
    <div className="pageLayout">
     <Navbar />
      {/* <Home />
      <MyAppointments /> */}
      <Register />
      <Login />
    </div>
  );
}



export default App;
