import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppStyles, { mainBlue, mainPurple } from "../styles/AppStyles";
import { ScrollView } from "react-native";

const BackgroundGradient = (props) => {
  return (
    <LinearGradient
      colors={[mainBlue, mainPurple]}
      style={{ flex: 1, height: "100%" }}
    >
      <ScrollView
        style={{ paddingHorizontal: 30, paddingVertical: 30 }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {props.children}
      </ScrollView>
    </LinearGradient>
  );
};

export default BackgroundGradient;