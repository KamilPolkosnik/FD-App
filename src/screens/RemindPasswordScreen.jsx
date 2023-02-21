import { View } from "react-native";
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

const RemindPasswordScreen = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    watch,
  } = useForm();

  const [email, setEmail] = useState("");

  const { navigation } = props;

  return (
    <BackgroundGradient>
      <HeaderText
        text={"Odzyskiwanie hasła"}
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
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <Shadow
            distance={10}
            style={{ width: "100%", borderRadius: 10 }}
            startColor={mainButton}
            endColor={"#43EDF600"}
            offset={[0, 0]}
          >
            <StyledButton
              onPress={() => {
                navigation.navigate("Login");
                console.log("Hasło odzyskane");
              }}
              text={"ODZYSKAJ HASŁO"}
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
