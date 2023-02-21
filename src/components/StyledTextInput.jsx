import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { mainButton } from "../styles/AppStyles";

const StyledTextInput = (props) => {
  const { register } = useForm();

  const {
    icon,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    error,
    errorMessage,
    onKeyPress,
    registerLabel,
    registerSettings,
  } = props;

  return (
    <>
      <TextInput
        style={{
          backgroundColor: "rgba(81, 91, 140, 0.9)",
          width: "100%",
          fontSize: 16,
        }}
        outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
        mode="outlined"
        left={<TextInput.Icon icon={icon} iconColor={mainButton} />}
        placeholder={placeholder}
        placeholderTextColor={"white"}
        textColor={"white"}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...register(registerLabel, registerSettings)}
        error={error}
        onKeyPress={onKeyPress}
      />
      {errorMessage}
    </>
  );
};

export default StyledTextInput;
