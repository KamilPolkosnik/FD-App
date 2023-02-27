import { View, Text } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailPattern } from "../../../utils/validation.utils";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import StyledInlineText from "../../components/StyledInlineText";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { Controller } from "react-hook-form";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { mainButton } from "../../styles/AppStyles";

const RemindPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [recoverErrorMessage, setRecoverErrorMessage] = useState("");

  const onRecoverPasswordClick = (data) => {
    setRecoverErrorMessage("");
    setLoading(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
        setLoading(false);
        navigation.navigate("Redirect", {
          redirectText:
            "Link do zmiany hasła został wysłany, za chwilę zostaniesz przeniesiony do ekranu logowania",
          redirectToLogin: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
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
    <BackgroundGradient marginHorizontal={30} justifyContent={'center'} flex={1}>
      <HeaderText
        text={"Odzyskiwanie hasła"}
        additionalStyling={{ marginBottom: 0 }}
      />
      <View style={{ width: "100%", marginTop: 30 }}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Pole wymagane",
            pattern: {
              value: emailPattern,
              message: "Wprowadź poprawny adres e-mail",
            },
          }}
          render={({
            field: { value = "", onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={{
                  backgroundColor: "rgba(81, 91, 140, 0.9)",
                  width: "100%",
                  fontSize: 16,
                }}
                outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                mode="outlined"
                autoCapitalize={false}
                left={
                  <TextInput.Icon icon={"account"} iconColor={mainButton} />
                }
                placeholder="E-mail"
                placeholderTextColor={"white"}
                textColor={"white"}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && (
                <Text
                  style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}
                >
                  {error.message || "Błąd, spróbuj ponownie"}
                </Text>
              )}
            </>
          )}
        />
        {recoverErrorMessage ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {recoverErrorMessage}
          </Text>
        ) : null}
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <StyledButton
            onPress={handleSubmit(onRecoverPasswordClick)}
            text={"ODZYSKAJ HASŁO"}
          />
        </View>
      </View>

      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <StyledInlineText
          text={"Nie masz konta?"}
          inlineText={"Zarejestruj się"}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <ActivityIndicator
        style={{ position: 'absolute', top: '50%' }}
        animating={loading}
        color={mainButton}
        size="large"
      />
    </BackgroundGradient>
  );
};

export default RemindPasswordScreen;
