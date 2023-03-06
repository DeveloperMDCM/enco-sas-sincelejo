import { Link } from "react-router-dom"
import '../Header.css';
const Header = () => {
    
  return (

    <>
<nav className="navbar navbar-dark bg-dark shadow-lg">
  <div className="container-fluid">
  <Link  className=''
        to="/index">
        
   <img  className="rounded" src="Logo.jpeg" alt="" width={100} />
        </Link>
   <div className="text-center menu-opciones-header">

        <Link  className=' btn btn-outline-success'
        to="/administradores">Administradores</Link>
        <Link  className='btn btn-outline-success'
        to="/administrativos">Administrativos</Link>

        <Link  className='btn btn-outline-success'
        to="/tecnicos">Tecnicos</Link>

   </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
      
    </button>
    
    <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
      <img className="m-auto rounded" src="Logo.jpeg" alt="" width={190} />
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          <Link  className='nav-link' to="/index"><i className="fa-solid fa-house"></i> Inicio</Link>
          </li>
          <li className="nav-item">
          <Link  className='nav-link' to="/index"><i className="fa-solid fa-gauge"></i> Dasboard</Link>
          </li>
    
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i className="fa-solid fa-users-gear"></i> Trabajadores
            </a>
          
            <ul className="dropdown-menu dropdown-menu-dark">
    
              <Link  className='dropdown-item' to="/administradores"><i className="fa-solid fa-user-gear"></i> Administradores</Link>
              <Link  className='dropdown-item' to="/administrativos"><i className="fa-solid fa-user"></i> Administrativos</Link>
              <Link  className='dropdown-item' to="/tecnicos"><i className="fa-solid fa-user"></i> Tecnicos</Link>
              
            </ul>
            
          </li>
       
          <li className="nav-item dropdownd">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i className="fa-solid fa-users"></i> Trabajadores
            </a>
            <ul className="dropdown-menu dropdown-menu-dark">
    
              <Link  className='dropdown-item' to="/administradores"><i className="fa-solid fa-user-gear"></i> Administradores</Link>
              <Link  className='dropdown-item' to="/administrativos"><i className="fa-solid fa-user"></i> Administrativos</Link>
              <Link  className='dropdown-item' to="/tecnicos"><i className="fa-solid fa-user"></i> Tecnicos</Link>
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-success" type="submit">Busqueda</button>
        </form>
      </div>
    </div>
  </div>
</nav>
    </>
    
  )
}

export default Header