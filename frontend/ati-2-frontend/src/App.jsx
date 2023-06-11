// React Dependencies
import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Contexts
import { AppContextProvider } from './context/AppContext';

// Components
import User from './components/user';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Routes
import { NuestrosServicios } from './routes/NuestrosServicios';
import { Contactenos } from './routes/Contactenos';
import { About } from './routes/About';
import { Ayuda } from './routes/Ayuda';
import { Empleo } from './routes/Empleo';
import { Registrar } from './routes/Registrar';
import { IniciarSesion } from './routes/IniciarSesion';
import { BuscarPersonalDomestico } from './routes/BuscarPersonalDomestico';
import { ForgotPassword } from './routes/ForgotPassword';
import { ResetPassword } from './routes/ResetPassword';
import { OfrecermeNiñera } from './routes/OfrecermeNiñera';
import { ListarPublicaciones } from './routes/ListarPublicaciones';
import { ChangeLanguage } from './routes/Language';
import { BuscarCliente } from './routes/BuscarCliente';
import { VisualizarPublicacionCreada } from './routes/VisualizarPublicacionCreada';

function App() {

  
  // init internationalization module
  // const {t, i18n} = useTranslation();
  // useEffect(
  //   () => {
  //     const lng = navigator.language;
  //     i18n.changeLanguage(lng);
  //   }
  // );
  // const lng = navigator.language;
  
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8000/users')
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setUsers(data)
  //     })
  // }, []);

  return (
    <>
      <AppContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<NuestrosServicios/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/contact" element={<Contactenos/>} />
            <Route exact path="/help" element={<Ayuda/>} />
            <Route exact path="/employment" element={<Empleo/>} />
            <Route exact path="/sign-up" element={<Registrar/>} />
            <Route exact path="/login" element={<IniciarSesion />} />
            <Route exact path='/search-clients' element={<BuscarCliente/>}/>
            <Route exact path='/search-domestic-staff' element={<BuscarPersonalDomestico/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/lang" element={<ChangeLanguage/>} />
            <Route exact path="/reset-password/:id" element={<ResetPassword/>}/>
            <Route exact path='/offer-my-services/post-add/offer-me-as-babysitter' element={<OfrecermeNiñera/>}/>
            <Route path='/show-posts' element={<ListarPublicaciones/>}/>            
            <Route path='/visualizar-publicacion-creada' element={<VisualizarPublicacionCreada/>}/>
          </Routes>
          <Footer/>
        </Router>
      </AppContextProvider>
      
      {/* <h1>Vite + React</h1>
      <div className="card">
        <p> Los usuarios actuales son: </p>
        <ul>
          {users.map(user => 
            <User key={user.id} user={user} />
          )}
        </ul>
      </div> */}
    </>
  )
}

export default App
