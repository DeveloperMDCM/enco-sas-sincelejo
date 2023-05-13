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
const NotasGeneral = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}notas.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { notas } = response;
  const [id, setId] = useState("");
  const [nota, setNota] = useState("");
  const [limite, setLimite] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const handleResultados = (e) => {
   
    fetchData(`limite=${e.target.value}`);
    setLimite(`limite=${e.target.value}`)
    
}



const {user} = useContext(UserContext);
  
  const openModal = (
    op,
    id,
    nota,
  ) => {
    setId("");
    setNota("");
    setOperation(op);
    if (op === 1) {
      setTitle("Crear una nota");
    } else if (op === 2) {
      setTitle("Editar nota");
      setId(id);
      setNota(nota);
      // console.log(foto);
    }
    window.setTimeout(function () {
      document.getElementById("nota").focus();
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        nota: nota.trim(),
      };
      metodo = "POST";
    } else {
      parametros = {
        id: id,
        nota: nota.trim(),
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
        console.log(respuesta);
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
  const deleteProduct = (id, nota) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: ` <h1 className="text-warning">¿ Seguro ?</h1> que desea eliminar la nota <h1 className="text-danger">${nota}</h1>`,
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
          <>
          {user.role === 'administrador'  &&
        <div className="row mt-3">
          <div className="col-12 offset-md-12 menu-opciones-header">
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
              >
                <i className="fa-solid fa-circle-plus"></i> Añadir nuevo
                Cliente
              </button>
        
        <button className="btn btn-danger mt-1" onClick={handleRecargarDatos}>
        <i className="fa-solid fa-spinner "></i> Recargar Datos
        </button>
       {/* Botones para limite de resultados  */}
        <form onChange={handleResultados} >
        <div className="btn bg-dark text-white mt-1 d-flex flex-column" >
        <i className="fa-solid fa-magnifying-glass"></i> limite de resultados
       <ListaResultados />
        </div>
   </form>
        </div>
           
          </div>
        </div>
          
          
          }
          </>
<>
<div>


</div>
</>
        <div className="row mt-2">
          <div className="col-12">
            <div className="table-responsive table caption-top ">
             
              <h1 className="text-center mb-3">Lista para la oficina</h1>
               
               <div className="d-flex mx-auto gap-3 flex-wrap text-center justify-content-center">
 
                  {notas?.map((notas, i) => (
                    <div key={notas.id} className="text-center">
                      {/* <td>{(administradores.id)}</td> */}
                      <div className="card border-primary mb-3 " >
                      <div className="p-2 font-bold bg-indigo-900 rounded-2 text-white">Nota</div>
                      <div className="card-body text-primary">
                        <h5 className="card-title">{notas.nota}</h5>
                        <p className="card-text">{notas.descripcion}</p>
                      </div>

                      {(user.role === "administrador") &&  
                      
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
                                notas.id,
                                notas.nota
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
                                notas.id,
                                notas.nota
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
                                notas.id,
                                notas.nota
                              )
                            }
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-print"></i>
                          </button>
                        </div>
                      }
                    </div>
                
                    </div>
                  ))}
               </div>
        
   
            </div>
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
                <textarea
                  type="text"
                  id="nota"
                  className="form-control formulario-administrador"
                  placeholder="Descripcion de la nota"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                ></textarea>
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

export default NotasGeneral;
