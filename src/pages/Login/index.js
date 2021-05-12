import React from "react";
import {
  Image,
  NavigatorIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/login.png")}
        style={styles.loginLogo}
      />
      <Image
        source={require("../../../assets/orangecookie.png")}
        style={styles.ocookie1}
      />
      <Image
        source={require("../../../assets/orangecookie.png")}
        style={styles.ocookie2}
      />
      <View style={styles.box}>
        <View style={styles.wrapInput}>
          <Text style={styles.title}>E-mail / Username</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.wrapInput}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={{ color: "#fff", fontSize: 27, fontWeight: "500" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text style={{ fontSize: 20, fontWeight: "400", color: "#FFC979" }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#FF8E4C",
              fontStyle: "italic" 
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECD2",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    height: 390,
    bottom: 220,
    padding: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  wrapInput: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "#FFC979",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: "#C3D6E7",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingHorizontal: 20,
  },
  loginButton: {
    width: 150,
    height: 60,
    backgroundColor: "#FF8E4C",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginLogo: { 
    top: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  sign: { 
    flexDirection: "row",
    bottom: 175,
  },
  ocookie1: {
    width: 300,
    height: 300,
    right: 150,
    bottom: -420,
    opacity: 0.5,
  },
  ocookie2: {
    width: 200,
    height: 200,
    opacity: 0.5,
    left: 180,
    bottom: 240,
  },
 
});
