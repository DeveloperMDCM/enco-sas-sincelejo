import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import "../Spinner.css";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useFetch } from "../useFetch";
import ListaResultados from "./ListaResultados";
import {useContext} from 'react'
import {UserContext} from '../context/AuthProvider'
import Spinner from "./Spinner";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker  from "react-datepicker";
// import Busqueda from "./Busqueda";
import moment from 'moment';
import momentPTBR from 'moment/src/locale/es';
import { useParams } from "react-router-dom";

function prepareLocale(locale) {
  for (const key in locale) {
    if (locale.hasOwnProperty(key)) {
      // remove first character underscore fom key, i.e. '_calendar' => 'calendar'
      locale[key.substring(1)] = locale[key];
    }
  }
  return locale;
}

moment.defineLocale('es', prepareLocale(momentPTBR));

const Ordenes = () => {
  const { orden_servicio } = useParams()
  console.log(orden_servicio);
  const url = `${import.meta.env.VITE_BACKEND_URL}orden.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  // console.log(response);
  const PreOrdenesSelectUrl = `${import.meta.env.VITE_BACKEND_URL}selectPreordenModel.php?id=${orden_servicio}`;
  const AsignacionTecnico = `${import.meta.env.VITE_BACKEND_URL}selectAsignarTecnico.php`;
  const AsignarCategoria = `${import.meta.env.VITE_BACKEND_URL}selectAsignarCategoria.php`;
  const AsignarSubCategoria = `${import.meta.env.VITE_BACKEND_URL}selectAsignarSubcategoria.php`;
  const AsignarCreador = `${import.meta.env.VITE_BACKEND_URL}selectCreador.php`;
  const { ordenes } = response;
  const [id, setId] = useState("");
  const [ordenTrabajo, setOrdenTrabajo] = useState("");
  const [ordenTecnico, setOrdenTecnico] = useState("");
  const [preOrden, setPreOrden] = useState("");
  const [creadorOrden, setCreadorOrden] = useState("");
  const [title, setTitle] = useState("");
  const [inicio, setInicio] = useState('');
  const [finaliza, setFinaliza] = useState('');
  const [operation, setOperation] = useState(1);
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [selectPreOrden, setSelectPreOrden] = useState([])
  const [selectTecnicoAsignado, setTecnicoAsignado] = useState([])
  const [selectCategoria, setSelectCategoria] = useState([])
  const [selectSubCategoria, setSelectSubCategoria] = useState([])
  const [selectCreador, setSelectCreador] = useState([])
  const [limite, setLimite] = useState('');
  const [nuevaAgenda, setNuevaAgenda] = useState({ inicio: "", finaliza: "" });
  const OrdenTrabajo = () => {

    axios.get(PreOrdenesSelectUrl).then(res => {
      setSelectPreOrden(res.data.pre_ordenes)
     
    });
  }
  const handleResultados = (e) => {
    // if(e.target.value === ''){
    //   fetchData();
      
    // }
 
    fetchData(`limite=${e.target.value}`);
    setLimite(`limite=${e.target.value}`);
    
  }


    


const {user} = useContext(UserContext);
useEffect(() => {
  setTimeout(() => {
    document.querySelector('#boton-crear').click();
  },500)  
  axios.get(AsignacionTecnico).then(res => {
    setTecnicoAsignado(res.data.tecnico_asignado)
  });
  axios.get(AsignarCategoria).then(res => {
    setSelectCategoria(res.data.Categorias_orden)
  });
  axios.get(AsignarSubCategoria).then(res => {
    setSelectSubCategoria(res.data.Subcategorias_orden)
  });
  
  axios.get(AsignarCreador).then(res => {
    setSelectCreador(res.data.Creadores)
  });

}, [])

// console.log(ordenTrabajo);
  const openModal = (
    op,
    id,
    ordenTrabajo,
    ordenTecnico,
    preOrden,
    inicio,
    finaliza,
    categoria,
    subcategoria,
    creadorOrden
,
  ) => {
    setId("");
    setOrdenTrabajo('');
    setOrdenTecnico('');
      setPreOrden('');
      setInicio("");
      setFinaliza("");
      setCategoria("");
      setSubcategoria("");
      setCreadorOrden("");

      // setNuevaAgenda('')
    setOperation(op);

    if (op === 1) {
      setTitle("Registrar Orden");
    } else if (op === 2) {
      setTitle("Editar Orden");
      setId(id);
      setOrdenTrabajo(ordenTrabajo);
      setOrdenTecnico(ordenTecnico);
      setPreOrden(preOrden);
      setInicio(inicio);
      setFinaliza(finaliza);
      setCategoria(categoria);
      setSubcategoria(subcategoria);
      setCreadorOrden(creadorOrden);
      // console.log(foto);
    }
    window.setTimeout(function () {
      document.getElementById("ordenTrabajo").focus();
      document.querySelector("#btnCerrar").addEventListener('click', () => {
        document.querySelector("#creadorOrden").value = ''
        document.querySelector("#subcategoria").value = ''
        document.querySelector("#inicio").value = ''
        document.querySelector("#finaliza").value = ''
        document.querySelector("#categoria").value = ''
      }
        ) 
    }, 500);
  };

  const validar = () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        ordenTrabajo: ordenTrabajo.trim().concat(' Orden de trabajo') ,
        ordenTecnico: ordenTecnico.trim(),
        preOrden: preOrden.trim(),
        inicio:   inicio.trim() ,
        finaliza:  finaliza.trim(),
        categoria: categoria.trim(),
        subcategoria: subcategoria.trim(),
        creadorOrden: creadorOrden.trim(),
      };
      metodo = "POST";
    } else {
      parametros = {
        id:id,
        ordenTrabajo: ordenTrabajo.trim(),
        ordenTecnico: ordenTecnico.trim(),
        preOrden: preOrden.trim(),
        inicio:   inicio.trim(),
        finaliza:  finaliza.trim(),
        categoria: categoria.trim(),
        subcategoria: subcategoria.trim(),
        creadorOrden: creadorOrden.trim()
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

        show_alerta(msj, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
          fetchData(limite);
        }
        if (tipo === "errpr" ) {
          show_alerta(msj, 'info');
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "success");
        console.log(error);
      });
  };
  const deleteProduct = (id, ordenTrabajo) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: ` <h1 class="text-warning">¿ Seguro ?</h1> que desea eliminar el admin <h1 class="text-danger">${ordenTrabajo}</h1>`,
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

  const handleRecargarDatos = () => {
    fetchData(limite);
  }


  return (
    <>
     
        <Header />
        <div className="container-fluid">
          <>
          {(user.role === "administrador" || user.role === "jefe") && 
          
          
          
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
           
              <button onClick={() => {

                openModal(1) 
                setTimeout(() => {
                  OrdenTrabajo()
                },500)  
              } 
             
            }
                data-bs-toggle="modal"
                data-bs-target="#modalProducts" type="button" id="boton-crear" className="px-4  py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          <i className="fa-solid  fa-circle-plus flex flex-col text-green-600 " ></i> Nuevo
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
          </>
      
          <div className="row mt-2">
          <div className="col-12 w-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {/* <caption className="text-center">Lista de Ordenes de trabajo</caption> */}
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">PREORDEN</th>
                    <th scope="col" className="px-6 py-3">ORDEN</th>
                    <th scope="col" className="px-6 py-3">CREADA</th>
                    <th scope="col" className="px-6 py-3">ASIGNADA</th>
                    <th scope="col" className="px-6 py-3">¿REALIZADA?</th>
                    <th scope="col" className="px-6 py-3">USUARIO</th>
                    <th scope="col" className="px-6 py-3">Categoria</th>
                    <th scope="col" className="px-6 py-3">Subcategoria</th>
                    <th scope="col" className="px-6 py-3">Inpeccion</th>
                    {(user.role === "administrador") && 
                    <th scope="col" className="px-6 py-3">OPciones</th>
                    }
            </tr>
                </thead>

                <tbody className="table-group-divider text-center">
                  {ordenes?.map((preordenes, i) => (
                    <tr key={preordenes.id} className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4">{preordenes.asignada.pre_orden}</td>
                      <td  className="px-6 py-4">{preordenes.orden}</td>
                      <td  className="px-6 py-4 whitespace-nowrap">{preordenes.asignada.Admnombre} {preordenes.asignada.Admapellido}</td>
                      <td  className="px-6 py-4 whitespace-nowrap">{preordenes.asignada.Tnombres} {preordenes.asignada.Tapellidos}</td>
                      {/* <td>{ordenes.asignada.cedula_adm}</td> */}
                      {/* <td>{ordenes.asignada.cedula_tec}</td> */}
                      <td  className="px-6 py-4 whitespace-nowrap">{preordenes.asignada.realizada === '0' ? <span className="mx-2 text-white font-bold bg-red-600 p-2 rounded-2xl">Pendiente</span> : preordenes.asignada.realizada === '1' ? <span className=" text-white font-bold bg-yellow-600 p-2 rounded-2xl">En proceso</span> : <span className="mx-2 text-white font-bold bg-green-600 p-2 rounded-2xl">Finalizada</span>}</td>
                      <td  className="px-6 py-4">{preordenes.asignada.name}</td>
                      <td  className="px-6 py-4">{preordenes.asignada.categoria}</td>
                      <td  className="px-6 py-4">{preordenes.asignada.subcategoria}</td>
                      <td className="px-6 py-4">
                {preordenes.asignada.inspeccion === '1' ? <i className="fa-solid fa-eye text-green-600 text-3xl"></i> : <i className="fa-solid fa-eye text-gray-500 text-3xl"></i>}
                </td>
                      {(user.role === "administrador") && 
                      
                      <td  className="px-6 py-4">
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
                                preordenes.orden,
                                preordenes.ordenTecnico,
                                preordenes.preorden,
                                preordenes.inicio,
                                preordenes.finaliza,
                                preordenes.Categoria,
                                preordenes.SubCategoria,
                                preordenes.creadorDeOrden,
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
                                preordenes.orden,

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
                                preordenes.orden
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
            <div className="modal-header text-bg-success">
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

                {/* Orden de trabajo  */}
              <input type="hidden" id="id"></input>
              <label htmlFor="" className=" fw-bold">Orden de trabajo</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-creative-commons-nd"></i>
                </span>
                <textarea
                  id="ordenTrabajo"
                  rows="4" cols="50"
                  className="form-control text-center"
                  placeholder="Decripcion de orden gf"
                  value={ordenTrabajo}
                  onChange={(e) => setOrdenTrabajo(e.target.value)}
                ></textarea>
              </div>
                {/* Orden de trabajo  */}
                 {/* Asignacion de orden a tecnico */}
             <div>
              <div className="form-group">
                <label htmlFor="" className=" fw-bold">Asigne un tecnico:</label>
              
                <select  onChange={(e) => setOrdenTecnico(e.target.value)} name="preordenes" id="ordenTecnico" className="form-control">
                <option value="">Seleccione un tecnico</option>
                   {selectTecnicoAsignado?.map((preordenes, i) => (
                    <option key={preordenes.id} value={preordenes.id}  className="text-center">{preordenes.nombres}</option>
                  ))}
                </select>
              </div>
             </div>
                {/* Orden  */}
              <input type="hidden" id="id"></input>
             <div>
              <div className="form-group">
                <label htmlFor="" className=" fw-bold">Orden de servicio:</label>
                <select  onChange={(e) => setPreOrden(e.target.value)}  id="preOrden" className="form-control">
                <option value="">Seleccione una Orden de servicio</option>
                   {selectPreOrden?.map((preordenes, i) => (
                    <option key={preordenes.id} value={preordenes.id}  className="text-center">{preordenes.pre_orden}</option>
                  ))}
               
                </select>
              </div>
             </div>
            
            <label htmlFor="first_name"  className=" mb-2 mt-1 text-sm font-medium text-gray-900 "><span className="font-bold">Inicia: </span><span className="font-bold text-green-600">{moment(inicio).format('LLLL')}</span></label>
            <input  
                type="datetime-local"   id="inicio"  onChange={(e) => setInicio(e.target.value)}    className="bg-gray-50 border border-gray-300 bg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full text-center p-2.5  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"  required    />
             <div>
              <div>
                
              </div>
            <label htmlFor="first_name" className=" mb-2 mt-1 text-sm font-medium text-gray-900 "> <span className="font-bold">Finaliza: </span><span className="font-bold text-red-600">{moment(finaliza).format('LLLL')}</span></label>
            <input  
                type="datetime-local"    id="finaliza" onChange={(e) => setFinaliza(e.target.value)}   className="bg-gray-50 border  relative border-gray-300 bg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full text-center p-2.5  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"  required    />
        
        {/* <input
                  id="subcategoria"
                  className="form-control text-center"
                  placeholder="Creador orden"
                  value={finaliza}
                  onChange={(e) => setFinaliza(e.target.value)}
                ></input> */}
        {/* {inicio + ' inicio'}
        <br />
        {finaliza + ' fin'} */}
        </div>
      
           
                {/* Orden de trabajo  */}
                <div className="form-group">
                <label htmlFor="" className=" fw-bold">Asignar Categoria:</label>
              
                <select  onChange={(e) => setCategoria(e.target.value)} name="categoria" id="categoria" className="form-control">
                <option value="">Seleccione una categoria</option>
                   {selectCategoria?.map((categorias, i) => (
                    <option key={categorias.id} value={categorias.id}  className="text-center">{categorias.categoria}</option>
                  ))}
                </select>
              </div>

                <div className="form-group">
                <label htmlFor="" className=" fw-bold">Asignar Subcategoria:</label>
              
                <select  onChange={(e) => setSubcategoria(e.target.value)} name="subcategoria" id="subcategoria" className="form-control">
                <option value="">Seleccione una subcategoria</option>
                   {selectSubCategoria?.map((categorias, i) => (
                    <option key={categorias.id} value={categorias.id}  className="text-center">{categorias.descripcion}</option>
                  ))}
                </select>
              </div>

                <div className="form-group">
                <label htmlFor="" className=" fw-bold">Asignar Creador:</label>
              
                <select  onChange={(e) => setCreadorOrden(e.target.value)} name="creadorOrden" id="creadorOrden" className="form-control">
                <option value="">Seleccione un creador</option>
                   {selectCreador?.map((creadorOrden, i) => (
                    <option key={creadorOrden.id} value={creadorOrden.id}  className="text-center">{creadorOrden.nombres}</option>
                  ))}
                </select>
              </div>
             
              {/* <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i className="fa-brands fa-creative-commons-nd"></i>
                </span>
                <input
                  id="creadorOrden"
                  className="form-control text-center "
                  placeholder="Creador orden"
                  value={creadorOrden}
                  onChange={(e) => setCreadorOrden(e.target.value)}
                ></input>
              </div> */}
             
              {/* <Busqueda /> */}
            
              <div className="d-grid">
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

export default Ordenes;
