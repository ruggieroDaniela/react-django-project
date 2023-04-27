import { useState, useEffect } from 'react'
import './App.css'
import User from './components/user'

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
      <h1>Vite + React</h1>
      <div className="card">
        <p> Los usuarios actuales son: </p>
        <ul>
          {users.map(user => 
            <User key={user.id} user={user} />
          )}
        </ul>
      </div>
    </>
  )
}

export default App
