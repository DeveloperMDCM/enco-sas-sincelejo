
const Moi = () => {
  return (
   <>
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

                <tbody className="table-group-divider text-primary">
                  {administrador?.map((administradores, i) => (
                    <tr key={administradores.id} className="text-center">
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
                          src={`data:image/jpg;png;base64, ${administradores.foto}`}
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
   </>
  )
}

export default Moi