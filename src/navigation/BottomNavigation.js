import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/post-auth/Dashboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { mainBlue, mainPurple } from "../styles/AppStyles";
import Settings from "../screens/post-auth/Settings";
import Finance from "../screens/post-auth/Finance";
import Habbits from "../screens/post-auth/Habbits";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: "8%",
          paddingBottom: 10,
          paddingTop: 5,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Panel"
        component={Dashboard}
        options={{
          tabBarLabel: "Panel",
          tabBarLabelStyle: { color: "#00FF15", fontSize: 14 },
          tabBarBackground: () => (
            <LinearGradient
              colors={[mainBlue, mainPurple]}
              style={{ flex: 1, height: "100%" }}
            />
          ),
          tabBarIcon: () => (
            <FontAwesome5 name="home" color={"#00FF15"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Habbits"
        component={Habbits}
        options={{
          tabBarLabel: "Nawyki",
          tabBarLabelStyle: { color: "#00FF15", fontSize: 14 },
          tabBarBackground: () => (
            <LinearGradient
              colors={[mainBlue, mainPurple]}
              style={{ flex: 1, height: "100%" }}
            />
          ),
          tabBarIcon: () => (
            <Feather name="trending-up" color={"#00FF15"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarLabel: "Finanse",
          tabBarLabelStyle: { color: "#00FF15", fontSize: 14 },
          tabBarBackground: () => (
            <LinearGradient
              colors={[mainBlue, mainPurple]}
              style={{ flex: 1, height: "100%" }}
            />
          ),
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="finance"
              color={"#00FF15"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Ustawienia",
          tabBarLabelStyle: { color: "#00FF15", fontSize: 14 },
          tabBarBackground: () => (
            <LinearGradient
              colors={[mainBlue, mainPurple]}
              style={{ flex: 1, height: "100%" }}
            />
          ),
          tabBarIcon: () => (
            <Feather name="settings" color={"#00FF15"} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
