
import '../MainPage.css';

import { Link, useNavigate} from "react-router-dom";

const MainPague = () => {
  return (
    <>
 
  
     <div className="pagina-principal">
   <img className='img-fluid' src="Logo.png" alt="" />
  <div className="btninicio">
  <Link  className='text-white text-decoration-none  p-3 w-100 rounded-2'
          to="/index">INICIAR</Link>
 
  </div>
</div>

   </>
  )
}

export default MainPague