import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Finance from './Pages/Finance/Finance';
import Accessories from './Pages/Accessories/Accessories';
import MiniDrawer from './Components/MiniDrawer';
import BloodGroup from './Pages/Settings/BloodGroup';
import HRAPI from "./http-common";
import Dessease from './Pages/Settings/Desease';

function App() {
  return (
    <BrowserRouter>
    <Routes>      
      <Route exact path="/" element={<MiniDrawer Content={<Home/>}/>} />
      <Route path="/BloodGroup" element={<MiniDrawer Content={<BloodGroup/>}/>} />
      <Route path="/finance" element={<MiniDrawer Content={<Finance/>}/>} />
      <Route path="/settings" element={<MiniDrawer Content={<Accessories/>}/>} />
      <Route path="/Deaseses" element={<MiniDrawer Content={<Dessease/>}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
