import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BackBtn, Button } from "../components";
import styles from "./login.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import IP from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userInfo from "../zustand/userInfo";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  //const {user,setUser} = userInfo

  const login = async (values) => {
    setLoader(true);
    try {
      const res = await fetch(`http://${IP}:3000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        await setResponseData(data);
        setLoader(false);
        await AsyncStorage.setItem(`user${data._id}`, JSON.stringify(data));
        await AsyncStorage.setItem(`id`, JSON.stringify(data._id));
        navigation.replace("Bottom Navigation");
        // const test = await AsyncStorage.getItem(`user${responseData._id}`);
        // console.log(test);
      } else {
        Alert.alert(
          "Error Logging in",
          "Please provide valid required credentials",
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
                console.log("Continue pressed");
              },
            },
            { defaultIndex: 1 },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error", `Oops, Error logging in try again ${error}`, [
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
    } finally {
      setLoader(false);
    }
  };

  const inValidForm = () => {
    Alert.alert("InValid Form", "Please provide all required fields", [
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
    <View>
      <BackBtn onPress={() => navigation.goBack()} />

      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <SafeAreaView style={{ marginHorizontal: 20 }}>
          <View>
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.cover}
            />
            <Text style={styles.title}>Unlimited luxuries furniture</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                login(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></MaterialCommunityIcons>
                      <TextInput
                        placeholder="Enter email"
                        onFocus={() => {
                          setFieldTouched("email");
                        }}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>password</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></MaterialCommunityIcons>
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder="Password"
                        onFocus={() => {
                          setFieldTouched("password");
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setObsecureText(!obsecureText);
                        }}
                      >
                        <MaterialCommunityIcons
                          size={18}
                          name={
                            obsecureText ? "eye-outline" : "eye-off-outline"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>

                  <Button
                    title={"L O G I N"}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid={isValid}
                    loader={loader}
                  />
                  <TouchableOpacity
                    onPress={()=>{}}
                    style={styles.btnStyle}
                  >
                  
                      <Text style={styles.btnTxt}>S I G N U P</Text>
                    
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default LoginPage;
