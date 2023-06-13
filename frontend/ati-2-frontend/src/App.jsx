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
import { SolicitarÑiñera } from './routes/SolicitarÑiñera';
import { ListarPublicaciones } from './routes/ListarPublicaciones';
import { ChangeLanguage } from './routes/Language';
import { BuscarCliente } from './routes/BuscarCliente';
<<<<<<< HEAD
import { OfrecermeCuidador } from './routes/OfrecermeCuidador';
import { ModificarPost } from './routes/ModificarPost';

=======
import { VisualizarPublicacionCreada } from './routes/VisualizarPublicacionCreada';
>>>>>>> e1dd81042bba643324f1abb4ff6bba340f7175c6

function App() {

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
            <Route exact path="/login/:noAuth?" element={<IniciarSesion />} />
            <Route exact path='/search-clients' element={<BuscarCliente/>}/>
            <Route exact path='/search-domestic-staff' element={<BuscarPersonalDomestico/>}/>
            <Route exact path='/request-babysitter' element={<SolicitarÑiñera/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/lang" element={<ChangeLanguage/>} />
            <Route exact path="/reset-password/:id" element={<ResetPassword/>}/>
<<<<<<< HEAD
            <Route exact path='/modify-post/:id' element={<ModificarPost/>}/>
            <Route exact path='/post-ad/offer/babysitter' element={<OfrecermeNiñera/>}/>
            <Route exact path='/post-ad/offer/caretaker' element={<OfrecermeCuidador/>}/>
            <Route path='/show-posts' element={<ListarPublicaciones/>}/>
=======
            <Route exact path='/offer-my-services/post-add/offer-me-as-babysitter' element={<OfrecermeNiñera/>}/>
            <Route path='/show-posts' element={<ListarPublicaciones/>}/>            
            <Route path='/visualizar-publicacion-creada' element={<VisualizarPublicacionCreada/>}/>
>>>>>>> e1dd81042bba643324f1abb4ff6bba340f7175c6
          </Routes>
          <Footer/>
        </Router>
      </AppContextProvider>
      
    </>
  )
}

export default App
