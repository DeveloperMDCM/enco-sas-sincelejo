import { useState, useEffect } from "react";
function Busqueda() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["id", "nombres", "apellidos", "cedula"]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const url = `${import.meta.env.VITE_BACKEND_URL}selectAsignarTecnico.php`;

    useEffect(() => {
        
        fetch(
            url
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.tecnico_asignado);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const data = Object.values(items);
 

    function search(items) {
        return items.filter((item) => {
         
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            
        });
    }

    if (error) {
        return (
            <h2>Filtro</h2>
        );
    } else if (!isLoaded) {
        return <>Cargando...</>;
    } else {
        return (
            <div className="wrapper d-flex w-50 gap-1">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search" 
                            name="search-form"
                            id="search-form"
                            className="search-input form-control"
                            placeholder="Selecciona un tecnico"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                   
                    </label>
                </div>
                        <select  name="preordenes" id="preOrden" className="form-control">
                            {search(data)?.map((item) => (
                            <option key={item.id} value={item.id}  className="text-center">CC:   {item.cedula} -  {item.nombres} {item.apellidos}</option>
                            )
                       )
                        }
                        </select>
            </div>
        )
                    }
}

  export default Busqueda;