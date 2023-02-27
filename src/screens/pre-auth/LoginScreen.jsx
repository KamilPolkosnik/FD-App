import { View, Text } from "react-native";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { emailPattern } from "../../../utils/validation.utils";
import { mainButton } from "../../styles/AppStyles";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import StyledInlineText from "../../components/StyledInlineText";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { Controller } from "react-hook-form";

const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const nextButtonRef = useRef();

  if (auth.currentUser) {
    navigation.navigate("PostAuth", { user: auth.currentUser });
  }

  const { control, handleSubmit, reset } = useForm();

  const onLoginClick = (data) => {
    setLoginError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        })
        setLoading(false)
        navigation.navigate("PostAuth", { user: userCredential.user });
      })
      .catch((error) => {
        setLoading(false);
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setLoginError("Użytkownik nie istnieje");
        } else if (errorCode === "auth/wrong-password") {
          setLoginError("Błędne hasło");
        } else {
          setLoginError("Coś poszło nie tak, spróbuj ponownie");
        }
      });
  };

  return (
    <BackgroundGradient marginHorizontal={30} justifyContent={'center'} flex={1}>
      <HeaderText
        text={"Logowanie"}
        additionalStyling={{ marginBottom: 0, marginTop: 50 }}
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
                returnKeyType="next"
                onSubmitEditing={() => {
                  nextButtonRef.current.focus();
                }}
                blurOnSubmit={false}
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
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Pole wymagane",
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
                ref={nextButtonRef}
                autoCapitalize={false}
                secureTextEntry={secureTextEntry}
                left={<TextInput.Icon icon={"lock"} iconColor={mainButton} />}
                right={
                  <TextInput.Icon
                    icon={"eye"}
                    iconColor={mainButton}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                }
                placeholder="Hasło"
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
        {loginError ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {loginError}
          </Text>
        ) : null}
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <StyledButton
            onPress={handleSubmit(onLoginClick)}
            text={"ZALOGUJ SIĘ"}
          />
        </View>
      </View>
      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <StyledInlineText
          text={"Zapomniałeś hasła?"}
          inlineText={"Kliknij tutaj"}
          onPress={() => navigation.navigate("Remind")}
        />
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
  )
};

export default LoginScreen;
