
import './App.css'
import AuthLayout from './layout/AuthLayout'
import MainPague from './pages/MainPage'
import Index from './pages/Index'
import Administrador from './pages/Administrador'
import Tecnico from './pages/Tecnico'
import Administrativo from './pages/Administrativo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (

    <BrowserRouter>
    <Routes>
      {/* Url publicas */}
      <Route path='/' element={<AuthLayout />}>
              <Route index element={<MainPague />} />
              <Route path='index' element={<Index />} />
              <Route path='administradores' element={<Administrador />} />
              <Route path='administrativos' element={<Administrativo />} />
              <Route path='tecnicos' element={<Tecnico />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
