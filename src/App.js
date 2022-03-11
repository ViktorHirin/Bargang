import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './Layouts/Navbar';
import Dashboard from './Components/Dashboard';
import Mint from './Components/Mint.js';
import About from './Components/About';
import Feature from './Components/Feature';
import Viproom from './Components/Viproom';
import Roadmap from './Components/Roadmap';
import Team from './Components/Team';
import FuturePlan from './Components/FuturePlan';
import Breakdown from './Components/Breakdown';
import Faq from './Components/Faq';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div className="body">
        <ToastContainer
          position = "top-right"
          autoClose = {6000}
          hideProgressBar = {false}
          newestOnTop = {true}
          closeOnClick = {true}
          rtl = {false}
          pauseOnFocusLoss = {true}
          draggable = {false}
          pauseOnHover = {false}
        />

        <Navbar />
        <Dashboard />
        <Mint />
        <About />
        <Feature />
        <Viproom />
        <Roadmap />
        <FuturePlan />
        <Breakdown />
        <Team />
        <Faq />
      </div>
  );
}

export default App;
