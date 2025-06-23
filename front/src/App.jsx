import './App.css'
import Home from './views/Home/Home';
import MyAppointments from './views/Home/MyAppointments/MyAppointments'

function App() {
  return (
    <div className="pageLayout">
      <Home />
      <MyAppointments />
    </div>
  );
}



export default App;
