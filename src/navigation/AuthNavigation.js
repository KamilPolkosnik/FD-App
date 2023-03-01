import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/pre-auth/LoginScreen";
import RegisterScreen from "../screens/pre-auth/RegisterScreen";
import RedirectScreen from "../screens/pre-auth/RedirectScreen";
import HomeScreen from "../screens/pre-auth/HomeScreen";
import RemindPasswordScreen from "../screens/pre-auth/RemindPasswordScreen";
import BottomNavigation from "./BottomNavigation";
import ArticleContent from "../screens/post-auth/ArticleContent";
import MorningHabbits from "../screens/post-auth/habbits/MorningHabbits";
import DuringDayHabbits from "../screens/post-auth/habbits/DuringDayHabbits";
import EveningHabbits from "../screens/post-auth/habbits/EveningHabbits";

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Remind" component={RemindPasswordScreen} />
      <Stack.Screen name="Redirect" component={RedirectScreen} />
      <Stack.Screen name="PostAuth" component={BottomNavigation} />
      <Stack.Screen name="ArticleContent" component={ArticleContent} />
      <Stack.Screen name="MorningHabbits" component={MorningHabbits} />
      <Stack.Screen name="DuringDayHabbits" component={DuringDayHabbits} />
      <Stack.Screen name="EveningHabbits" component={EveningHabbits} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
