import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: { flex: 1, backgroundColor: COLORS.lightWhite },
  upperRow: {
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primary,
    top: SIZES.large,
    width: SIZES.width - 41,
    zIndex: 999,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 7,
  },
});

export default styles;
