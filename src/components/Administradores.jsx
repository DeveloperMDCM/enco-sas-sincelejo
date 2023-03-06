import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import "../Spinner.css";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";

const Administradores = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { administrador } = response;
  const [id, setId] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombres, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [operation, setOperation] = useState(1);
  const [fotoModal, setFotoModal] = useState("");
  const [title, setTitle] = useState("");
  const openModal = (
    op,
    id,
    cedula,
    nombres,
    apellido,
    correo,
    foto,
    telefono,
    rol
  ) => {
    setId("");
    setCedula("");
    setNombre("");
    setApellido("");
    setTelefono("");
    setFoto("");
    setCorreo("");
    setRol("");
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar administrador");
    } else if (op === 2) {
      setTitle("Editar administrador");
      setId(id);
      setCedula(cedula);
      setNombre(nombres);
      setApellido(apellido);
      setCorreo(correo);
      setFoto(foto);
      setTelefono(telefono);
      setRol(rol);
      // console.log(foto);
    }
    window.setTimeout(function () {
      document.getElementById("cedula").focus();
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        nombres: nombres.trim(),
        cedula: cedula.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
        foto: foto,
        correo: correo.trim(),
        rol: rol.trim(),
      };
      metodo = "POST";
    } else {
      parametros = {
        id: id,
        cedula: cedula.trim(),
        nombres: nombres.trim(),
        apellido: apellido.trim(),
        correo: correo.trim(),
        foto: foto,
        telefono: telefono.trim(),
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
          show_alerta("Imagen no compatible o error en la solitud", "error");
          return;
        }

        show_alerta(msj, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
          fetchData();
        }
        if (tipo === "error") {
          fetchData();
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
      title: ` <h1 class="text-warning">¿ Seguro ?</h1> que desea eliminar el admin <h1 class="text-danger">${nombres}</h1>`,
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
  const handleImagenModal = (e) => {
    setFotoModal(e.target.src);
  };

  const handleRecargarDatos = () => {
    fetchData();
  }
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
              >
                <i className="fa-solid fa-circle-plus w-100"></i> Añadir nuevo
                administrador
              </button>
            
        
        <button className="btn btn-danger mt-1" onClick={handleRecargarDatos}>
        <i className="fa-solid fa-spinner "></i> Recargar Datos
        </button>
        </div>
           
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <div className="table-responsive table caption-top ">
              <table className="table  table-striped  fw-semibold  table-hover  fw-bold  table-dark text-info text-opacity-75">
              <caption className="text-center">Lista de administradores</caption>
                <thead className="text-center table-dark text-danger">
                  <tr>
                    <th>#</th>
                    <th>CEDULA</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>CORREO</th>
                    <th>FOTO</th>
                    <th>TELEFONO</th>
                    <th>USUARIO</th>
                    <th>ROL</th>
                    <th>OPCIONES</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider text-success">
                  {administrador?.map((administradores, i) => (
                    <tr key={administradores.id} className="text-center ">
                      {/* <td>{(administradores.id)}</td> */}
                      <td>{i + 1}</td>
                      <td>{administradores.cedula}</td>
                      <td>{administradores.nombres}</td>
                      <td>{administradores.apellidos}</td>
                      <td>{administradores.correo}</td>
                      <td>
                        <img
                          data-bs-toggle="modal"
                          onClick={handleImagenModal}
                          data-bs-target="#modaladmins"
                          className="border rounded"
                          src={`data:image/jpg;png;jpeg;base64, ${administradores.foto}`}
                          alt="Foto admin"
                          width={70}
                          height={70}
                        />

                        <div
                          className="modal fade  text-center "
                          id="modaladmins"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header bg-info">
                                <h1
                                  className="modal-title fs-5"
                                  id="modaladminsLabel"
                               
                                >
                                  Foto administrador
                                  
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <img
                                  className="border rounded w-100"
                                  src={fotoModal}
                                  alt="Foto admin"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{administradores.telefono}</td>
                      <td>{administradores.login.username}</td>
                      <td>{administradores.rol ? "Administrador" : null}</td>
                      <td>
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
                                administradores.apellidos,
                                administradores.correo,
                                administradores.foto,
                                administradores.telefono,
                                administradores.rol
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
                            className="btn btn-primary"
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
      </div>
      {loading && (
        <>
          <div className="d-flex justify-content-center mb-5 mt-5">
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>
          <h1 className="text-center">Espere un momento...</h1>
        </>
      )}
      <div id="modalProducts"  className="modal fade" aria-hidden="true">
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
                  className="form-control"
                  placeholder="Cedula"
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
                  placeholder="Nombres"
                  value={nombres}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user-alt"></i>
                </span>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  placeholder="Apellidos"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
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
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa fa-camera"></i>
                </span>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/png, image/jpg, image/jpeg"
                  className="form-control formulario-administrador"
                  placeholder="Foto administrador"
                  onChange={(e) => {
                    const toBase64 = (file) =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () =>
                          resolve(
                            reader.result.split("base64")[1].split(",")[1]
                          );
                        reader.onerror = (error) => reject(error);
                      });

                    async function Main() {
                      const file = e.target.files[0];
                      //    console.log(await toBase64(file));
                      setFoto(await toBase64(file));
                    }

                    function fileValidation() {
                      var fileInput = document.getElementById("foto");

                      var filePath = fileInput.value;

                      // Allowing file type
                      var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
                      if (!allowedExtensions.exec(filePath)) {
                        show_alerta("Formato no valido", "error");
                        fileInput.value = "";
                        return false;
                      }
                      Main();
                    }
                    fileValidation();
                  }}
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
                  placeholder="Telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="rol"
                  className="form-control"
                  placeholder="Telefono"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                ></input>
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

export default Administradores;
