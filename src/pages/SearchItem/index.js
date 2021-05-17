import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

const API = "masak-apa-tomorisakura.vercel.app";
const endpoint = "api/search/";

const SearchItem = ({ navigation }) => {
  const [search, setSearch] = useState();
  const [result, setResult] = useState();
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (search !== "") {
  //     fetch(`${API}${endpoint}/api/search/?q=${search}`)
  //       .then((respone) => respone.json())
  //       .then((json) => {
  //         setResult(json.results);
  //         // console.log(resep);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // });

  const searchItem = (search) => {
    if (search == "") {
      return false;
    } else {
      fetch(`https://masak-apa-tomorisakura.vercel.app/api/search/?q=${search}`)
        .then((response) => response.json())
        .then((json) => {
          setResult(json.results);
          // console.log(json.results);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../assets/search.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="cari resep masakan"
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={() => searchItem(search)}
          style={styles.input}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.flatList}>
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <View style={styles.wrapBox}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetailResep", {
                      key: item.key,
                    });
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      // resizeMode="cover"
                      source={{ uri: item.thumb }}
                      style={styles.image}
                    />
                  </View>
                  <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 17 }}>{item.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ marginRight: 10, marginTop: 10 }}>
                        {item.dificulty}
                      </Text>
                      <Text style={{ marginRight: 10, marginTop: 10 }}>
                        {item.times}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  wrapBox: {
    width: 170,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 170,
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  flatlist: {
    alignItems: "center",
  },
  searchContainer: {
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 20,
  },
  icon: { width: 28, height: 28, marginLeft: 20 },
  input: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
  },
});
