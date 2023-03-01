import { Text } from "react-native";
import React, {useState} from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { mainButton } from "../../styles/AppStyles";
import { auth } from "../../firebase/FirebaseConfig";
import { Button, Snackbar } from "react-native-paper";
import { sendEmailVerification, signOut } from "firebase/auth";

const Finance = () => {

  const onDismissSnackBar = () => setVisible(false);
  const [color, setColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState("");
  const [snackBarLogInfo, setSnackBarLogInfo] = useState("");

  return auth.currentUser.emailVerified ? (
    <BackgroundGradient
      justifyContent={"center"}
      marginHorizontal={30}
      flex={1}
    >
      <Text>Finance</Text>
    </BackgroundGradient>
  ) : (
    <BackgroundGradient
    justifyContent={"center"}
    marginHorizontal={0}
    flex={1}
  >
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
  )
};

export default Finance;
