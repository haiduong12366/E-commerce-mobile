import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid ? COLORS.primary : COLORS.gray)}
    >
      {!loader ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: (color) => ({
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
