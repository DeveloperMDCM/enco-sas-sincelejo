
// import './App.css'

import Login from './pages/Login'
import Index from './pages/Index'
import {useContext} from 'react'
import {UserContext} from './context/AuthProvider';
import { useState, useEffect } from 'react';
import Administrador from './pages/Administrador'
import Tecnico from './pages/Tecnico'
import Administrativo from './pages/Administrativo'
import Noti from './components/Noti';
import Preorden from './pages/Preorden'
import Error404 from './pages/Error404'
import Ordenestrabajo from './pages/Ordenestrabajo'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Cuadrillas from './pages/Cuadrillas'
import Notas from './pages/Notas'
import Cliente from './pages/Cliente'
import Producto from './pages/Producto'
import Herramienta from './pages/Herramienta'
import Register from './components/Register';
import NoActorizado from './pages/NoActorizado';
import AuthLayout from './Layout/AuthLayout';
import Calendario from './pages/Calendario';
import HistorialCliente from './pages/HistorialCliente';
function App() {
  let {user, logout} = useContext(UserContext); 
  const [usuario, setUsuario] = useState(null);
  let obj = user;

// const moi = (users) => {
//   const name = users;
//   console.log(name);
// }
// useEffect(() => {
//   moi(user)
// },[user])
// console.log(usuario);
if (obj != null && user.role === 'administrador' && user.active == 1) {
   user = [user.role, user.active];

}else if(obj != null && user.role === 'administrativo' && user.active == 1) {
  user = [user.role, user.active];
  // console.log('administrativo');
}
else if(obj != null && user.role === 'tecnico' && user.active == 1) {
  user = [user.role, user.active];
  // console.log('tecnico');
}
else if(obj != null && user.role === 'cliente' && user.active == 1) {
  user = [user.role, user.active];
  // console.log('tecnico');
}
else if(obj != null && user.role === 'jefe' && user.active == 1) {
  user = [user.role, user.active];
  // console.log('tecnico');
}


// {obj != null && user[1] === '0' && 
// <>
// {logout()}
// { localStorage.removeItem('loginToken')}
// {window.location.href = `/noautorizado`}
// </> 
// }

  return (

    <div className="bg-light bg-opacity-100">
    <BrowserRouter>
   
      <Routes>
        {/* Administrador del sistema */}
        {user && user[0] === 'administrador' && <>
        <Route path='/' element={<AuthLayout/>} />
        <Route index element={<Index />} />
               <Route path='clientes' element={<Cliente />} />  
              <Route path='administradores' element={<Administrador />} />
              <Route path='administrativos' element={<Administrativo />} />
              <Route path='tecnicos' element={<Tecnico />} />
              <Route path='preordenes' element={<Preorden />} />
              <Route path="/notificaciones" element={<Noti/>} />
              <Route path='ordenestrabajo' element={<Ordenestrabajo />} />
              <Route path='/orden/:orden_servicio' element={<Ordenestrabajo />} />
              <Route path='productos' element={<Producto />} />
              <Route path='cuadrillas' element={<Cuadrillas />} />
              <Route path='notasjefe' element={<Notas />} />
              <Route path="/signup" element={<Register/>} />
              <Route path='herramientas' element={<Herramienta />} /> 
              <Route path='/agendas' element={<Calendario />} /> 

        </>}
        {/* Tecnico del sistema  */}
        {user && user[0] === 'tecnico' && <>
        <Route path='/' element={<AuthLayout/>} />
        <Route index element={<Index />} />
              <Route path='ordenestrabajo' element={<Ordenestrabajo />} />
              <Route path='notasjefe' element={<Notas />} />
              <Route path='herramientas' element={<Herramienta />} /> 
        </>}
        {/* Administrativo del sistema */}
        {user && user[0] === 'administrativo' && <>
        <Route path='/' element={<AuthLayout/>} />
        <Route index element={<Index />} />
              <Route path='preordenes' element={<Preorden />} />
              <Route path='notasjefe' element={<Notas />} />
        </>}
        {/* Administrativo del sistema */}
        {user && user[0] === 'jefe' && <>
        <Route path='/' element={<AuthLayout/>} />
        <Route index element={<Index />} />
              <Route path='preordenes' element={<Preorden />} />
              <Route path='ordenestrabajo' element={<Ordenestrabajo />} />
              <Route path='notasjefe' element={<Notas />} />
              <Route path='agendas' element={<Calendario />} /> 
        </>}

        {/* Clientes del sistema  */}
        {user && user[0] === 'cliente' && <>
        <Route path='/' element={<AuthLayout/>} />
        <Route index element={<HistorialCliente />} />
            {/* <Route path='historial' element={<HistorialCliente />} />   */}
        </>}
        {/* Acceso no autorizado al sistemaa  */}
        {user && user[1] === '0' && 
        <>
        {logout()}
       { localStorage.removeItem('loginToken')}
       <Route path="/noautorizado" element={<NoActorizado/>} />
        </> 
        }
         {/* {user && user[0] === '' && user[1] === 1 && 
        <>
        {logout()}
       { localStorage.removeItem('loginToken')}
       {window.location.href = `/noautorizado`}
        </> 
        } */}
      
    
        <Route path="*" element={<Navigate to={user ? '/':'/login'} />} />
        {/* <Route path='*' element={<Error404 />} /> */}
  
{/* {console.log(user)} */}

        {!user && (
          <>
          <Route path="/login" element={<Login/>} />
          <Route path="/noautorizado" element={<NoActorizado/>} />
          </>
        )}

      </Routes>
   
    </BrowserRouter>
</div>
  )
}

export default App
//   return (

//     <BrowserRouter>

// <Routes>
//         { user && <Route path="/" element={<Home/>} /> }
//         {!user && (
//           <>
//           <Route path="/login" element={<Login/>} />
     
//           <Route path="/signup" element={<Register/>} />
//           </>
//         )}
//         <Route path="*" element={<Navigate to={user ? '/':'/login'} />} />
//         {/* <Route path='*' element={<Error404 />} /> */}
//       </Routes>
   
//     {/* <Routes> */}
//       {/* Url publicas */}
//       {/* <Route path='/' element={<AuthLayout />}>
//               <Route index element={<MainPague />} />
//               <Route path='index' element={<Index />} />
//               <Route path='clientes' element={<Cliente />} />
//               <Route path='administradores' element={<Administrador />} />
//               <Route path='administrativos' element={<Administrativo />} />
//               <Route path='tecnicos' element={<Tecnico />} />
//               <Route path='preordenes' element={<Preorden />} />
//               <Route path='ordenestrabajo' element={<Ordenestrabajo />} />
//               <Route path='productos' element={<Producto />} />
//               <Route path='cuadrillas' element={<Cuadrillas />} />
//               <Route path='notas.jefe' element={<Notas />} />
//               <Route path='herramientas' element={<Herramienta />} />
//               <Route path='*' element={<Error404 />} />
//       </Route> */}
//     {/* </Routes> */}
//   </BrowserRouter>
//   )