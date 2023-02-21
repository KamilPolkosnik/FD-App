import { View } from "react-native";
import React from "react";
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

  const onRecoverPasswordClick = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        console.log('email send')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

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
          secureTextEntry={false}
          rules={{
            required: "Pole wymagane",
            pattern: {
              value: emailPattern,
              message: "Wprowadź poprawny adres e-mail",
            },
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
              onPress={handleSubmit(onRecoverPasswordClick)}
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
