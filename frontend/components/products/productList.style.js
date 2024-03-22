import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/index";



const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
    },
    container:{
        alignItems:"center",
        paddingTop:SIZES.xxLarge,
        marginLeft:SIZES.small/2+1.7,
        alignItems: "center",
    },separator:{
        height:16,
    }
})

export default styles;
