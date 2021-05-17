import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    if (username == "" || email == "" || password == "") {
      alert("pastikan isi semua data");
    } else {
      fetch("https://masakinnn.000webhostapp.com/register.php", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&email=${email}&password=${password}`,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.result == "Berhasil membuat akun") {
            alert("akun berhasil dibuat");

            navigation.navigate("Login");
          } else {
            alert("terjadi kesalahan");
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/signup.png")}
        style={styles.regisLogo}
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
          <Text style={styles.title}>E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.wrapInput}>
          <Text style={styles.title}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.wrapInput}>
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => register()}>
          <Text style={{ color: "#fff", fontSize: 27, fontWeight: "500" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text style={{ fontSize: 20, fontWeight: "400", color: "#FFC979" }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#FF8E4C",
              fontStyle: "italic",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECD2",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    height: 490,
    bottom: 250,
    padding: 35,
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
  regisLogo: {
    top: 250,
  },
  sign: {
    flexDirection: "row",
    bottom: 230,
  },
  ocookie1: {
    width: 300,
    height: 300,
    right: 150,
    bottom: -470,
    opacity: 0.4,
  },
  ocookie2: {
    width: 200,
    height: 200,
    opacity: 0.4,
    left: 180,
    bottom: 200,
  },
});
