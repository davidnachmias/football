import './App.css'
import { Route,Routes } from 'react-router-dom'
import Team from './pages/Team'
import Login from './pages/Login'
import Register from './pages/Register'
import AddPlayer from './pages/AddPlayer'
import EditPlayer from './pages/EditPlayer'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/team' element={<Team/>}/>
        <Route index = '/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/editPlayer' element={<EditPlayer/>}/>
        <Route path='/editPlayer/:playerParams' element={<EditPlayer/>}/>
        <Route path='/addPlayer' element={<AddPlayer/>}/>



      </Routes>
      
    </div>
  )
}

export default App
