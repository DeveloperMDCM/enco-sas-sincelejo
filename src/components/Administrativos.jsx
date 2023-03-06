
import { useFetch } from "../useFetch";
const Administrativos = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}tecnico.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { administrador } = response;
  console.log(administrador);
  return (
    <div>Administrativos</div>
  )
}

export default Administrativos