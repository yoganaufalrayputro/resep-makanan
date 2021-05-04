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
  TextInput,
  ScrollView,
} from "react-native";

export default function Main({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [resep, setResep] = useState({});

  useEffect(() => {
    fetch(
      "https://masak-apa.tomorisakura.vercel.app/api/recipes-length/?limit=10"
    )
      .then((respone) => respone.json())
      .then((json) => {
        setResep(json.results);
        console.log(resep);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(resep.key);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome</Text>
            <Text
              style={{ fontSize: 34, color: "#36CFAB", fontWeight: "bold" }}
            >
              Afif Hibatullah
            </Text>
          </View>
          <Image
            source={require("../../../assets/boy.png")}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../assets/search.png")}
              style={styles.icon}
            />
            <TextInput placeholder="Search" style={styles.input} />
          </View>
        </View>
        {/* main */}
        <View style={{ alignItems: "center" }}>
          {isLoading ? (
            <ActivityIndicator />
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
                        <Text style={{ marginRight: 10 }}>
                          {item.dificulty}
                        </Text>
                        <Text>{item.times}</Text>
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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  box: {
    width: 350,
    borderRadius: 10,
    marginRight: 10,
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

  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumb: {
    width: 350,
    height: 205,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: { width: 300, borderBottomWidth: 1 },
  title: { fontSize: 20, fontWeight: "500", marginBottom: 20 },
  icon: { width: 28, height: 28, marginLeft: 20 },
  searchContainer: {
    height: 50,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  input: { fontSize: 18, fontWeight: "bold", flex: 1, marginLeft: 10 },
});
