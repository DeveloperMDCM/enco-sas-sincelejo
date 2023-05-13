import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import { formatearDinero } from "../helpers";
import "../Spinner.css";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";
import ListaResultados from "./ListaResultados";
import Spinner from "./Spinner";
const Herramientas = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}herramientas.php`;
  const { response, error, loading, fetchData } = useFetch(url);
//   console.log(response) ;
  const { productos } = response;
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [description, setIdescription] = useState("");
  const [precio, setPrecio] = useState("");
  const [foto, setFoto] = useState("");
  const [unidadmedida, setUnidadMedida] = useState("");
  const [referencia, setReferencia] = useState("");
  const [marca, setMarca] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [id_administrador, setIdAdministrador] = useState("");
  const [categoriaId, setCategoria] = useState("");
  const [operation, setOperation] = useState(1);
  const [fotoModal, setFotoModal] = useState("");
  const [title, setTitle] = useState("");
  const [limite, setLimite] = useState('');
  const handleResultados = (e) => {
    if(e.target.value === ''){
      fetchData();
      
    }
    fetchData(`limite=${e.target.value}`);
    setLimite(`limite=${e.target.value}`)
    
}

  const openModal = (
    op,
    id,
    nombre,
    description,
    precio,
    foto,
    unidadmedida,
    referencia,
    marca,
    cantidad,
    id_administrador,
    categoriaId
  ) => {
    setId("");
    setNombre("");
    setIdescription("");
    setPrecio("");
    setFoto("");
    setUnidadMedida("");
    setReferencia("");
    setMarca("");
    setCantidad("");
    setIdAdministrador("");
    setCategoria("");
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar Producto nuevo");
    } else if (op === 2) {
      setTitle("Editar administrador");
      setId(id);
      setNombre(nombre);
      setIdescription(description);
      setPrecio(precio);
      setFoto(foto);
      setUnidadMedida(unidadmedida);
      setReferencia(referencia);
      setMarca(marca);
      setCantidad(cantidad);
      setIdAdministrador(id_administrador);
      setCategoria(categoriaId);
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        nombre: nombre.trim(),
        description: description.trim(),
        precio: precio.trim(),
        foto: foto,
        unidadmedida: unidadmedida.trim(),
        referencia: referencia.trim(),
        marca: marca.trim(),
        cantidad: cantidad.trim(),
        id_administrador: id_administrador.trim(),
        categoriaId: categoriaId.trim(),
      };
      metodo = "POST";
    } else {
      parametros = {
        id: id,
        nombre: nombre.trim(),
        description: description.trim(),
        precio: precio.trim(),
        foto: foto,
        unidadmedida: unidadmedida.trim(),
        referencia: referencia.trim(),
        marca: marca.trim(),
        cantidad: cantidad.trim(),
        id_administrador: id_administrador.trim(),
        categoriaId: categoriaId.trim(),
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
  const deleteProduct = (id, nombres) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: ` <h1 className="text-warning">¿ Seguro ?</h1> que desea eliminar el admin <h1 className="text-danger">${nombres}</h1>`,
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
    fetchData(limite);
  }
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid">
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
                Producto
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
        <div className="row mt-2">
          <div className="col-12">
            <div className="table-responsive table caption-top ">
              <table className="table  table-striped  fw-semibold  table-hover  fw-bold  table-dark text-info text-opacity-75">
              <caption className="text-center">Lista de administradores</caption>
                <thead className="text-center table-dark text-danger">
                  <tr>
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>description</th>
                    <th>PRECIO</th>
                    <th>FOTO</th>
                    <th>UNIDAD MEDIDA</th>
                    <th>REFERENCIA</th>
                    <th>MARCA</th>
                    <th>CANTIDAD</th>
                    {/* <th>USUARIO</th> */}
                    <th>CATEGORIA</th>
                    <th>OPCIONES</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider text-success">
                  {productos?.map((productos, i) => (
                    <tr key={productos.id} className="text-center ">
                      {/* <td>{(administradores.id)}</td> */}
                      <td>{i + 1}</td>
                      <td>{productos.nombre}</td>
                      <td>{productos.description}</td>
                      <td>{formatearDinero(productos.precio)}</td>
                      <td>
                        <img
                          data-bs-toggle="modal"
                          onClick={handleImagenModal}
                          data-bs-target="#modaladmins"
                          className="border rounded"
                          src={`data:image/jpg;png;jpeg;base64,${productos.foto}`}
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
                                  Foto del producto
                                  
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
                      <td>{productos.unidadmedida}</td>
                      <td>{productos.referencia}</td>
                      <td>{productos.marca}</td>
                      <td>{productos.cantidad <= 10 ? 
                      <span className="badge rounded-pill text-bg-danger">{productos.cantidad}  </span>
                       : 
                        <span >{productos.cantidad <=20 ?  <span className="badge rounded-pill text-bg-warning ">{productos.cantidad}</span> :  <span className="badge rounded-pill text-bg-success">{productos.cantidad}</span> }</span> }
                       </td>
                      {/* <td>{productos.id_administrador}</td> */}
                      <td>{productos.categorias.categoria}</td>
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
                                productos.id,
                                productos.nombre,
                                productos.description,
                                productos.precio,
                                productos.foto,
                                productos.unidadmedida,
                                productos.referencia,
                                productos.marca,
                                productos.cantidad,
                                productos.id_administrador,
                                productos.categoriaId
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
                                productos.id,
                                productos.nombres
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
                                productos.id,
                                productos.nombres
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
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre producto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setIdescription(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Precio del producto"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                ></input>
              </div>
              
             
            {/* foto del producto */}
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
                        show_alerta("Este archivo no es una imagen", "error");
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
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="unidadmedida"
                  className="form-control"
                  placeholder="Unidad de medida"
                  value={unidadmedida}
                  onChange={(e) => setUnidadMedida(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="referencia"
                  className="form-control"
                  placeholder="Referencia"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                ></input>
              </div>
              
              
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="marca"
                  className="form-control"
                  placeholder="Marca"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                ></input>
              </div>
              
              
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="cantidad"
                  className="form-control"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                ></input>
              </div>
              
              
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="id_administrador"
                  className="form-control"
                  placeholder="usuario creador"
                  value={id_administrador}
                  onChange={(e) => setIdAdministrador(e.target.value)}
                ></input>
              </div>
              
              
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-product-hunt"></i>
                </span>
                <input
                  type="text"
                  id="categoriaId"
                  className="form-control"
                  placeholder="Categoria"
                  value={categoriaId}
                  onChange={(e) => setCategoria(e.target.value)}
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

export default Herramientas;
