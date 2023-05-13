import { Link } from "react-router-dom";
import Header from "../components/Header";
const Error404 = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card  rounded-4 text-center">
          <img src="error.gif" className="card-img-top" alt="Error 404" />
          <div className="card-body">
            <h5 className="card-title">Pagina no encontrada</h5>
            <p className="card-text">
              La pagina a la que intentas acceder no existe
            </p>
            <Link className="btn btn-primary" to="/">
              <i className="feather icon-home"></i>
              <span className="menu-title"> Regresar al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
