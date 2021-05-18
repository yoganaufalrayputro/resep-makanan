import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username harus di isi"),
  email: Yup.string()
    .required("Email harus di isi")
    .email("format email salah"),
  password: Yup.string()
    .required("Password harus di isi")
    .min(8, "password harus minimal 8 karakter")
    .max(16, "password minimal 16 karakter"),
});

const Register = ({ navigation }) => {
  function register(values) {
    if (values.username == "" || values.email == "" || values.password == "") {
      alert("pastikan isi semua data");
    } else {
      fetch("https://masakinnn.000webhostapp.com/register.php", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${values.username}&email=${values.email}&password=${values.password}`,
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

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => register(values)}
      >
        {(props) => (
          <View style={styles.box}>
            <View style={styles.wrapInput}>
              <Text style={styles.title}>E-mail</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                autoCapitalize="none"
              />
              <Text style={styles.warn}>
                {props.touched.email && props.errors.email}
              </Text>
            </View>

            <View style={styles.wrapInput}>
              <Text style={styles.title}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange("username")}
                onBlur={props.handleBlur("username")}
                autoCapitalize="none"
              />
              <Text style={styles.warn}>
                {props.touched.username && props.errors.username}
              </Text>
            </View>

            <View style={styles.wrapInput}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.warn}>
                {props.touched.password && props.errors.password}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={props.handleSubmit}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 27,
                  fontWeight: "500",
                  fontFamily: "poppins-bold",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.sign}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: "#FFC979",
            fontFamily: "poppins-regular",
          }}
        >
          Sudah punya akun?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#FF8E4C",
              fontFamily: "poppins-italic",
            }}
          >
            Masuk
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
    bottom: 250,
    padding: 10,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
  warn: { color: "red", marginTop: 5, fontFamily: "poppins-regular" },
});
