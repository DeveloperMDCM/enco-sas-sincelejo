import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import {useContext} from 'react'
import {UserContext} from '../context/AuthProvider'
import '../Header.css';
import Notificacion from "./Notificacion";
// import '../Header.js'

const Header = () => {
    
    const {user, logout} = useContext(UserContext);
    const [fullscreen, setFullScreen] = useState(0)
    const [menu, setMenu] = useState(1);
    const handleMenu = () => {
      const BtnAbrirMenu = document.querySelector('.abre-menu');
      if(menu == 1) {
        setMenu(2);
        BtnAbrirMenu.classList.remove('sidebar-closed');
        BtnAbrirMenu.classList.add('sidebar-open');
        // console.log(menu);
      }else {
        setMenu(1)
        BtnAbrirMenu.classList.remove('sidebar-open');
        BtnAbrirMenu.classList.add('sidebar-closed');
        // console.log(menu);
      }
    }
    var elem = document.documentElement;
    // Pantalla full
    const Fullscreen = () => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          }
        
          }
    
      
    
    
  return (

      
      <>
      {/* Seccion menu adminsitrador  */}
      {user.role === 'administrador' && 
                    <>
                    <div>
                    <div className="topbar border-b bg-dark abrir-barra-izquierda ">
                    <div className="container-fluid">
                        <div className="flex">
                            <div className="col-md-5 hidden-xs">
                                <div className="flex">
                                    <a onClick={handleMenu}  className="menu-toggle wave-effect abrir-cerrar-menu">
                                        <i className="feather icon-menu"></i>  
                                    </a>
                               
                                <a onClick={() => Fullscreen()
                                    
                                }  className="menu-toggle wave-effect abrir-cerrar-menu">
                                             <i className="fa-solid fa-expand"></i>
                                    </a>
                                    <div>
                                    <img className=" rounded-3 mt-3" src="http://localhost:5173/Logo.jpeg" width={90} alt="" />  

                                    </div>
                                </div>
                                    
                            </div>
                            
                            <div className="col-md-7 text-right">
                            <ul>  
                                <Notificacion />
                                    
                                    <li onClick={handleMenu} className="mobile-menu-toggle w-50">
                                        <a href="#" className="menu-toggle wave-effect">
                                            <i className="feather icon-menu text-danger"></i>
                                        </a>
                                    </li>
                                
                                    
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>

                    </div>

                    <div className="sidebar offcanvas-menu  border-b bg-dark  fondo-navegacion-izquierda text-primary ">
                        <div className="logo">
                            <a href="/" className="">
                                <span className="logo-emblem m-3">
                                    <img src="http://localhost:5173/hoja.png/" alt="Enco" />
                                    </span>
                                <span className=" logo-full left-20 absolute">ENCO SAS</span>
                            </a>
                        </div>
                        
                        <ul id="sidebarCookie">
                        <li className="spacer"></li>
                            <li className="profile">
                                <span className="profile-image">
                                    <img src="http://localhost:5173/administrador.png" alt="profile" />
                                </span>
                                <span className="profile-name">
                                {user.role}
                                </span>
                                <span className="profile-info">
                                {user.email}
                                </span>
                            </li>
                            
                            <li className="spacer"></li>
                            <li className="title">
                                <i className="feather icon-more-horizontal text-white"></i>
                                <span className="menu-title">Inicio</span>
                            </li>
                            {/* Seccion de dasboard menu */}
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect"  data-toggle="collapse" href="#navDashboard" aria-expanded="false" aria-controls="page-dashboards">
                                    <i className="feather icon-grid text-info text-opacity-75"></i>
                                    <span className="menu-title ">Dasbboard</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                
                                <div className="collapse" id="navDashboard">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/index">
                                                        <i className="feather icon-grid"></i>
                                                    <span className="menu-title">Todo</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* Seccion de Clientes */}
                        
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-gears text-danger"></i>
                                    <span className="menu-title ">usuarios</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/clientes" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-users text-info"></i>
                                    <span className="menu-title">Clientes</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#preordenes" aria-expanded="false" aria-controls="page-dashboards">
                            
                                    <i className="fa-solid fa-briefcase text-info"></i>
                                    <span className="menu-title">Ordenes de trabajo</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="preordenes">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/preordenes">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Orden de servicio</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/ordenestrabajo">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Ordenes</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* seccion de inventario */}
                            <li className="nav-item">
                                <Link to="/productos" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="feather icon-shopping-bag text-danger"></i>
                                    <span className="menu-title ">Iventario</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed" data-parent="#sidebarCookie" data-toggle="collapse" href="#navPageLayoutss" aria-expanded="false" aria-controls="page-layouts">
                                    <i className="feather icon-users text-success"></i>
                                    <span className="menu-title">Trabajadores</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="navPageLayoutss">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect" to="/administradores">
                                            <i className="fa-solid fa-users-gear"></i>  
                                                    <span className="menu-title">Administradores</span></Link>
                                            </li>
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect" to="/administrativos">
                                            <i className="fa-solid fa-user"></i>  
                                                    <span className="menu-title">Administrativos</span></Link>
                                            </li>
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect" to="/tecnicos">
                                            <i className="fa-solid fa-user"></i>  
                                                    <span className="menu-title">Tecnicos</span></Link>
                                            </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="/cuadrillas" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-map-location-dot text-warning"></i>
                                    <span className="menu-title">Ubicacion</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/notasjefe" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-comment text-white"></i>
                                    <span className="menu-title">Notas</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/agendas" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-regular fa-calendar text-indigo-600"></i>
                                    <span className="menu-title">Agenda</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
                                    <span className="menu-title">Cerrar Sesión</span>
                                </Link>
                                
                                
                            </li>
                        </ul>
                    </div>              
                    </>   
                    }  

                    {/* Fin menu administrador */}

      {/* Seccion menu tecnico  */}
      {user.role === 'tecnico' && 
                    <>
                    <div>
                    <div className="topbar bg-dark abrir-barra-izquierda">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-5 hidden-xs">
                                
                                <div>
                                    <a onClick={handleMenu}  className="menu-toggle wave-effect abrir-cerrar-menu">
                                        <i className="feather icon-menu"></i>  
                                    </a>
                                    <img className=" rounded-3" src="http://localhost:5173/Logo.jpeg" alt="" width="10" />  
                                </div>
                            </div>
                            
                            <div className="col-md-7 text-right">
                            <ul>  
                                <Notificacion />
                                    
                                    <li onClick={handleMenu} className="mobile-menu-toggle w-50 w-50">
                                        <a href="#" className="menu-toggle wave-effect">
                                            <i className="feather icon-menu text-danger"></i>
                                        </a>
                                    </li>
                                
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                    </div>

                    <div className="sidebar offcanvas-menu bg-dark fondo-navegacion-izquierda text-primary">
                        <div className="logo">
                            <a href="/">
                                <span className="logo-emblem"><img src="http://localhost:5173/hoja.png/" alt="Enco" /></span>
                                <span className="logo-full">ENCO SAS</span>
                            </a>
                        </div>
                        
                        <ul id="sidebarCookie">
                        <li className="spacer"></li>
                            <li className="profile">
                                <span className="profile-image">
                                    <img src="http://localhost:5173/cliente.png" alt="profile" />
                                </span>
                                <span className="profile-name">
                                {user.role}
                                </span>
                                <span className="profile-info">
                                {user.email}
                                </span>
                            </li>
                            
                            <li className="spacer"></li>
                            <li className="title">
                                <i className="feather icon-more-horizontal text-white"></i>
                                <span className="menu-title">Inicio</span>
                            </li>
                            {/* Seccion de dasboard menu */}
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#navDashboard" aria-expanded="false" aria-controls="page-dashboards">
                                    <i className="feather icon-grid text-info text-opacity-75"></i>
                                    <span className="menu-title">Dasbboard</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="navDashboard">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/index">
                                                        <i className="feather icon-grid"></i>
                                                    <span className="menu-title">Todo</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* Seccion de Clientes */}
                        
                           
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#preordenes" aria-expanded="false" aria-controls="page-dashboards">
                            
                                    <i className="fa-solid fa-briefcase text-info"></i>
                                    <span className="menu-title">Ordenes de trabajo</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="preordenes">
                                    <ul className="flex-column sub-menu">
                                      
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/ordenestrabajo">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Ordenes</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* seccion de inventario */}
                         
                           
                            <li className="nav-item">
                                <Link to="/notasjefe" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-comment text-white"></i>
                                    <span className="menu-title">Notas</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
                                    <span className="menu-title">Cerrar Sesión</span>
                                </Link>
                                
                                
                            </li>
                        </ul>
                    </div>              
                    </>   
                    }    
    {/* Fin menu tecnico */}



                    
                    {/* Seccion menu administrativos  */}
      {user.role === 'administrativo' && 
                    <>
                     <div>
                    <div className="topbar border-b bg-dark abrir-barra-izquierda  ">
                    <div className="container-fluid">
                        <div className="flex">
                            <div className="col-md-5 hidden-xs">
                                <div className="flex">
                                    <a onClick={handleMenu}  className="menu-toggle wave-effect abrir-cerrar-menu">
                                        <i className="feather icon-menu"></i>  
                                    </a>
                               
                                <a onClick={() => Fullscreen()
                                    
                                }  className="menu-toggle wave-effect abrir-cerrar-menu">
                                             <i className="fa-solid fa-expand"></i>
                                    </a>
                                    <div>
                                    <img className=" rounded-3 mt-3" src="http://localhost:5173/Logo.jpeg" width={90} alt="" />  

                                    </div>
                                </div>
                                    
                            </div>
                            
                            {/* <div className="col-md-7 text-right">
                            <ul>  
                                <Notificacion />
                                    
                                    <li onClick={handleMenu} className="mobile-menu-toggle w-50 w-50">
                                        <a href="#" className="menu-toggle wave-effect">
                                            <i className="feather icon-menu text-danger"></i>
                                        </a>
                                    </li>
                                
                                    
                                </ul>
                                
                            </div> */}
                        </div>
                    </div>
                </div>

                    </div>

                    <div className="sidebar offcanvas-menu  border-b bg-dark  fondo-navegacion-izquierda text-primary ">
                        <div className="logo">
                            <a href="/" className="">
                                <span className="logo-emblem m-3">
                                    <img src="http://localhost:5173/hoja.png/" alt="Enco" />
                                    </span>
                                <span className=" logo-full left-20 absolute">ENCO SAS</span>
                            </a>
                        </div>
                        
                        <ul id="sidebarCookie">
                        <li className="spacer"></li>
                            <li className="profile">
                                <span className="profile-image">
                                    <img src="http://localhost:5173/administrativo.png" alt="profile" />
                                </span>
                                <span className="profile-name">
                                {user.role}
                                </span>
                                <span className="profile-info">
                                {user.email}
                                </span>
                            </li>
                            
                            <li className="spacer"></li>
                            <li className="title">
                                <i className="feather icon-more-horizontal text-white"></i>
                                <span className="menu-title">Inicio</span>
                            </li>
                            {/* Seccion de dasboard menu */}
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#navDashboard" aria-expanded="false" aria-controls="page-dashboards">
                                    <i className="feather icon-grid text-info text-opacity-75"></i>
                                    <span className="menu-title">Dasbboard</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="navDashboard">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/index">
                                                        <i className="feather icon-grid"></i>
                                                    <span className="menu-title">Todo</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* Seccion de Clientes */}
                        
                           
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#preordenes" aria-expanded="false" aria-controls="page-dashboards">
                            
                                    <i className="fa-solid fa-briefcase text-info"></i>
                                    <span className="menu-title">Ordenes</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="preordenes">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/preordenes">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Orden de servicio</span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* seccion de inventario */}
                        
                          
                           
                            <li className="nav-item">
                                <Link to="/notasjefe" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-comment text-white"></i>
                                    <span className="menu-title">Notas</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
                                    <span className="menu-title">Cerrar Sesión</span>
                                </Link>
                                
                                
                            </li>
                        </ul>
                    </div>              
                    </>   
                    }   
                    {/* Seccion menu jefe  */}
      {user.role === 'jefe' && 
                    <>
                     <div>
                    <div className="topbar border-b bg-dark abrir-barra-izquierda  ">
                    <div className="container-fluid">
                        <div className="flex">
                            <div className="col-md-5 hidden-xs">
                                <div className="flex">
                                    <a onClick={handleMenu}  className="menu-toggle wave-effect abrir-cerrar-menu">
                                        <i className="feather icon-menu"></i>  
                                    </a>
                               
                                <a onClick={() => Fullscreen()
                                    
                                }  className="menu-toggle wave-effect abrir-cerrar-menu">
                                             <i className="fa-solid fa-expand"></i>
                                    </a>
                                    <div>
                                    <img className=" rounded-3 mt-3" src="http://localhost:5173/Logo.jpeg" width={90} alt="" />  

                                    </div>
                                </div>
                                    
                            </div>
                            
                            <div className="col-md-7 text-right">
                            <ul>  
                                <Notificacion />
                                    
                                    <li onClick={handleMenu} className="mobile-menu-toggle w-50 w-50">
                                        <a href="#" className="menu-toggle wave-effect">
                                            <i className="feather icon-menu text-danger"></i>
                                        </a>
                                    </li>
                                
                                    
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>

                    </div>

                    <div className="sidebar offcanvas-menu  border-b bg-dark  fondo-navegacion-izquierda text-primary ">
                        <div className="logo">
                            <a href="/" className="">
                                <span className="logo-emblem m-3">
                                    <img src="http://localhost:5173/hoja.png/" alt="Enco" />
                                    </span>
                                <span className=" logo-full left-20 absolute">ENCO SAS</span>
                            </a>
                        </div>
                        
                        <ul id="sidebarCookie">
                        <li className="spacer"></li>
                            <li className="profile">
                                <span className="profile-image">
                                    <img src="http://localhost:5173/jefe.png" alt="profile" />
                                </span>
                                <span className="profile-name">
                                {user.role}
                                </span>
                                <span className="profile-info">
                                {user.email}
                                </span>
                            </li>
                            
                            <li className="spacer"></li>
                            <li className="title">
                                <i className="feather icon-more-horizontal text-white"></i>
                                <span className="menu-title">Inicio</span>
                            </li>
                            {/* Seccion de dasboard menu */}
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#navDashboard" aria-expanded="false" aria-controls="page-dashboards">
                                    <i className="feather icon-grid text-info text-opacity-75"></i>
                                    <span className="menu-title">Dasbboard</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="navDashboard">
                                    <ul className="flex-column sub-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/index">
                                                        <i className="feather icon-grid"></i>
                                                    <span className="menu-title">Todo</span></Link>
                                        </li>
                                
                                    </ul>
                                </div>
                            </li>
                            {/* Seccion de Clientes */}
                        
                           
                            <li className="nav-item">
                                <a className="nav-link wave-effect collapsed wave-effect" data-parent="#sidebarCookie" data-toggle="collapse" href="#preordenes" aria-expanded="false" aria-controls="page-dashboards">
                            
                                    <i className="fa-solid fa-briefcase text-info"></i>
                                    <span className="menu-title">Ordenes de trabajo</span>
                                    <i className="feather icon-chevron-down down-arrow"></i>
                                </a>
                                <div className="collapse" id="preordenes">
                                    <ul className="flex-column sub-menu">
                                    <li className="nav-item">
                                            <Link className="nav-link wave-effect"
                                                    to="/preordenes">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Orden de servicio</span></Link>
                                        </li>
                                        <li className="nav-item">
                                          
                                            <Link className="nav-link wave-effect"
                                                    to="/ordenestrabajo">
                                                        <i className="feather icon-users"></i>
                                                    <span className="menu-title">Orden de trabajo</span></Link>

                                        </li>
                                        
                                    </ul>
                                </div>
                            </li>
                            {/* seccion de inventario */}
                        
                          
                           
                            <li className="nav-item">
                                <Link to="/notasjefe" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-comment text-gray-500"></i>
                                    <span className="menu-title">Notas</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/agendas" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-regular fa-calendar text-indigo-600"></i>
                                    <span className="menu-title">Agenda</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
                                    <span className="menu-title">Cerrar Sesión</span>
                                </Link>
                                
                                
                            </li>
                        </ul>
                    </div>              
                    </>   
                    }   



       {/* Seccion menu cliente*/}
                        
                  
      {user.role === 'cliente' && 
                    <>
                    <div>
                    <div className="topbar border-b bg-dark abrir-barra-izquierda  ">
                    <div className="container-fluid">
                        <div className="flex">
                            <div className="col-md-5 hidden-xs">
                                <div className="flex">
                                    <a onClick={handleMenu}  className="menu-toggle wave-effect abrir-cerrar-menu">
                                        <i className="feather icon-menu"></i>  
                                    </a>
                               
                                <a onClick={() => Fullscreen()
                                    
                                }  className="menu-toggle wave-effect abrir-cerrar-menu">
                                             <i className="fa-solid fa-expand"></i>
                                    </a>
                                    <div>
                                    <img className=" rounded-3 mt-3" src="http://localhost:5173/Logo.jpeg" width={90} alt="" />  

                                    </div>
                                </div>
                                    
                            </div>
                            {/*                             
                            <div className="col-md-7 text-right">
                            <ul>  
                                <Notificacion />
                                    
                                    <li onClick={handleMenu} className="mobile-menu-toggle w-50 w-50">
                                        <a href="#" className="menu-toggle wave-effect">
                                            <i className="feather icon-menu text-danger"></i>
                                        </a>
                                    </li>
                                
                                    
                                </ul>
                                
                            </div> */}
                        </div>
                    </div>
                </div>

                    </div>


                    <div className="sidebar offcanvas-menu bg-dark fondo-navegacion-izquierda text-primary">
                        <div className="logo">
                            <a href="/">
                                <span className="logo-emblem"><img src="http://localhost:5173/hoja.png/" alt="Enco" /></span>
                                <span className="logo-full">ENCO SAS</span>
                            </a>
                        </div>
                        
                        <ul id="sidebarCookie">
                        <li className="spacer"></li>
                            <li className="profile">
                                <span className="profile-image">
                                    <img src="http://localhost:5173/cliente.png" alt="profile" />
                                </span>
                                <span className="profile-name">
                                {user.role}
                                </span>
                                <span className="profile-info">
                                {user.email}
                                </span>
                            </li>
                            
                            <li className="spacer"></li>
                            <li className="title">
                                <i className="feather icon-more-horizontal text-white"></i>
                                <span className="menu-title">Inicio Cliente</span>
                            </li>
                            {/* Seccion de dasboard menu */}
                           
                       
                            {/* seccion de cliente */}
                        
                            <li className="nav-item">
                                <Link to="/historial" className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-users text-info"></i>
                                    <span className="menu-title">Mi Historial</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link wave-effect collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
                                    <span className="menu-title">Cerrar Sesión</span>
                                </Link>
                                
                                
                            </li>
                           
                        </ul>
                    </div>              
                    </>   
                    }  
                    </>
                    // Fin menu clie
  
    

                    
  )
}

export default Header