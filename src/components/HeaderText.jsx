import { Text } from "react-native";
import React, { useEffect } from "react";
import AppStyles from "../styles/AppStyles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const HeaderText = ({ text, additionalStyling }) => {
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
    <Text
      style={[
        AppStyles.homeTitle,
        additionalStyling,
        {
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: -3, height: 3 },
          textShadowRadius: 5,
        },
      ]}
    >
      {text}
    </Text>
  );
};

export default HeaderText;
