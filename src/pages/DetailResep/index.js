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
  ImageBackground,
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

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <StatusBar animated={true} barStyle="default" hidden={false} />
      <ScrollView>
        <ImageBackground source={{ uri: detail.thumb }} style={styles.image}>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <View style={styles.buttonBack}>
              <Entypo name="chevron-left" size={35} color="#000" />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{detail.title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.indicator}>
              <Image
                source={require("../../../assets/clock.png")}
                style={styles.icon}
              />
              <Text style={styles.note}>{detail.times}</Text>
            </View>
            <View style={styles.indicator}>
              <Image
                source={require("../../../assets/hat.png")}
                style={styles.icon}
              />
              <Text style={styles.note}>{detail.dificulty}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.h2}>Bahan</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={detail.ingredient}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={{ color: "#000" }}>-</Text>
                    <Text style={styles.text}> {item}</Text>
                  </View>
                )}
              />
            )}
          </View>
          <View>
            <Text style={styles.h2}>Langkah</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={detail.step}
                renderItem={({ item }) => (
                  <View style={styles.step}>
                    <Text style={styles.text1}>{item}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailResep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "relative",
    top: -32,
    paddingTop: 30,
  },
  buttonBack: {
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  item: {
    padding: 5,
    width: 170,
    marginRight: 3,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#FDECD2",
    paddingLeft: 20,
    flexDirection: "row",
  },
  image: {
    // flex: 0.3,
    resizeMode: "contain",
    height: 310,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    fontSize: 15,
    fontWeight: "300",
    color: "#000",
  },
  text1: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "justify",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000",
  },
  icon: {
    width: 30,
    height: 30,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    width: 100,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  note: {
    marginTop: 10,
  },
  step: {
    marginBottom: 10,
    paddingLeft: 10,
  },
});
