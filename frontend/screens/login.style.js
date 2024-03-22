import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 3 - 45,
    width: SIZES.width - 50,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.xxLarge-10,
  },
  wrapper: {
    marginBottom: 20,
    //marginHorizontal: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration: {
    marginTop: 18,
    textAlign: "center",
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  }, btnTxt: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.tertiary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

export default styles;
