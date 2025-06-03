import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'; 
import Navbar from './Componenet/Navbar';
import Footer from './Componenet/Footer';
import Home from './Componenet/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './Componenet/Sidebar';
import ProductState from './Context/ProductState';
import Login from './Componenet/Login';
import Reports from './Componenet/Reports';
import AccommodationList from './Componenet/AccommodationList';
import Rooms from './Componenet/Rooms';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  // Update token on login success
  const handleLoginSuccess = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };
  return (
    <>
     <BrowserRouter>
      <ProductState>
      {token ? (        
        <>
         <div id="wrapper">
              <Sidebar/>
                   <div id="content-wrapper" className="d-flex flex-column">                  
                        <Navbar/>
                              { <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/report" element={<Reports />} />
                                <Route exact path="/accommodation" element={<AccommodationList />} />
                                <Route exact path="/rooms" element={<Rooms />} />


                              </Routes>} 
                        {/* <Footer/>                     */}
                    </div>
        </div>  
          
        </>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />}/>
          </Routes>
        )}
      </ProductState>
    </BrowserRouter>
    </>
  );
}

export default App;
