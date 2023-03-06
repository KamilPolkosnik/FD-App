import { Text, FlatList, View } from "react-native";
import React, { useState } from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { auth } from "../../firebase/FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import {
  mainBlue,
  mainPurple,
  mainGreen,
  mainButton,
} from "../../styles/AppStyles";
import Article from "../../components/Article";
import { articles } from "../../components/articles/articles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Snackbar } from "react-native-paper";
import { sendEmailVerification, signOut } from "firebase/auth";
import { uuidv4 } from "@firebase/util";

const Dashboard = ({ navigation }) => {
  const onDismissSnackBar = () => setVisible(false);
  const [color, setColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState("");
  const [snackBarLogInfo, setSnackBarLogInfo] = useState("");

  return auth.currentUser.emailVerified ? (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <LinearGradient
        colors={[mainBlue, mainPurple]}
        style={{
          width: "100%",
          height: "20%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
          borderBottomColor: mainGreen,
          borderBottomWidth: 2,
        }}
        locations={[0.5, 0.99]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="post" size={64} color={mainButton} />
          <View style={{ marginLeft: 15, alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                textTransform: "capitalize",
                fontFamily: "Open-Sans-Bold",
              }}
            >
              Cześć {auth.currentUser ? auth.currentUser.displayName : null}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "Open-Sans-Bold",
              }}
            >
              Przeczytaj nasze ostatnie artykuły
            </Text>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        style={{ width: "100%" }}
        data={articles}
        keyExtractor={() => uuidv4()}
        renderItem={({ item }) => (
          <Article
            navigation={navigation}
            articleImage={item.source}
            articleTitle={item.title}
            title={item.title}
            content={item.content}
            contentImage={item.source}
          />
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

export default Dashboard;
