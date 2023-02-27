import { TouchableOpacity, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { mainButton } from "../styles/AppStyles";

const StyledInlineText = ({ onPress, text, inlineText }) => {
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
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontFamily: "Open-Sans-Regular", color: "white" }}>
        {text}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{ marginLeft: 5, marginBottom: 5 }}
      >
        <Text style={{ fontFamily: "Open-Sans-Bold", color: mainButton }}>
          {inlineText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledInlineText;
