import { Image, View } from "react-native";
import { mainButton } from "../styles/AppStyles";
import React, { useEffect } from "react";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../hoc/BackgroundGradient";
import HeaderText from "../components/HeaderText";
import StyledButton from "../components/StyledButton";
import { auth } from "../../App";

const HomeScreen = ({ navigation }) => {
  if (auth.currentUser) {
    navigation.navigate("Dashboard", { user: auth.currentUser });
  }

  return (
    <BackgroundGradient>
      <HeaderText text={"Finanse & Dyscyplina"} />
      <Shadow
        distance={30}
        startColor={"#550475"}
        endColor={"#04439000"}
        offset={[0, 0]}
      >
        <Image
          source={require("../../assets/FD.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 25,
          }}
        />
      </Shadow>
      <View
        style={{
          width: "90%",
          height: "20%",
          marginTop: 30,
          justifyContent: "space-evenly",
        }}
      >
        <Shadow
          distance={10}
          style={{ width: "100%", borderRadius: 10 }}
          startColor={mainButton}
          endColor={"#43EDF600"}
          offset={[0, 0]}
        >
          <StyledButton
            onPress={() => navigation.navigate("Login")}
            text={"LOGOWANIE"}
          />
        </Shadow>
        <Shadow
          distance={10}
          style={{ width: "100%", borderRadius: 10 }}
          startColor={mainButton}
          endColor={"#43EDF600"}
          offset={[0, 0]}
        >
          <StyledButton
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("Register")}
            text={"ZAŁÓŻ KONTO"}
          />
        </Shadow>
      </View>
    </BackgroundGradient>
  );
};

export default HomeScreen;
