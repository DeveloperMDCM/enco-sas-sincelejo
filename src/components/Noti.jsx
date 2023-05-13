import { useFetch } from "../useFetch";
import React from 'react'
import Header from "./Header";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
// const [noti, setNoti] = useState(0)

// fetch(`http://localhost/proyectoenco/Backend/notificacion.php`).
    // then(respuesta => respuesta.json()).
    // then(datas => setNoti(datas.notificaciones.length))

    // useEffect(() => {
  
    //       setInterval(async ()  => {
    //         const res = await fetch(`http://localhost/proyectoenco/Backend/notificacion.php`); 
    //         const data = await res.json();
    //         setNoti(data.notificaciones.length)
    //         // console.log(noti);
    //     }, 10000);
    // }, [])
  
const Noti = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}notificacion.php`;
    const { response, error, loading, fetchData } = useFetch(url);
    const { notificaciones } = response;

    const handleActualizarEstado = async (i, id) => {
        // const idNoti = document.querySelectorAll(`#notificacion`)[i];
        // console.log(idNoti, i, id);
            await clienteAxios.delete('notificacion.php', { data: { id:`${id}` }})
            await fetch('http://localhost/rest_api/editar.php', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: `${ parseInt(id)}`, estado: '1' })
            })
      }
 
 
  return (
   <>

  <Header />

<div className="relative overflow-x-auto container mt-10 flex justify-center ">
  
    <table className=" text-sm text-left  text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
           
            <tr>
               
                <th  scope="col" className="px-6 py-3 ">
                    No Leida
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Descripcion
                </th>
               
            </tr>
         
        </thead>
        <tbody  >
        {notificaciones?.map((noti, i) => (  
            <tr    key={noti.id} className=" border-b bg-gray-800 text-white border-gray-700  hover:bg-gray-600">
                
                <td onClick={() => {
                    handleActualizarEstado(i, noti.id);
                    setTimeout(() => {
                        fetchData();
                    }, 1000)
                }} className="w-4 p-4 notificacion-click notificacion-click2">
                
                    <div className="flex items-center">
                    {noti.estado === "0" ? 
                <button type="button" className="  text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 "><span hidden>{noti.id}</span><i className="fa-solid fa-check"></i></button>
                    : 
                   ''
                } 
                    </div>
                        
                </td>
                
                <th  className="flex items-center px-6 py-4  whitespace-wrap text-white">
                    <img className="w-10 h-10 rounded-full" src="noti.png" alt="noti" />
                    <div className="pl-3 gap-3">
                        <div className="text-base font-semibold"></div>
                        <div className="text-base font-semibold"> <span>{noti.id}</span>: {noti.descripcion}</div>
                        <div className="font-normal text-gray-500">Creacion: {noti.creacion}</div>
                    </div>  
                </th>
                
                
            </tr>
         ))}
        </tbody>
    </table>
</div>

   </>
  )
}

export default Noti