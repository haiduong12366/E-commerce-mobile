import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./profile.style";
import { COLORS } from "../constants";
import {
  Ionicons,
  Fontisto,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkUserExistence();
  }, []);
  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      const userData = await AsyncStorage.getItem(userID);
      console.log(userData);
      if (userData !== null) {
        // User data exists
        const parsedData = JSON.parse(userData);
        // Use the retrieved data as needed
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const deleteAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(allKeys);
      console.log("All keys deleted successfully.");
    } catch (error) {
      console.error("Error deleting keys:", error);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancle",
        onPress: () => {
          console.log("Cancel pressed");
        },
      },
      {
        text: "Continue",
        onPress: () => {
          userLogout();
        },
      },
      { defaultIndex: 1 },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancle",
          onPress: () => {
            console.log("Cancel pressed");
          },
        },
        {
          text: "Continue",
          onPress: () => {
            deleteAllKeys();
          },
        },
        { defaultIndex: 1 },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert("Logout", "Are you sure you want to delete your account", [
      {
        text: "Cancle",
        onPress: () => {
          console.log("Cancel pressed");
        },
      },
      {
        text: "Continue",
        onPress: () => {
          console.log("Continue pressed");
        },
      },
      { defaultIndex: 1 },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: userLogin ? `https://avatar.iran.liara.run/public/boy?username=${userData._id}` : "https://avatar.iran.liara.run/public/boy"}}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin ? userData.username : "Please login into your account"}
          </Text>
          {!userLogin ? (
            <View >
              <TouchableOpacity
              style={{marginTop:10, width:200, alignContent:"center"}}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}>L O G I N</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{marginTop:20, width:200}}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>S I G U P</Text>
              </View>
            </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loginBtn}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userData.email} </Text>
              </View>
            </View>
          )}

          {!userLogin ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Favorites");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  clearCache();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteAccount();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <View style={styles.menuItem(0)}>
                  <AntDesign name="logout" size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
