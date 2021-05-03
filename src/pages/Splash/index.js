import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FDECD2",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/logo.png")}
        style={{ width: 350, height: 272, marginTop: "auto" }}
        resizeMode="contain"
      />
      <View
        style={{
          marginTop: "auto",
          marginBottom: 64,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>by</Text>
        <Text style={styles.text}>INFORMATIKA ITERA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 37,
    fontWeight: "600",
    color: "#FF8E4C",
  },
});

export default Splash;
