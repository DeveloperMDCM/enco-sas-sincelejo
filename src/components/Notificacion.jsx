import React from 'react';
import { useFetch } from "../useFetch";
import { useEffect, useState } from "react";
import { UserContext } from '../context/AuthProvider';
import {useContext} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
const Notificacion = () => {
    const [noti, setNoti] = useState(0)
    const url = `${import.meta.env.VITE_BACKEND_URL}notificacion.php`;
    const { response, error, loading, fetchData } = useFetch(url);
    const { notificaciones } = response;
    const {user, logout} = useContext(UserContext);
   

   useEffect(()=> {
       fetch(`http://localhost/proyectoenco/Backend/notificacion.php`).
           then(respuesta => respuesta.json()).
           then(datas => setNoti(datas.notificaciones != null ? datas.notificaciones.length : 0))
           console.log('solo se ejecuta 1 vez');
   },[])

    // useEffect(() => {
    //       setInterval(async ()  => {
    //         const actualizar = async () => {
    //             const res = await fetch(`http://localhost/proyectoenco/Backend/notificacion.php`); 
    //             const data = await res.json();
    //             setNoti(data.notificaciones != null ? data.notificaciones.length : 0 );

    //         }
    //         actualizar()
    //         console.log('solo se ejecuta cada 10 segundos');
    //     }, 10000);
    //     clearInterval(10000)
    // }, [])
  
  return (
<>


    <li className="btn-group -mx-2.5 notification  ">
                                    <span className=" fw-bold text-center"> </span>
                                        <a href="" onClick={() => {
             
                  // handleActualizarEstado2(i, preordenes.id);
                  setTimeout(() => {
                        fetchData();
                    }, 1000)
                }}   className="btn flex bg-transparent dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="feather icon-bell"><span  className="notification-count text-bg-danger fw-bold ">{noti}</span></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right  shadow-lg border-slate-900 bg-lime-500">
                                        {notificaciones?.map((noti, i) => (                                           
                                       <li key={noti.id} value={noti.id} className='border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <Link className="nav-link wave-effect" to={`/orden/${noti.id}`}>
                                                    <span className="avatar bg-indigo-600 ">
                                                        <img src="http://localhost:5173/noti.png" alt="Pre orden" />
                                                    </span>
                                                    <span className="name">{noti.ncliente} <span className='font-bold text-red-600 p-2'>{noti.id}</span> </span>
                                                    <span className="message">{noti.descripcion}</span>
                                                    <span className="time">{noti.creacion}</span>
                                                    </Link>
                                            </li> 
                                            ))}
                                           
                                            <li>
                                            <Link to="/notificaciones" className="dropdown-item all-notifications wave-effect" data-toggle="collapse" aria-expanded="false" aria-controls="page-layouts">
                                            Ver más notificaciones <i className="feather icon-arrow-down"></i>
                                            </Link>
                                                </li>
                                        </ul>
                                    </li>
</>
                                
 
  )
}

export default Notificacion