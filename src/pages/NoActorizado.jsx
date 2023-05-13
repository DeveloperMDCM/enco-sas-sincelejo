

import { Link } from "react-router-dom"
const NoActorizado = () => {

  return (
    <>
    
    <div className="mb-3 d-grid mt-10">
    <div className="text-center mt-3 container">
    <h1 className='text-uppercase fw-bold text-center'><span className="text-danger">No Autorizado <br /></span>contacte al administrador  del sistema</h1>
    </div>
    <div className="flex justify-center items-center">

    <img src="sinpermisos.png" width={300}  alt="Usuario no autorizado" />
    </div>
    <div className="text-center mt-4">
        <Link  to={'/login'}>
            <button className="btn btn-dark fw-bold mb-5">REGRESAR Y INICIAR SESIÓN NUEVAMENTE</button>
        </Link>
    </div>
    </div>
 
    
    </>
    
  )
}
export default NoActorizado