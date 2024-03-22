import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { BackBtn, Button } from "../components";
import styles from "./login.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons,Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP from "../env";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  location: Yup.string()
    .min(3, "Provide a valid location")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
  .min(3, "Provide a valid username")
  .required("Required"),
});

const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

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

  const registerUser = async(values)=>{
    setLoader(true)
    try {
      const res = await fetch(`http://${IP}:3000/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        setLoader(false);
        navigation.replace("Login");
        // const test = await AsyncStorage.getItem(`user${responseData._id}`);
        // console.log(test);
      } else {
        Alert.alert(
          "Error Signing up",
          "SignUp fail",
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
      Alert.alert("Error", `Oops, Error sign up try again ${error}`, [
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
  

  return (
    <View>
      <BackBtn onPress={() => navigation.goBack()} />

      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <SafeAreaView style={{ marginHorizontal: 20 }}>
          
          <KeyboardAvoidingView>
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.cover}
            />
            <Text style={styles.title}>Unlimited luxuries furniture</Text>
            <Formik
              initialValues={{ email: "", password: "",location:"" ,username:""}}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                registerUser(values)
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
                    <Text style={styles.label}>Username</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="face-man-profile"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></MaterialCommunityIcons>
                      <TextInput
                        placeholder="Enter username"
                        onFocus={() => {
                          setFieldTouched("username");
                        }}
                        value={values.username}
                        onChangeText={handleChange("username")}
                        onBlur={() => setFieldTouched("username", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                    {touched.username && errors.username && (
                      <Text style={styles.errorMessage}>{errors.username}</Text>
                    )}
                  </View>


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
                    <Text style={styles.label}>Location</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></Ionicons>
                      <TextInput
                        placeholder="Enter location"
                        onFocus={() => {
                          setFieldTouched("location");
                        }}
                        value={values.location}
                        onChangeText={handleChange("location")}
                        onBlur={() => setFieldTouched("location", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                    {touched.location && errors.location && (
                      <Text style={styles.errorMessage}>{errors.location}</Text>
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
                    title={"S I G N U P"}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid={isValid}
                    loader={loader}
                  />
                  {/* <Text
                    style={styles.registration}
                    onPress={() => {
                      navigation.navigate("");
                    }}
                  >
                    Register
                  </Text> */}
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SignUp;
