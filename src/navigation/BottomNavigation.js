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
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#00FF15",
        tabBarInactiveTintColor: "#36B2EB",
          tabBarBackground: () => (
            <LinearGradient
              colors={[mainBlue, mainPurple]}
              style={{ flex: 1, height: "100%" }}
            />
          ),
          tabBarLabelStyle: {
            paddingBottom: 8,
            fontSize: 14,
            width: '100%'
          },
          tabBarIconStyle: {
            marginTop: 7
          }
      }}
    >
      <Tab.Screen
        name="Panel"
        component={Dashboard}
        options={{
          tabBarLabel: "Panel",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={24}/>
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

