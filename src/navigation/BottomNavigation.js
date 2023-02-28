import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/post-auth/Dashboard";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { mainBlue, mainGreen, mainPurple } from "../styles/AppStyles";
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
          borderTopWidth: 2,
          borderTopColor: mainGreen,
          elevation: 0,
          height: 65,
        },
        tabBarActiveTintColor: mainGreen,
        tabBarInactiveTintColor: "#36B2EB",
        tabBarBackground: () => (
          <LinearGradient
            colors={[mainBlue, mainPurple]}
            style={{ flex: 1, height: "100%" }}
            locations={[0.1, 0.8]}
          />
        ),
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 14,
          width: "100%",
        },
        tabBarIconStyle: {
          marginTop: 9,
        },
      }}
    >
      <Tab.Screen
        name="Panel"
        component={Dashboard}
        options={{
          tabBarLabel: "Artykuły",
          tabBarIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Habbits"
        component={Habbits}
        options={{
          tabBarLabel: "Nawyki",
          tabBarIcon: ({ color }) => (
            <Feather name="trending-up" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarLabel: "Finanse",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="finance" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Ustawienia",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
