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
    <ScrollView>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <View>
        <Text>{category}</Text>

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
                <Image
                  // resizeMode="cover"
                  source={{ uri: item.thumb }}
                  style={styles.image}
                />
                <View style={{ padding: 10 }}>
                  <Text>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginRight: 10 }}>{item.dificulty}</Text>
                    <Text>{item.times}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  wrapBox: {
    borderWidth: 1,
    width: 170,
    margin: "auto",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
});
