import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const BASE_URL =
  "https://masak-apa.tomorisakura.vercel.app/api/categorys/recipes/";

const CategoryItem = ({ navigation, route }) => {
  const { key, category } = route.params;

  const [item, setItem] = useState({});

  // const [bahan, setBahan] = useState([]);
  // const [step, setStep] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}${key}`)
      .then((respone) => respone.json())
      .then((json) => {
        setItem(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <View>
        <Text style={styles.title}>{category}</Text>

        <View style={styles.flatlist}>
          <FlatList
            data={item}
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
            numColumns={2}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryItem;

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
  title: {
    fontSize: 25,
    marginVertical: 25,
    fontWeight: "bold",
  },
  flatlist: {
    alignItems: "center",
  },
});
