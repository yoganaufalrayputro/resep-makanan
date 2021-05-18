import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (username == "" || password == "") {
      alert("masukan username atau password");
    } else {
      fetch("https://masakinnn.000webhostapp.com/login.php", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      })
        .then((response) => response.json())
        .then((json) => {
          setUsername("");
          setPassword("");
          if (json == "login berhasil") {
            navigation.replace("Main", {
              user: username,
            });
          } else {
            alert("username atau password salah");
          }
        });
    }
  }

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
          <Text style={styles.title}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            value={username}
          />
        </View>
        <View style={styles.wrapInput}>
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
          <Text
            style={{
              color: "#fff",
              fontSize: 27,
              fontWeight: "500",
              fontFamily: "poppins-bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: "#FFC979",
            fontFamily: "poppins-regular",
          }}
        >
          Belum punya akun?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#FF8E4C",
              fontFamily: "poppins-italic",
            }}
          >
            Daftar
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
    color: "#db7b3b",
    marginBottom: 20,
    fontFamily: "poppins-medium",
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
    elevation: 2,
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
    elevation: 2,
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
    opacity: 0.4,
  },
  ocookie2: {
    width: 200,
    height: 200,
    opacity: 0.4,
    left: 180,
    bottom: 240,
  },
});
