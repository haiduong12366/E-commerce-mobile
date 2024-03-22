import { Text, View ,TouchableOpacity, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import useInfo from "../zustand/userInfo"
import fetchCart from "../hooks/fetchCart";

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  
  const  {data,setData,isLoading, error}  = fetchCart();
  const {cartItem,setCartItem} = useInfo()
  //setCartItem(cartItem)
  useEffect(() => {
    checkUserExistence();
  }, []);
  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      const userData = await AsyncStorage.getItem(userID);
      if (userData !== null) {
        // User data exists
        const parsedData = JSON.parse(userData);
        // Use the retrieved data as needed
        setUserData(parsedData);
        setUserLogin(true);
        
        // if(data !== null){
        //   setCartItem(data)
        //   console.log(cartItem)
        // }else return
      } else return
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handlePress = () => {
    if (userLogin) {
      navigation.navigate('Cart');
    } else {
      // Navigate to the Login page when hasId is false
      navigation.navigate('Login');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>{userData ? userData.location:"VietNam"}</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{cartItem.length}</Text>
            </View>
            <TouchableOpacity onPress={()=>handlePress()}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome/>
        <Carousel/>
        <Heading/>
        <ProductRow/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
