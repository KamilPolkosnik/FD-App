import { Image, View } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import { auth } from "../../firebase/FirebaseConfig";

const HomeScreen = ({ navigation }) => {
  if (auth.currentUser) {
    navigation.navigate("PostAuth", { user: auth.currentUser });
  }

  return (
    <BackgroundGradient marginHorizontal={40} justifyContent={'center'} flex={1}>
      <HeaderText text={"Finanse & Dyscyplina"} />
      <Shadow
        distance={30}
        startColor={"#550475"}
        endColor={"#04439000"}
        offset={[0, 0]}
      >
        <Image
          source={require("../../../assets/FD.png")}
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
        <StyledButton
          onPress={() => navigation.navigate("Login")}
          text={"LOGOWANIE"}
        />
        <StyledButton
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Register")}
          text={"ZAŁÓŻ KONTO"}
        />
      </View>
    </BackgroundGradient>
  );
};

export default HomeScreen;
