import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, {useState} from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { mainGreen, mainButton } from "../../styles/AppStyles";
import { auth } from "../../firebase/FirebaseConfig";
import { Button, Snackbar } from "react-native-paper";
import { sendEmailVerification, signOut } from "firebase/auth";

const Habbits = ({ navigation }) => {
  const habbitsArray = [
    {
      id: 1,
      source: require("../../../assets/habbits/morning.jpg"),
      description: "Poranne",
      navigation: () => navigation.navigate("MorningHabbits"),
    },
    {
      id: 2,
      source: require("../../../assets/habbits/daily.jpg"),
      description: "W ciągu dnia",
      navigation: () => navigation.navigate("DuringDayHabbits"),
    },
    {
      id: 3,
      source: require("../../../assets/habbits/evening.jpg"),
      description: "Wieczorne",
      navigation: () => navigation.navigate("EveningHabbits"),
    },
  ];

  const height = Dimensions.get("window").height * 0.32;

  const onDismissSnackBar = () => setVisible(false);
  const [color, setColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState("");
  const [snackBarLogInfo, setSnackBarLogInfo] = useState("");

  return auth.currentUser.emailVerified ? (
    <BackgroundGradient justifyContent={"center"} marginHorizontal={0} flex={1}>
      <View style={{ width: "100%", height: 2, backgroundColor: mainGreen }} />
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ justifyContent: "center", height: "100%" }}
        data={habbitsArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.navigation}>
            <View
              style={{
                width: "100%",
                height: height,
                borderBottomColor: mainGreen,
                borderBottomWidth: 2,
              }}
            >
              <ImageBackground
                source={item.source}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  justifyContent: "center",
                }}
                imageStyle={{ opacity: 0.9 }}
              >
                <Text
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    fontFamily: "Open-Sans-Bold",
                    height: 45,
                    lineHeight: 45,
                    textAlign: "center",
                    width: "100%",
                    fontSize: 25,
                    backgroundColor: "rgba(22, 79, 143, 0.7)",
                  }}
                >
                  {item.description}
                </Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
      />
    </BackgroundGradient>
  ) : (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <Text
        style={{ color: "white", fontFamily: "Open-Sans-Bold", fontSize: 22 }}
      >
        Zweryfikuj swoje konto
      </Text>
      <Button
        onPress={() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setVisible(true);
              setColor("green");
              setSnackBarInfo(
                `E-mail weryfikacyjny wysłany na ${auth.currentUser.email}`
              );
              setSnackBarLogInfo(`Po weryfikacji zaloguj się ponownie`);
              setTimeout(() => {
                signOut(auth)
                  .then(() => {
                    navigation.navigate("Home");
                    setLoading(false);
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }, 5000);
            })
            .catch((e) => {
              setVisible(true);
              setColor("red");
              setSnackBarInfo(e.message);
            });
        }}
        labelStyle={{
          fontFamily: "Open-Sans-Bold",
          fontSize: 14,
          flex: 1,
        }}
        style={{ width: "70%", marginBottom: 15, marginTop: 15 }}
        buttonColor={mainButton}
        textColor="black"
        mode="contained"
      >
        Wyślij e-mail weryfikacyjny
      </Button>
      <Snackbar
        onDismiss={onDismissSnackBar}
        duration={5000}
        style={{
          alignSelf: "center",
          width: "100%",
          backgroundColor: color,
        }}
        visible={visible}
      >
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 12,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {snackBarInfo}
        </Text>
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 12,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {snackBarLogInfo}
        </Text>
      </Snackbar>
    </BackgroundGradient>
  );
};

export default Habbits;
