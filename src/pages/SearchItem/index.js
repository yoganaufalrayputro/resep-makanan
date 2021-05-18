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
import { Entypo } from "@expo/vector-icons";

const API = "masak-apa-tomorisakura.vercel.app";
const endpoint = "api/search/";

const SearchItem = ({ navigation }) => {
  const [search, setSearch] = useState();
  const [result, setResult] = useState();
  const [isLoading, setLoading] = useState(false);

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
      setLoading(true);
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <View style={styles.buttonBack}>
            <Entypo name="chevron-left" size={45} color="#666564" />
          </View>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Image
            source={require("../../../assets/search.png")}
            style={styles.icon}
          />
          <TextInput
            placeholder="Cari resep masakan"
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={() => searchItem(search)}
            style={styles.input}
            autoFocus
            autoCapitalize="none"
          />
        </View>
      </View>
      {isLoading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
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
                    <Text
                      style={{ fontSize: 17, fontFamily: "poppins-medium" }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        fontFamily: "poppins-regular",
                      }}
                    >
                      <Text style={{ marginRight: 10, marginTop: 10 }}>
                        {item.dificulty}
                      </Text>
                      <Text
                        style={{
                          marginRight: 10,
                          marginTop: 10,
                          fontFamily: "poppins-regular",
                        }}
                      >
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
    flex: 1,
  },
  wrapBox: {
    width: "47%",
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
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  flatlist: {
    alignItems: "center",
  },
  searchContainer: {
    width: "85%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 1,
    marginVertical: 20,
  },
  icon: { width: 28, height: 28, marginLeft: 20 },
  input: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
    paddingRight: 30,
    fontFamily: "poppins-regular",
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
  },
});
