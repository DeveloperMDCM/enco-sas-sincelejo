import React, { useEffect, useState, useId } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import CambioPaginas from "./CambioPaginas";
import "../Spinner.css";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";
import ListaResultados from "./ListaResultados";
import CategoriasProductos from "./CategoriasProductos";
import Spinner from "./Spinner";
let limite = 'limite=10'
let categoriaProducto = ''
const Productos = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}producto.php`;
  const { response, error, loading, fetchData } = useFetch(url);
//   console.log(response) ;
  const AsignacionCategoria = `${import.meta.env.VITE_BACKEND_URL}selectCategoriaProducto.php`;
  const { productos } = response;
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [description, setIdescription] = useState("");
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
  const [selectCategoria, setSelecCategoria] = useState([])

  const handleResultados = (e) => {
    limite = (`limite=${e.target.value}`)
    console.log(limite);
    if(e.target.value === ''){
      fetchData(limite, categoriaProducto);
    }
    
    if(limite != undefined || limite != null) {
      fetchData(limite, categoriaProducto);
    }
}
  const handleCategorias = (e) => {
    categoriaProducto = (`categoria=${e.target.value}`)
    if(e.target.value === ''){
      fetchData(limite, categoriaProducto);
    }
   
    fetchData(limite, categoriaProducto);
  
    
}
useEffect(() => {
  axios.get(AsignacionCategoria).then(res => {
    setSelecCategoria(res.data.Categorias_Productos)
  });
}, [])
  const openModal = (
    op,
    id,
    nombre,
    description,
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
      document.querySelector("#btnCerrar").addEventListener('click', () => {
        document.querySelector("#categoriaId").value = '';
      }
      )
    }, 500);
  };
  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        nombre: nombre.trim(),
        description: description.trim(),
        foto: document.querySelector("#foto").value.split(/(\\|\/)/g).pop() || foto,
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
        foto: document.querySelector("#foto").value.split(/(\\|\/)/g).pop() || foto,
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
          fetchData(limite, categoriaProducto);
        }
        // if (tipo === "error") {
        //   alert('errr9r')
        // }
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
    fetchData(limite, categoriaProducto);
  }
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="container-fluid">
        <div className="row mt-3">
      <CambioPaginas />
          <div className="col-12 offset-md-12 menu-opciones-header">
            <div className="d-grid mx-auto">
             {/* Botones para limite de resultados  */}
             <div className="btn bg-dark text-white   d-flex flex-column" >
        <i className="fa-solid fa-magnifying-glass"></i> limite de resultados
          <div onChange={handleResultados} >
              <ListaResultados />
          </div>
          <div onChange={handleCategorias} className="flex flex-col" >
              <CategoriasProductos />
          </div>

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
        <div className="row mt-2">
          <div className="col-12 w-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
         <div className="flex items-center justify-between  dark:bg-gray-900"> 
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                    <th scope="col" className="px-6 py-3">id</th>
                    <th scope="col" className="px-6 py-3">NOMBRE</th>
                    <th scope="col" className="px-6 py-3">Descripcion</th>
                    <th scope="col" className="px-6 py-3">FOTO</th>
                    <th scope="col" className="px-6 py-3">UNIDAD MEDIDA</th>
                    <th scope="col" className="px-6 py-3">REFERENCIA</th>
                    <th scope="col" className="px-6 py-3">MARCA</th>
                    <th scope="col" className="px-6 py-3">CANTIDAD</th>
                    <th scope="col" className="px-6 py-3">USUARIO</th>
                    <th scope="col" className="px-6 py-3">CATEGORIA</th>
                    <th scope="col" className="px-6 py-3">OPCIONES</th>
            </tr>
        </thead>

                <tbody className="table-group-divider  text-center">
                  {productos?.map((productos, i) => (
                    <tr key={productos.id} className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {/* <td>{(administradores.id)}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap">{i+1}</td>
                      <td className="px-6 py-4">{productos.nombre}</td>
                      <td className="px-6 py-4 ">{productos.description}</td>
                      <td className="px-6 py-4">
                        <img
                          data-bs-toggle="modal"
                          onClick={handleImagenModal}
                          data-bs-target="#modaladmins"
                          className="w-12 h-12 rounded-full"
                          src={`http://localhost/proyectoenco/Backend/images/${productos.foto}`}
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
                              <div className="modal-header bg-gray-600">
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
                      <td className="px-6 py-4">{productos.unidadmedida}</td>
                      <td className="px-6 py-4">{productos.referencia}</td>
                      <td className="px-6 py-4">{productos.marca}</td>
                      <td  className="px-6 py-4 whitespace-nowrap">{productos.cantidad <= 10 ? <span className="mx-2 text-white font-bold bg-red-600 p-2 rounded-2xl">{productos.cantidad}</span> : productos.cantidad <=20 ? <span className=" text-white font-bold bg-yellow-600 p-2 rounded-2xl">{productos.cantidad}</span> : <span className="mx-2 text-white font-bold bg-green-600 p-2 rounded-2xl">{productos.cantidad}</span>}</td>
                      
                      {/* <td className="px-6 py-4">{productos.cantidad <= 10 ? <span className="badge rounded-pill text-bg-danger">{productos.cantidad}  </span>: <span >{productos.cantidad <=20 ?  <span className="badge rounded-pill text-bg-warning ">{productos.cantidad}</span> :  <span className="badge rounded-pill text-bg-success">{productos.cantidad}</span> }</span> }</td> */}
                      <td className="px-6 py-4">{productos.categorias.nombres} {productos.categorias.apellidos}</td>
                      <td className="px-6 py-4">{productos.categorias.categoria}</td>
                      <td>
                        <div
                          className="btn-group"
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
                                productos.nombre
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
                                productos.nombre
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
        </div>
      {loading && (
        <>
          <Spinner />
        </>
      )}
       <iframe name="dummyframe" id="dummyframe" hidden ></iframe>
                <form method="POST" target="dummyframe" id="formulario-registro" action="http://localhost/proyectoenco/Backend/upload.php" encType="multipart/form-data">
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
                  placeholder="Foto producto"
                  onChange={() => {
                  
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
          
              <div className="form-group">
                <label htmlFor="" className=" fw-bold">Seleccione un rol para cliente:</label>
                <select  onChange={(e) => setCategoria(e.target.value)}  id="categoriaId" className="form-control">
                <option value="">Seleccione una categoria</option>
                   {selectCategoria?.map((categoria, i) => (
                    <option key={categoria.id} value={categoria.id}  className="text-center">{categoria.categoria}</option>
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
      </form>
    </>
  );
};

export default Productos;
