import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width - 50;

export default function Main({ navigation, route }) {
  const { user } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [resep, setResep] = useState({});
  const [category, setCategory] = useState();

  const BASE_URL = "https://masak-apa.tomorisakura.vercel.app";
  const api_main = "/api/recipes-length/?limit=10";
  const api_category = "/api/categorys/recipes";

  useEffect(() => {
    fetch(`${BASE_URL}${api_main}`)
      .then((respone) => respone.json())
      .then((json) => {
        setResep(json.results);
        // console.log(resep);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch(`${BASE_URL}${api_category}`)
      .then((respone) => respone.json())
      .then((json) => {
        setCategory(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    Alert.alert("Keluar", "Yakin ingin keluar ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text
              style={{
                fontSize: 30,
                color: "#FF8E4C",
                fontFamily: "poppins-bold",
              }}
            >
              Selamat Datang
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#FAB301",
                fontFamily: "poppins-bold",
              }}
            >
              {user}!
            </Text>
          </View>
          <TouchableOpacity onPress={() => logout()}>
            <Entypo name="log-out" size={35} color="#ab0f0f" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../assets/search.png")}
              style={styles.icon}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("SearchItem");
              }}
            >
              <Text style={styles.input}>
                Cari resep masakan yang kamu mau..
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
            fontFamily: "poppins-regular",
          }}
        >
          Kategori
        </Text>
        <View>
          <FlatList
            data={category}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CategoryItem", {
                    key: item.key,
                    category: item.category,
                  });
                }}
              >
                <View style={styles.category_box}>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // numColumns={5}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.titles}>Resep Hari ini untuk kamu </Text>
        </View>
        {/* main */}
        <View style={{ alignItems: "center" }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={resep}
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailResep", {
                        key: item.key,
                      });
                    }}
                  >
                    <Image
                      // resizeMode="cover"
                      source={{ uri: item.thumb }}
                      style={styles.thumb}
                    />
                    <View style={{ padding: 10 }}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            marginRight: 10,
                            fontFamily: "poppins-regular",
                          }}
                        >
                          {item.dificulty}
                        </Text>
                        <Text style={{ fontFamily: "poppins-regular" }}>
                          {item.times}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  box: {
    width: "98%",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#bfbdb8",
    marginVertical: 20,
  },

  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumb: {
    width: "100%",
    height: 205,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: { width: 300, borderBottomWidth: 1 },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    fontFamily: "poppins-medium",
  },
  icon: { width: 28, height: 28, marginLeft: 20 },
  searchContainer: {
    height: 50,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 2,
  },
  input: {
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
    opacity: 0.5,
    fontFamily: "poppins-regular",
  },
  category_box: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    justifyContent: "center",
    alignContent: "center",
    width: width / 2,
    borderRadius: 30,
    backgroundColor: "#FAB301",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  category: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "poppins-regular",
  },
  titles: {
    fontSize: 23,
    fontFamily: "poppins-bold",
    marginVertical: 10,
  },
});
