import { Text, TouchableOpacity, View ,Image} from "react-native";
import React from "react";
import styles from "./productCardView.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import addToCart from "../../hooks/addToCart";
import useInfo from "../../zustand/userInfo"

const ProductCardView = ({item}) => {
  const {cartItem,setCartItem} = useInfo()

  const navigation = useNavigation()

  addCartNumber=(item)=>{

    let newData = cartItem.filter((val,i)=>{
      if(val.cartItem._id !== item._id){
        return val
      }
    })
    if(newData.length === cartItem.length)
      setCartItem([...cartItem,item])
    
      
  }
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("ProductDetails",{item})}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.imageUrl,
            }}
          ></Image>
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
          <Text style={styles.price} numberOfLines={1}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={35} color={COLORS.primary} onPress={() => {addToCart(item._id, 1);addCartNumber(item)}}></Ionicons>
        </TouchableOpacity>

        

      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
