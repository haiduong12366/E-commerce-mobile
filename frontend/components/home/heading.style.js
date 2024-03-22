import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium -3,
    //marginBottom:-SIZES.xSmall,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hearTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge -5,
  },
});

export default styles;
