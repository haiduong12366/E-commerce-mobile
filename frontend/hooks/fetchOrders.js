import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from "../env"


const fetchOrders = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const id = await AsyncStorage.getItem('id');
        console.log(id);
        setLoading(true)

        try {
            const response = await axios.get(`http://${IP}:3000/api/orders/${JSON.parse(id)}`);
 
            setData(response.data);

            setLoading(false);
        } catch (error) {
            setError(error);
        } finally{
           setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    const refetch = () => {
        setLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch}
}

export default fetchOrders;