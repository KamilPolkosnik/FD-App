import { Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { mainButton } from "../../styles/AppStyles";
import BackgroundGradient from "../../hoc/BackgroundGradient";

const RedirectScreen = ({ navigation, route }) => {
  const toLogin = route.params.redirectToLogin;

  {
    toLogin
      ? setTimeout(() => {
          navigation.navigate("Login");
        }, 5000)
      : setTimeout(() => {
          navigation.navigate("Settings");
        }, 5000);
  }

  return (
    <BackgroundGradient marginHorizontal={30} justifyContent={'center'} flex={1}>
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
