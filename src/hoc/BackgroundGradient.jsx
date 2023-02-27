import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { mainBlue, mainPurple } from "../styles/AppStyles";
import { ScrollView } from "react-native";

const BackgroundGradient = ({ marginHorizontal, children, justifyContent, flex }) => {
  return (
    <LinearGradient
      colors={[mainBlue, mainPurple]}
      style={{ flex: 1, height: "100%" }}
      locations={[0, 1]}
    >
      <ScrollView
        style={{ marginHorizontal: marginHorizontal }}
        contentContainerStyle={{
          flex: flex,
          justifyContent: justifyContent,
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100%",
        }}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

export default BackgroundGradient;

