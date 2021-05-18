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
  ActivityIndicator,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

const BASE_URL =
  "https://masak-apa.tomorisakura.vercel.app/api/categorys/recipes/";

const CategoryItem = ({ navigation, route }) => {
  const { key, category } = route.params;

  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <View style={styles.buttonBack}>
              <Entypo name="chevron-left" size={35} color="#000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>{category}</Text>
        </View>
        {isLoading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
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
                      <Text
                        style={{ fontSize: 17, fontFamily: "poppins-medium" }}
                      >
                        {item.title}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            marginRight: 10,
                            marginTop: 10,
                            fontFamily: "poppins-regular",
                          }}
                        >
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
              numColumns={2}
            />
          </View>
        )}
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
    shadowRadius: 1,
    elevation: 1,
  },
  image: {
    width: 170,
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: "poppins-bold",
  },
  flatlist: {
    alignItems: "center",
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
  },
});
