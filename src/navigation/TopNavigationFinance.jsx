import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mainBlue, mainGreen, mainButton } from "../styles/AppStyles";
import { auth } from "../firebase/FirebaseConfig";
import BackgroundGradient from "../hoc/BackgroundGradient";
import { Text } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import React, { useState } from "react";
import Income from "../screens/post-auth/finance/Income";
import Outcome from "../screens/post-auth/finance/Outcome";
import Summary from "../screens/post-auth/finance/Summary";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const onDismissSnackBar = () => setVisible(false);
  const [color, setColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState("");
  const [snackBarLogInfo, setSnackBarLogInfo] = useState("");
  const insets = useSafeAreaInsets();
  return auth.currentUser.emailVerified ? (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: mainGreen,
        tabBarInactiveTintColor: "#36B2EB",
        tabBarStyle: {
          backgroundColor: mainBlue,
          paddingTop: insets.top,
          borderBottomWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Open-Sans-Bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: mainGreen,
        },
      }}
    >
      <Tab.Screen
        name="Income"
        component={Income}
        options={{ tabBarLabel: "Przychody" }}
      />
      <Tab.Screen
        name="Outcome"
        component={Outcome}
        options={{ tabBarLabel: "Rozchody" }}
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{ tabBarLabel: "Podsumowanie" }}
      />
    </Tab.Navigator>
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
                `E-mail weryfikacyjny wys??any na ${auth.currentUser.email}`
              );
              setSnackBarLogInfo(`Po weryfikacji zaloguj si?? ponownie`);
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
        Wy??lij e-mail weryfikacyjny
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
}

export default function TopNavigationFinance() {
  return <MyTabs />;
}
