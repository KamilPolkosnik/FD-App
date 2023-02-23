import { View, Text } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailPattern } from "../../../utils/validation.utils";
import { mainButton } from "../../styles/AppStyles";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import StyledInlineText from "../../components/StyledInlineText";
import StyledTextInput from "../../components/StyledTextInput";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/FirebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

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
        });
        setLoading(false);
        navigation.navigate("PostAuth", { user: userCredential.user });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setLoginError("Użytkownik nie istnieje");
        } else if (errorCode === "auth/wrong-password") {
          setLoginError("Błędne hasło");
        } else {
          setLoginError("Coś poszło nie tak. Spróbuj ponownie");
        }
      });
  };

  return (
    <BackgroundGradient>
      <HeaderText
        text={"Logowanie"}
        additionalStyling={{ marginBottom: 0, marginTop: 50 }}
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
        <StyledTextInput
          name="password"
          placeholder="Hasło"
          control={control}
          icon="lock"
          autoCapitalize={false}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={"eye"}
              iconColor={mainButton}
              onPress={() => {
                setSecureTextEntry(!secureTextEntry)
              }}
            />
          }
          rules={{
            required: "Pole wymagane",
          }}
        />
        {loginError ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {loginError}
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
              onPress={handleSubmit(onLoginClick)}
              text={"ZALOGUJ SIĘ"}
              loading={loading}
            />
          </Shadow>
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
    </BackgroundGradient>
  );
};

export default LoginScreen;
