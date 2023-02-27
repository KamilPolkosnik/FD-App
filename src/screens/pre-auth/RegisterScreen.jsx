import { View, Text } from "react-native";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../../utils/validation.utils";
import { mainButton } from "../../styles/AppStyles";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import StyledInlineText from "../../components/StyledInlineText";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { auth } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Controller } from "react-hook-form";

const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const { control, handleSubmit, watch, reset } = useForm();

  const nextButton1Ref = useRef();
  const nextButton2Ref = useRef();
  const nextButton3Ref = useRef();

  const password = watch("password");
  const name = watch("displayName");

  const onRegisterClick = (data) => {
    setRegisterError("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        const user = userCredential.user;
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
        setLoading(false);
        navigation.navigate("Redirect", {
          redirectText:
            "Udało się założyć konto. Za chwilę zostaniesz przekierowany do ekranu logowania.",
          redirectToLogin: true,
        });
      })
      .then(() => {})
      .catch((error) => {
        setLoading(false);
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setRegisterError("Konto o podanym adresie E-mail już istnieje");
        } else {
          setRegisterError("Coś poszło nie tak. Spróbuj ponownie");
        }
      });
  };

  return (
    <BackgroundGradient marginHorizontal={30} justifyContent={'center'} flex={1}>
      <HeaderText
        text={"Rejestracja"}
        additionalStyling={{ marginBottom: 0, marginTop: 50 }}
      />
      <View style={{ width: "100%", marginTop: 30 }}>
        <Controller
          control={control}
          name="displayName"
          rules={{
            required: "Pole wymagane",
            minLength: {
              value: 5,
              message: "Pole musi zawierać minimum 5 znaków",
            },
            maxLength: {
              value: 35,
              message: "Pole może zawierać maximum 35 znaków",
            }
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
                  nextButton1Ref.current.focus();
                }}
                blurOnSubmit={false}
                mode="outlined"
                autoCapitalize={true}
                left={
                  <TextInput.Icon icon={"account"} iconColor={mainButton} />
                }
                placeholder="Imię i nazwisko"
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
                ref={nextButton1Ref}
                returnKeyType="next"
                onSubmitEditing={() => {
                  nextButton2Ref.current.focus();
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
            pattern: {
              value: passwordPattern,
              message:
                "Hasło powinno zawierać minimum: 1 wielką literę, 1 małą literę, 1 cyfrę, 1 znak specjalny oraz nie może być krótsze niż 8 znaków",
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
                  nextButton3Ref.current.focus();
                }}
                blurOnSubmit={false}
                ref={nextButton2Ref}
                mode="outlined"
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
        <Controller
          control={control}
          name="repeatPassword"
          rules={{
            validate: (value) => value == password || "Hasła nie są identyczne",
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
                ref={nextButton3Ref}
                mode="outlined"
                autoCapitalize={false}
                secureTextEntry={secureTextEntry}
                left={<TextInput.Icon icon={"lock"} iconColor={mainButton} />}
                placeholder="Powtórz Hasło"
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
        {registerError ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {registerError}
          </Text>
        ) : null}
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <StyledButton
            onPress={handleSubmit(onRegisterClick)}
            text={"ZAREJESTRUJ SIĘ"}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <StyledInlineText
          text={"Masz już konto?"}
          inlineText={"Zaloguj się"}
          onPress={() => navigation.navigate("Login")}
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

export default RegisterScreen;
