
import { useState, useEffect } from "react";
import axios from 'axios';
export function useFetch(url) {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async (limite, categoria) => {
      setLoading(true);
      if (limite === undefined || limite <= 0) {
        limite = '';
      }
      if (categoria === undefined || categoria <= 0) {
        categoria = '';
      }
      try {
        const res = await axios.get(`${url}?` + `${limite}&${categoria}`);
        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    return { response, error, loading , fetchData};
}
