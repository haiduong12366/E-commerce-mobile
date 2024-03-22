import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const styles = StyleSheet.create({
  container: {
    width: 169.9,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 158.9,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2 - 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  
  title: {
    fontFamily:"bold",
    fontSize:SIZES.large-1,
    marginBottom:1
  },
  supplier: {
    fontFamily:"regular",
    fontSize:SIZES.small-1,
    color:COLORS.gray
  },
  price:{
    fontFamily:"bold",
    fontSize:SIZES.medium-1,
    marginBottom:1
  },
  addBtn:{
    position:"absolute",
    bottom:SIZES.xSmall,
    right:SIZES.xSmall,
  }
});

export default styles;
