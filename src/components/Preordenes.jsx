import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import "../Spinner.css";
import clienteAxios from "../config/axios";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";
import {UserContext} from '../context/AuthProvider'
import ListaResultados from "./ListaResultados";
import Spinner from "./Spinner";
import {  Link } from 'react-router-dom'
const Preordenes = () => {
  const {user} = useContext(UserContext);
  const url = `${import.meta.env.VITE_BACKEND_URL}preorden.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const listaClientes = `${import.meta.env.VITE_BACKEND_URL}cliente.php`;
  const listaInspeccion = `${import.meta.env.VITE_BACKEND_URL}selectInspeccion.php`;

  // console.log(response);
  const [limite, setLimite] = useState('');
 
  const { pre_orden } = response;
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState(""); 
  const [cliente, setCliente] = useState("");  
  const [title, setTitle] = useState("");
  const [inspeccion, setInspeccion] = useState("");
  const [operation, setOperation] = useState(1);
  const [selectClientes, setSelectClientes] = useState([]);
  const [requiereInspeccion, setRequiereInspeccion] = useState([]);
  const handleResultados = (e) => {
    // if(e.target.value === ''){
    //   fetchData();
      
    // }
    fetchData(`limite=${e.target.value}`);
    setLimite(`limite=${e.target.value}`);
    
  }

useEffect(() => {
  
  axios.get(listaClientes).then(res => {
    setSelectClientes(res.data.clientes)
  });
  axios.get(listaInspeccion).then(res => {
    setRequiereInspeccion(res.data.Inspeccion)
  });

}, [])

    const openModal = (
      op,
      id,
      descripcion,
      cliente,
      inspeccion,
  ) => {
    setId("");
    setDescripcion("");
    setCliente("");
    setInspeccion("");
   
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar pre orden");
    } else if (op === 2) {
      setTitle("Editar Orden de servicio");
      setId(id);
      setDescripcion(descripcion);
      setCliente(cliente);
      setInspeccion(inspeccion)
      console.log(inspeccion);
    }
    window.setTimeout(function () {
      document.getElementById("descripcion").focus();
      document.querySelector("#btnCerrar").addEventListener('click', () => {
        document.querySelector("#cliente").value = ''
    document.querySelector("#inspeccion").value = ''
      }
        ) 
    }, 500);
  };

  const handleActualizarNoti = async (i, id) => {
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
  

  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        descripcion: descripcion.trim(),
        cliente: cliente.trim(),
        inspeccion: inspeccion.trim()
      };
      metodo = "POST";
    } else {
      parametros = {
        id:id,
        descripcion: descripcion.trim(),
        cliente: cliente.trim(),
        inspeccion: inspeccion.trim(),
      };
      metodo = "PUT";
    }
    envarSolicitud(metodo, parametros);
  };
  const envarSolicitud = async (metodo, parametros) => {
    await axios({ method: metodo, url: url, data: parametros })
      .then(function (respuesta) {
        const tipo = respuesta.data[0];
        const msj = respuesta.data[1];
        // if(msj === 'success') {
          
        // }
        console.log(respuesta);
        console.log(msj);
        console.log(tipo);
        // console.log(respuesta);
        if (msj === "b") {
          show_alerta("Imagen no compatible o error en la solitud", "error");
          return;
        }

        show_alerta(msj, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
          fetchData(limite);
        }
        if (tipo === "error") {
          fetchData(limite);
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      });
  };
  const deleteProduct = (id, descripcion) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: ` <h1 className="text-warning">¿ Seguro ?</h1> que desea eliminar el admin <h1 className="text-danger">${descripcion}</h1>`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        envarSolicitud("DELETE", { id: id });
      } else {
        show_alerta("La orden de servicio no fue elimind", "info");
      }
    });
  };


  const handleRecargarDatos = () => {
    fetchData(limite);
  }
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="container-fluid">
      {(user.role === "administrador" || user.role === "administrativo") && 
      
        <div className="row mt-3">
          <div className="col-12 offset-md-12 menu-opciones-header flex-columns ">
            <div className="flex mx-auto gap-3  p-2  flex-wrap">
              
              
       {/* Botones para limite de resultados  */}
       <div className="btn bg-dark text-white   d-flex flex-column" >
        <i className="fa-solid fa-magnifying-glass"></i> limite de resultados
  <form onChange={handleResultados} >
       <ListaResultados />
   </form>

<div  role="group">
  <button onClick={() => openModal(1)}
                data-bs-toggle="modal"
                data-bs-target="#modalProducts" type="button" className="px-4  py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  <i className="fa-solid  fa-circle-plus flex flex-col text-green-600"></i> Nuevo
  </button>
  <button onClick={handleRecargarDatos}  type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  <i className="fa-solid fa-spinner  text-red-600 "></i> Recargar
  </button>

</div>
            </div>
            </div>
              </div>
            </div>
      }
     
        <div className="row mt-2">
          <div className="col-12 w-full">

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-center  text-gray-700 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                       
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                {(user.role === "administrador" || user.role === "jefe") && 
                <th scope="col" className="px-6 py-3 flex justify-center">
                Leida
                </th>
}
                <th scope="col" className="px-6 py-3">
                DESCRIPCION
                </th>
                <th scope="col" className="px-6 py-3">
                CREACION
                </th>
                <th scope="col" className="px-6 py-3">
                ACTUALIZACION
                </th>
                <th scope="col" className="px-6 py-3">
                CLIENTE
                </th>
                <th scope="col" className="px-6 py-3">
                CEDULA
                </th>
                <th scope="col" className="px-6 py-3">
                TELEFONO
                </th>
                <th scope="col" className="px-6 py-3">
                DIRECCION
                </th>
                <th scope="col" className="px-6 py-3">
                INSPECCION
                </th>
                {(user.role === "administrador") && 
                <th scope="col" className="px-6 py-3">
                OPCIONES
                </th>
                
                }
        
            </tr>
        </thead>
        <tbody>
        {pre_orden?.map((preordenes, i) => (
            <tr   key={preordenes.id} className="border-b dark:bg-gray-900 dark:border-gray-500 hover:bg-gray-500 dark:hover:bg-gray-600 notificacion-click">
            
                <td className="px-6 py-4 whitespace-nowrap">
                {i+1}
                </td>
                {(user.role === "administrador" || user.role === "jefe") && 
                
                
                <td  className="w-4 p-4 " id="notificacion">
               
                    {preordenes.estado === "0" ? 
                      <Link className="nav-link wave-effect"
                      to={`/orden/${preordenes.id}`}>
                <button onClick={() => {
                  handleActualizarNoti(i, preordenes.id);
                  // handleActualizarNoti2(i, preordenes.id);
                  setTimeout(() => {
                        fetchData(limite);
                    }, 1000)
                }} type="button"  className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 "><span >
                 
                   <i className="fa-solid fa-newspaper"></i>
                <span className="menu-title">NUEVA</span><br /> {preordenes.id}<br /> </span><i className="fa-solid fa-check"></i></button></Link>
              
                    : 
                 <>
                
                <button disabled type="button" className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 "><span >{preordenes.id}</span> <br /><i className="fa-solid fa-check-double"></i></button>
                 </>
                   
                } 
             
                        
                </td>
                }
                <td scope=""  className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white ">
                    {preordenes.descripcion}
                </td>
             
                <td className="px-6 py-4 whitespace-nowrap">
                {preordenes.creacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {preordenes.actualizacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {preordenes.cliente.nombres}
                </td>
                <td className="px-6 py-4">
                {preordenes.cliente.cedula}
                </td>
                <td className="px-6 py-4">
                {preordenes.cliente.telefono}
                </td>
                <td className="px-6 py-4">
                {preordenes.cliente.direccion}
                </td>
                <td className="px-6 py-4">
                {preordenes.inspeccion === '1' ? <i className="fa-solid fa-eye text-green-600 text-3xl"></i> : <i className="fa-solid fa-eye text-gray-500 text-3xl"></i>}
                </td>
                {(user.role === "administrador") && 
                
                <td className="px-6 py-4">
                <div
                          className="btn-group position-relative mt-3"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modalProducts"
                            onClick={() =>
                              openModal(2,
                                preordenes.id,
                                preordenes.descripcion,
                                preordenes.preorden_cliente,
                                preordenes.inspeccion
                              )
                            }
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          <button
                            onClick={() =>
                              deleteProduct(
                                preordenes.id,
                                preordenes.descripcion,
                              )
                            }
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            onClick={() =>
                              deleteProduct(
                                preordenes.id,
                                preordenes.descripcion
                              )
                            }
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-print"></i>
                          </button>
                        </div>
                </td>
                
                }
            </tr>
    ))}
     
        </tbody>
    </table>
</div>

          </div>
        </div>
      </div>
      {loading && (
        <>
         <Spinner />
        </>
      )}
      <div id="modalProducts"  className="modal fade " aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered"   >
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                id="btnCerrar"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" >

              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-creative-commons-nd"></i>
                </span>
                <textarea
                  id="descripcion" rows="6"
                  className="form-control"
                  placeholder="Decripcion de preorden"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              {/* <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-creative-commons-nd"></i>
                </span>
                <input
                  id="cliente"
                  className="form-control"
                  placeholder="Seleccione cliente de la pre orden"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                ></input>
              </div> */}
              
              <div>
              <div className="form-group">
                <label htmlFor="cliente" className=" fw-bold">Seleccione un cliente:</label>
                <select  onChange={(e) => setCliente(e.target.value)}  id="cliente" className="form-control">
                <option value="">Seleccione un cliente para la orden</option>
                   {selectClientes?.map((preordenes, i) => (
                    <option key={preordenes.id} value={preordenes.id}  className="text-center">{i} {preordenes.nombres}</option>
                  ))}
               
                </select>
              
              </div>
             </div>
              <div>
              <div className="form-group">
                <label htmlFor="inspeccion" className=" fw-bold">Requiere inspeccion ?</label>
                <select  onChange={(e) => setInspeccion(e.target.value)}  id="inspeccion" className="form-control">
                <option value="">Seleccione un cliente para la orden</option>
                   {requiereInspeccion?.map((preordenes, i) => (
                    <option key={preordenes.id} value={preordenes.id}  className="text-center">{i} {preordenes.inspeccion}</option>
                  ))}
               
                </select>
              
              </div>
             </div>
          
              <div className="d-grid  mx-auto w-100">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preordenes;
