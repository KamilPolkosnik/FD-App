import { Button } from "react-native-paper";
import React, { useEffect } from "react";
import { mainButton } from "../styles/AppStyles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const StyledButton = ({ onPress, text, loading }) => {

  let [fontsLoaded] = useFonts({
    "Open-Sans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "Open-Sans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Button
      onPress={onPress}
      labelStyle={{ fontFamily: "Open-Sans-Bold", fontSize: 17 }}
      buttonColor={mainButton}
      textColor="black"
      mode="contained"
      loading={loading}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
