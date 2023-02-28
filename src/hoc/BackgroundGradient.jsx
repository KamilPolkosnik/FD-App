import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { mainBlue, mainPurple } from "../styles/AppStyles";
import { View } from "react-native";

const BackgroundGradient = ({
  marginHorizontal,
  children,
  justifyContent,
  flex,
}) => {
  return (
    <LinearGradient
      colors={[mainBlue, mainPurple]}
      style={{ flex: 1, minHeight: "100%" }}
      locations={[0.1, 0.8]}
    >
      <View
        style={{
          marginHorizontal: marginHorizontal,
          flex: flex,
          justifyContent: justifyContent,
          alignContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

export default BackgroundGradient;
