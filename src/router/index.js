import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Main,
  Register,
  DetailResep,
  CategoryItem,
  SearchItem,
} from "../pages";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailResep"
        component={DetailResep}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryItem"
        component={CategoryItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchItem"
        component={SearchItem}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
