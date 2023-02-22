import { View, Text } from "react-native";
import React from "react";
import BackgroundGradient from "../hoc/BackgroundGradient";

const Dashboard = ({ route }) => {
  return (
    <BackgroundGradient>
      <Text style={{ color: "white", marginVertical: 60, flex: 1 }}>
        Cześć {route.params.user.displayName}
      </Text>
    </BackgroundGradient>
  );
};

export default Dashboard;
