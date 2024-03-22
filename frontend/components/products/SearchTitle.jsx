import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./searchTitle.style";
import { useNavigation } from "@react-navigation/native";



const SearchTitle = ({ item }) => {
    const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("ProductDetails",{item})}}>
        <View style={styles.image}>
          <Image style={styles.productImg} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
            <Text style={styles.supplier} numberOfLines={1}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTitle;
