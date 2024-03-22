import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, SIZES, images } from '../constants';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { ColorList } from '../components';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import addToCart from '../hooks/addToCart';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './productDetails.style';
import userInfo from '../zustand/userInfo';

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [paymentUrl, setPaymentUrl] = useState('');
  const [favorites, setFavorites] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(1);
  const {cartItem,setCartItem} = userInfo()

  addCartNumber=(item)=>{

    let newData = cartItem.filter((val,i)=>{
      if(val.cartItem._id !== item._id){
        return val
      }
    })
    if(newData.length === cartItem.length)
      setCartItem([...cartItem,item])
    
      
  }
  let userId = ''
  const createCheckoutSession = async () => {
    const id = await AsyncStorage.getItem('id');
    console.log(id);

    const response = await fetch('https://paymentorders-production.up.railway.app/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: JSON.parse(id),
        cartItems: [
          // Add your cart items here
          {
            name: item.title,
            id: item._id,
            price: item.price,
            cartQuantity: count,
          },
        ],
      }),
    });

    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;
    if (url && url.includes('checkout-success')) {
      navigation.navigate('Bottom Navigation')
      console.log('Payment successful!');
    } else if (url && url.includes('cancel')) {
      navigation.navigate('Bottom Navigation')
      console.log('Payment canceled!');
    }
  };

  useEffect(() => {
    checkFavorites();
    checkIdInAsyncStorage();
  }, []);

  const checkFavorites = async () => {
    const userId = await AsyncStorage.getItem('id');
     const favoritesId = `favorites${JSON.parse(userId)}`;
     console.log(favoritesId);
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        if (favorites[item._id]) {
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIdInAsyncStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      setIsLoggedIn(true);

      userId = id;

    } catch (error) {
      console.error(error);
    }
  }

  const addFavorites = async () => {
    const userId = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(userId)}`;
    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      imageUrl: item.imageUrl,
      price: item.price,
      product_location: item.product_location,
    };

    try {
    const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        // Key already exists, so delete it
        delete favoritesObj[productId];

        console.log(`Deleted key: ${productId}`);
        setFavorites(false);
      } else {
        favoritesObj[productId] = productObj;
        console.log(`Added key: ${productId}`);
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };


  const handlePress = () => {
    if (isLoggedIn) {
      createCheckoutSession();
    } else {
      // Navigate to the Login page when hasId is false
      navigation.navigate('Login');
    }
  };

  const increment = () => {
    if (count < 5) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{flex: 1 , backgroundColor: "white"}}>
          <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={onNavigationStateChange}
        />
        </SafeAreaView>
      ) : (
        <View>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={29}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addFavorites()}>
        {favorites ? (
                <Ionicons name="heart" size={30} color="green" />
              ) : (
                <Ionicons name="heart-outline" size={30} color={COLORS.black} />
              )
              }
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUrl,
        }}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity
              onPress={() => {
                increment();
              }}
            >
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                decrement();
              }}
            >
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.desText}>{item.description}</Text>
          {/* <Text style={styles.desText}>Nhà Xinh bảo hành một năm cho các trường hợp có lỗi về kỹ thuật trong quá trình sản xuất hay lắp đặt.</Text> */}
        </View>
        <View style={styles.location}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={20} />
            <Text>   {item.product_location}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
            <Text>   Free Delivery  </Text>
          </View>
        </View>

        <View >
              <ColorList colors={item.product_colors} />
            </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={()=>{handlePress}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{addToCart(item._id, 1);addCartNumber(item)}} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={24} color={COLORS.lightWhite}/>
          </TouchableOpacity>
        </View>
        
      </View>
      </View>
      )}
    </View>
  );
};

export default ProductDetails;
