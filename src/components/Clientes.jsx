import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";
import ListaResultados from "./ListaResultados";
import {useContext} from 'react'
import {UserContext} from '../context/AuthProvider'
import Spinner from "./Spinner";
import CambioPaginas from "./CambioPaginas";
import ClienteHistorial from "./ClienteHistorial";
const Clientes = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}cliente.php`;
  const AsignacionRol = `${import.meta.env.VITE_BACKEND_URL}role.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { clientes } = response;
  const [id, setId] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombres, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [limite, setLimite] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [selectRol, setSelectRol] = useState([])
  const handleResultados = (e) => {
    if(e.target.value === ''){
      fetchData();
      
    }
    fetchData(`limite=${e.target.value}`);
    setLimite(`limite=${e.target.value}`)
    
}


useEffect(() => {
  axios.get(AsignacionRol).then(res => {
    setSelectRol(res.data.roles)
  });
}, [])

const {user} = useContext(UserContext);
  
  const openModal = (
    op,
    id,
    cedula,
    nombres,
    telefono,
    direccion,
    correo,
    rol
  ) => {
    setId("");
    setCedula("");
    setNombre("");
    setTelefono("");
    setDireccion("")
    setCorreo("");
    setRol("");
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar Cliente");
    } else if (op === 2) {
      setTitle("Editar Cliente");
      setId(id);
      setCedula(cedula);
      setNombre(nombres);
      setTelefono(telefono);
      setDireccion(direccion);
      setCorreo(correo);
      setRol(rol);
      // console.log(foto);
    }
    window.setTimeout(function () {
      document.getElementById("cedula").focus();
    }, 500);
    document.querySelector("#btnCerrar").addEventListener('click', () => {document.querySelector("#rol").value = ''}) 
  };

  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        cedula: cedula.trim(),
        nombres: nombres.trim(),
        telefono: telefono.trim(),
        direccion: direccion.trim(),
        correo: correo.trim(),
        rol: rol.trim(),
      };
      metodo = "POST";
    } else {
      parametros = {
        id: id,
        cedula: cedula.trim(),
        nombres: nombres.trim(),
        telefono: telefono.trim(),
        direccion: direccion.trim(),
        correo: correo.trim(),
        rol: rol.trim(),
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
        // console.log(respuesta);
        if (msj === "b") {
          show_alerta("No se a podido establecer conexion con el servidor", "error");
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
        if(error) {
          show_alerta("No se a podido establecer conexion con el servidor", "error");
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      });
  };
  const deleteProduct = (id, nombres) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: ` <h1 class="text-warning">¿ Seguro ?</h1> que desea eliminar el cliente <h1 class="text-danger">${nombres}</h1>`,
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
        show_alerta("El Admin NO fue eliminado", "info");
      }
    });
  };

  const handleCerrar = () => {
    const formulario = document.querySelector(".formulario-administrador");
    formulario.value = '';
  };


  const handleRecargarDatos = () => {
    fetchData();
  }
  return (
    <>
   
        <Header />
       
       
        <div className="container-fluid">
        <div className="row mt-3">
      <CambioPaginas />
          <div className="col-12 offset-md-12 menu-opciones-header">
            <div className="d-grid mx-auto">
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
       
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
         <div className="flex items-center justify-between   dark:bg-gray-900"> 
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                    <th scope="col" className="px-6 py-3">id</th>
                    <th scope="col" className="px-6 py-3">CEDULA</th>
                    <th scope="col" className="px-6 py-3">NOMBRES</th>
                    <th scope="col" className="px-6 py-3">DIRECCION</th>
                    <th scope="col" className="px-6 py-3">TELEFONO</th>
                    <th scope="col" className="px-6 py-3">CORREO</th>
                    <th scope="col" className="px-6 py-3">OPCIONES</th>
            </tr>
        </thead>
                <tbody className="table-group-divider text-center">
                  {clientes?.map((administradores, i) => ( 
                    <tr key={administradores.id} className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                      {/* <td>{(administradores.id)}</td> */}
                      <td>{i + 1}</td>
                      <td>{administradores.cedula}</td>
                      <td>{administradores.nombres}</td>
                      <td>{administradores.direccion}</td>
                      <td>{administradores.telefono}</td>
                      <td>{administradores.correo}</td>
                      <td className="px-6 py-3">
                        <div
                          className="btn-group position-relative mt-3"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modalProducts"
                            onClick={() =>
                              openModal(
                                2,
                                administradores.id,
                                administradores.cedula,
                                administradores.nombres,
                                administradores.telefono,
                                administradores.direccion,
                                administradores.correo,
                                administradores.rol,
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
                                administradores.id,
                                administradores.nombres
                              )
                            }
                            type="button"
                            className="btn btn-primary "
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button 
                            onClick={() =>
                              deleteProduct(
                                administradores.id,
                                administradores.nombres
                              )
                            }
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-print"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     
      {loading && (
        <>
      <Spinner />
        </>
      )}
   
      <div id="modalProducts"  className="modal fade" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered"   >
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"  onClick={handleCerrar}
                id="btnCerrar"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" >

              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-id-card"></i>
                </span>
                <input
                  type="text"
                  id="cedula"
                  className="form-control formulario-administrador"
                  placeholder="Cedula del cliente"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user-alt"></i>
                </span>
                <input
                  type="text"
                  id="nombres"
                  className="form-control"
                  placeholder="Nombre completo del cliente"
                  value={nombres}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="telefono"
                  className="form-control"
                  placeholder="Telefono de cliente"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-solid fa-street-view"></i>
                </span>
                <input
                  type="text"
                  id="direccion"
                  className="form-control"
                  placeholder="Direccion de cliente"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  id="correo"
                  className="form-control"
                  placeholder="Correo Electronico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="" className=" fw-bold">Seleccione un rol para cliente:</label>
                <select  onChange={(e) => setRol(e.target.value)}  id="rol" className="form-control">
                <option value="">Seleccione un rol para el cliente</option>
                   {selectRol?.map((rol, i) => (
                    <option key={rol.id} value={rol.id}  className="text-center">{rol.rol}</option>
                  ))}
               
                </select>
              </div>
              <div className="d-grid col-6 mx-auto w-100">
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

export default Clientes;
