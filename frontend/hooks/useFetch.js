import axios from "axios";
import { useState, useEffect } from "react";
import IP from "../env.js"

const useFetch = () => {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {

      const res = await fetch(`http://${IP}:3000/api/products/`);
      const data = await res.json();

      //const response = await axios.get("http://localhost:3000/api/products/");
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();

  }, []);

  const refetch = ()=>{
    setIsLoading(true)
    fetchData();
  }

  return { data, isLoading,error,refetch };
};
export default useFetch;
