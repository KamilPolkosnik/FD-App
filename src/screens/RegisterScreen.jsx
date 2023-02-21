import { View, Text } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../utils/validation.utils";
import { mainButton } from "../styles/AppStyles";
import { Shadow } from "react-native-shadow-2";
import BackgroundGradient from "../hoc/BackgroundGradient";
import HeaderText from "../components/HeaderText";
import StyledButton from "../components/StyledButton";
import StyledInlineText from "../components/StyledInlineText";
import StyledTextInput from "../components/StyledTextInput";

const RegisterScreen = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    watch,
  } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { navigation } = props;

  return (
    <BackgroundGradient>
      <HeaderText
        text={"Rejestracja"}
        additionalStyling={{ marginBottom: 0 }}
      />
      <View style={{ width: "100%", marginTop: 30 }}>
        <StyledTextInput
          registerLabel="email"
          registerSettings={{
            required: "Pole wymagane",
            pattern: {
              value: emailPattern,
              message: "Błędny format e-mail",
            },
          }}
          icon="account"
          placeholder="E-mail"
          secureTextEntry={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={Boolean(errors.email)}
          errorMessage={
            errors.email && (
              <Text style={{ color: "red", marginVertical: 3 }}>
                {errors.email.message}
              </Text>
            )
          }
          onKeyPress={() => {
            trigger("email");
          }}
        />
        <StyledTextInput
          registerLabel="password"
          registerSettings={{
            required: "Pole wymagane",
            pattern: {
              value: passwordPattern,
              message:
                "Hasło powinno zawierać minimum: 1 wielką literę, 1 małą literę, 1 cyfrę, 1 znak specjalny oraz nie może być krótsze niż 8 znaków",
            },
          }}
          icon="lock"
          placeholder="Hasło"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={Boolean(errors.password)}
          errorMessage={
            errors.password && (
              <Text style={{ color: "red", marginVertical: 3 }}>
                {errors.password.message}
              </Text>
            )
          }
          onKeyPress={() => {
            trigger("password");
          }}
        />
        <StyledTextInput
          registerLabel="confirmPassword"
          registerSettings={{
            required: "Pole wymagane",
            validate: (value) =>
              value === watch("password", "") || "Hasło nie są identyczne",
            autocomplete: "off",
          }}
          icon="lock"
          placeholder="Hasło"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          error={Boolean(errors.password)}
          errorMessage={
            errors.password && (
              <Text style={{ color: "red", marginVertical: 3 }}>
                {errors.password.message}
              </Text>
            )
          }
          onKeyPress={() => {
            trigger("confirmPassword");
          }}
        />
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <Shadow
            distance={10}
            style={{ width: "100%", borderRadius: 10 }}
            startColor={mainButton}
            endColor={"#43EDF600"}
            offset={[0, 0]}
          >
            <StyledButton
              onPress={() => console.log("Register")}
              text={"ZAREJESTRUJ SIĘ"}
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
