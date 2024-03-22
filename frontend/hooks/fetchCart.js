import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from "../env"
import userInfo from "../zustand/userInfo"

const fetchCart = () => {
    const {cartItem, setCartItem } = userInfo();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data,setData] = useState([])

    const fetchData = async () => {
        const id = await AsyncStorage.getItem('id');
        setLoading(true)
        try {
            const response = await fetch(`http://${IP}:3000/api/cart/find/${JSON.parse(id)}`);
            const newData = await response.json()
            const products = await newData[0].products

            // await newData[0].products.forEach(element => {
            //     setCartItem(products);
                
            // });
            setData(products)
            await setCartItem(products);
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

    return { data,setData,isLoading, error, refetch}
}

export default fetchCart;