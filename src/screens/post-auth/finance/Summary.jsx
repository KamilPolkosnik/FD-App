import { View, Text } from "react-native";
import React from "react";
import BackgroundGradient from "../../../hoc/BackgroundGradient";
import { useSelector } from "react-redux";
import { mainGreen } from "../../../styles/AppStyles";

const Summary = () => {
  const generalIncome = useSelector((state) => state.summary.incomeSummary);
  const generalOutcome = useSelector((state) => state.summary.outcomeSummary);
  const generalSummary = (generalIncome - generalOutcome).toFixed(2)

  return (
    <BackgroundGradient
      marginHorizontal={30}
      justifyContent={"center"}
      flex={1}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        Suma przychodów:
      </Text>
      <Text
        style={{
          color: "lightgreen",
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        {generalIncome === 0 ? 'Brak przychodów' : `+${generalIncome} zł`}
      </Text>
      <Text
        style={{
          color: "white",
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        Suma rozchodów:
      </Text>
      <Text
        style={{
          color: "#ED5151",
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        {generalOutcome === 0 ? 'Brak przychodów' : `-${generalOutcome} zł`}
      </Text>
      <Text
        style={{
          color: "white",
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        Bilans finansowy:
      </Text>
      <Text
        style={{
          color: generalSummary < 0 ? 'red' : mainGreen,
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          marginBottom: 15,
        }}
      >
        {generalSummary} zł
      </Text>
    </BackgroundGradient>
  );
};

export default Summary;
