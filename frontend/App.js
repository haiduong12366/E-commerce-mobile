import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  Home,
  Search,
  Profile,
  ProductDetails,
  Cart,
  NewRivals,
  LoginPage,
  Order,
  Favorites,
  SignUp,
} from "./screens";
import { StyleSheet } from "react-native";
import { CartList } from "./components";

const Stack = createNativeStackNavigator(); //manage navigation

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"), // Loading a font file for regular style
    light: require("./assets/fonts/Poppins-Light.ttf"), // Loading a font file for light style
    bold: require("./assets/fonts/Poppins-Bold.ttf"), // Loading a font file for bold style
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"), // Loading a font file for semi-bold style
    medium: require("./assets/fonts/Poppins-Medium.ttf"), // Loading a font file for medium style
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"), // Loading a font file for extra bold style
  });

  const onLayoutRootView = useCallback(async () => {
    // Checking if the fonts have been loaded
    if (fontsLoaded) {
      // Hiding the splash screen asynchronously
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If the fonts are not loaded yet
  if (!fontsLoaded) {
    // Return null to render nothing (possibly displaying a loading indicator)
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Orders"
          component={Order}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // textStyle: {
  //   fontFamily: "regular",
  //   fontSize: 20,
  // },
});
