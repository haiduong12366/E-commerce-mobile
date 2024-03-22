import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from "../env"

const addToCart = async (productId, quantity) => {

  try {
    const id = await AsyncStorage.getItem('id');
    const endpoint = `http://${IP}:3000/api/cart`;
    const data = {
      cartItem: productId,
      quantity: quantity,
      userId: JSON.parse(id)
    };
     await axios.post(endpoint, data);
    
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addToCart;