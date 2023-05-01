import { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import User from './components/user'
import Navbar from './components/Navbar'
import { NuestrosServicios } from './routes/NuestrosServicios';
import { Contactenos } from './routes/Contactenos';
import { About } from './routes/About';
import { Ayuda } from './routes/Ayuda';
import { Empleo } from './routes/Empleo';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<NuestrosServicios/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contactenos/>} />
          <Route exact path="/help" element={<Ayuda/>} />
          <Route exact path="/employment" element={<Empleo/>} />
        </Routes>
      </Router>
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
