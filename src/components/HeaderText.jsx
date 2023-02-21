import { Text } from "react-native";
import React, { useEffect } from "react";
import AppStyles from "../styles/AppStyles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const HeaderText = (props) => {
  const { text, additionalStyling } = props;

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

  return <Text style={[AppStyles.homeTitle, additionalStyling]}>{text}</Text>;
};

export default HeaderText;
