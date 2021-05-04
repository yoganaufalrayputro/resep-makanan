import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

const DetailResep = ({ navigation, route }) => {
  const { key } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});

  // const [bahan, setBahan] = useState([]);
  // const [step, setStep] = useState([]);
  useEffect(() => {
    fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${key}`)
      .then((respone) => respone.json())
      .then((json) => {
        setDetail(json.results);
        // setBahan(detail.ingredient);
        // setStep(detail.step);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <View style={styles.buttonBack}>
            <Entypo name="chevron-left" size={35} color="#000" />
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>{detail.title}</Text>
        </View>
        <View>
          <Text>{detail.times}</Text>
          <Text>{detail.dificulty}</Text>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Image
              source={{ uri: detail.thumb }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View>
          <Text>Bahan</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList data={detail.ingredient} renderItem={renderItem} />
          )}
        </View>
        <View>
          <Text>Langkah</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList data={detail.step} renderItem={renderItem} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailResep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECD2",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 10,
  },
  buttonBack: {
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  item: {
    padding: 5,
  },
});
