import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/index";
import styles from "./search.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import IP from "../env";
import SearchTitle from "../components/products/SearchTitle";

const Search = () => {
  const [searhKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //console.log(searhKey)
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://${IP}:3000/api/products/search/${searhKey}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log("fail to search ", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searhKey}
            onChangeText={setSearchKey}
            onPressIn={() => {}}
            placeholder="What are you looking for ?"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              handleSearch();
            }}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          style={{ marginHorizontal: 12 }}
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTitle item={item} />}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

export default Search;
