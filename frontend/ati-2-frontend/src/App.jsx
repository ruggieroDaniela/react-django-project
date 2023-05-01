import { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import User from './components/user'
import Navbar from './components/Navbar'
import { Home } from './routes/Home';
import { Contact } from './routes/Contact';
import { About } from './routes/About';

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
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
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
