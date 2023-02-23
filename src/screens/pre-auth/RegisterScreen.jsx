import { View, Text } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../../utils/validation.utils";
import { mainButton } from "../../styles/AppStyles";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import HeaderText from "../../components/HeaderText";
import StyledButton from "../../components/StyledButton";
import StyledInlineText from "../../components/StyledInlineText";
import StyledTextInput from "../../components/StyledTextInput";
import { TextInput } from "react-native-paper";
import { auth } from '../../firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const { control, handleSubmit, watch, reset } = useForm();

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
            "Udało się założyć konto. Za chwilę zostaniesz przekierowany do swojego profilu.",
        });
      })
      .then(() => {})
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setRegisterError("Konto o podanym adresie E-mail już istnieje");
        } else {
          setRegisterError("Coś poszło nie tak. Spróbuj ponownie");
        }
      });
  };

  return (
    <BackgroundGradient>
      <HeaderText
        text={"Rejestracja"}
        additionalStyling={{ marginBottom: 0, marginTop: 50 }}
      />
      <View style={{ width: "100%", marginTop: 30 }}>
        <StyledTextInput
          name="displayName"
          placeholder="Imię"
          control={control}
          icon="account"
          autoCapitalize={true}
          secureTextEntry={false}
          rules={{
            required: "Pole wymagane",
            minLength: {
              value: 2,
              message: "Imię musi zawierać minimum 2 znaki",
            },
          }}
        />
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
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          rules={{
            required: "Pole wymagane",
            pattern: {
              value: passwordPattern,
              message:
                "Hasło powinno zawierać minimum: 1 wielką literę, 1 małą literę, 1 cyfrę, 1 znak specjalny oraz nie może być krótsze niż 8 znaków",
            },
          }}
        />
        <StyledTextInput
          name="repeatPassword"
          placeholder="Powtórz Hasło"
          control={control}
          icon="lock"
          secureTextEntry={secureTextEntry}
          rules={{
            validate: (value) => value == password || "Hasła nie są identyczne",
          }}
        />
        {registerError ? (
          <Text style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}>
            {registerError}
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
              onPress={handleSubmit(onRegisterClick)}
              text={"ZAREJESTRUJ SIĘ"}
              loading={loading}
            />
          </Shadow>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <StyledInlineText
          text={"Masz już konto?"}
          inlineText={"Zaloguj się"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </BackgroundGradient>
  );
};

export default RegisterScreen;
