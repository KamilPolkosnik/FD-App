import { Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { mainButton } from "../../styles/AppStyles";
import BackgroundGradient from "../../hoc/BackgroundGradient";

const RedirectScreen = ({ navigation, route }) => {
  setTimeout(() => {
    navigation.navigate("Login");
  }, 5000);

  return (
    <BackgroundGradient>
      <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
        {route.params.redirectText}
      </Text>
      <ActivityIndicator
        style={{ marginTop: 20 }}
        animating={true}
        color={mainButton}
        size="large"
      />
    </BackgroundGradient>
  );
};

export default RedirectScreen;
