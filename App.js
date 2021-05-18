import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Router from "./src/router";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default App = () => {
  let [fontsLoaded, error] = useFonts({
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};
