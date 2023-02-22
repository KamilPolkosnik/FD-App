import { View, Text } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailPattern } from "../../utils/validation.utils";
import { mainButton } from "../styles/AppStyles";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../hoc/BackgroundGradient";
import HeaderText from "../components/HeaderText";
import StyledButton from "../components/StyledButton";
import StyledInlineText from "../components/StyledInlineText";
import StyledTextInput from "../components/StyledTextInput";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../App";

const RemindPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [recoverMessage, setRecoverMessage] = useState("");
  const [recoverErrorMessage, setRecoverErrorMessage] = useState("");

  const onRecoverPasswordClick = (data) => {
    setRecoverErrorMessage("");
    setRecoverMessage("");
    setLoading(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setRecoverMessage(
          "Link do zmiany hasła został wysłany, za chwilę zostaniesz przeniesiony do ekranu logowania"
        );
        setTimeout(() => {
          navigation.navigate("Login");
        }, 4000);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setRecoverErrorMessage(
            "Użytkownik o podanym adresie e-mail nie istnieje"
          );
        } else {
          setRecoverErrorMessage("Coś poszło nie tak. Spróbuj ponownie");
        }
      });
  };

  return (
    <BackgroundGradient>
      <HeaderText
        text={"Odzyskiwanie hasła"}
        additionalStyling={{ marginBottom: 0 }}
      />
      <View style={{ width: "100%", marginTop: 30 }}>
        <StyledTextInput
          name="email"
          placeholder="E-mail"
          control={control}
          icon="account"
          autoCapitalize={false}
          secureTextEntry={false}
          rules={{
            required: "Pole wymagane",
            pattern: {
              value: emailPattern,
              message: "Wprowadź poprawny adres e-mail",
            },
          }}
        />
        {recoverMessage ? (
          <Text
            style={{ color: "#02FB3E", alignSelf: "stretch", marginTop: 3 }}
          >
            {recoverMessage}
          </Text>
        ) : null}
        {recoverErrorMessage ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {recoverErrorMessage}
          </Text>
        ) : null}
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <Shadow
            distance={10}
            style={{ width: "100%", borderRadius: 10 }}
            startColor={mainButton}
            endColor={"#43EDF600"}
            offset={[0, 0]}
          >
            <StyledButton
              onPress={handleSubmit(onRecoverPasswordClick)}
              text={"ODZYSKAJ HASŁO"}
              loading={loading}
            />
          </Shadow>
        </View>
      </View>

      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <StyledInlineText
          text={"Nie masz konta?"}
          inlineText={"Zarejestruj się"}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </BackgroundGradient>
  );
};

export default RemindPasswordScreen;
