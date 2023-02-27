import { Button } from "react-native-paper";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { mainButton } from "../styles/AppStyles";
import { Shadow } from "react-native-shadow-2";

const StyledButton = ({ onPress, text, loading, marginBottom }) => {
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
    <Shadow
      distance={10}
      style={{
        flexDirection: "row",
        borderRadius: 10,
        marginBottom: marginBottom,
      }}
      startColor={mainButton}
      endColor={"#43EDF600"}
      offset={[0, 0]}
    >
      <Button
        onPress={onPress}
        labelStyle={{
          fontFamily: "Open-Sans-Bold",
          fontSize: 16,
          flex: 1,
        }}
        style={{ width: "100%" }}
        buttonColor={mainButton}
        textColor="black"
        mode="contained"
        loading={loading}
      >
        {text}
      </Button>
    </Shadow>
  );
};

export default StyledButton;

