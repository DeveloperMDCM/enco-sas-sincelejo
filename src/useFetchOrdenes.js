
import { useState, useEffect } from "react";
import axios from 'axios';
export function useFetchOrdebes(url) {
    const [responseOrdenes, setResponse] = useState([]);
    const [errorOrden, setError] = useState(null);
    const [loadingOrden, setLoading] = useState(false);
    const fetchDataOrden = async (limite) => {
      setLoading(true);
      if (limite === undefined || limite <= 0) {
        limite = '';
      }
      try {
        const res = await axios.get(`${url}?` + `${limite}`);
        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchDataOrden();
    }, []);
    return { responseOrdenes, errorOrden, loadingOrden , fetchDataOrden};
}
