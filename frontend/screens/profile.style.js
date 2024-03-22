import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 280,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    height: 145,
    width: 145,
    borderRadius: 999,
    borderColor: COLORS.primary,
    resizeMode: "cover",
    borderWidth: 2,
    marginTop: -85,
  },
  name: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderRadius: SIZES.xxLarge + 2,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
  },
  menuText: {
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 70,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 26,
    width:"100%",
    alignContent:"center",
    alignItems:"center",
    
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large - 2,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});

export default styles;
