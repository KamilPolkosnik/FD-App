import React from "react";
import {Text} from 'react-native';
import { TextInput } from "react-native-paper";
import { mainButton } from "../styles/AppStyles";
import { Controller } from "react-hook-form";

const StyledTextInput = ({
  name,
  icon,
  placeholder,
  secureTextEntry,
  control,
  rules = {},
  right
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value="", onChange, onBlur }, fieldState: {error} }) => (
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
          secureTextEntry={secureTextEntry}
          left={<TextInput.Icon icon={icon} iconColor={mainButton} />}
          right={right}
          placeholder={placeholder}
          placeholderTextColor={"white"}
          textColor={"white"}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
        {error && <Text style={{color: 'red', alignSelf: 'stretch', marginTop: 3}}>{error.message || "Błąd, spróbuj ponownie"}</Text>}
        </>
      )}
    />
  );
};

export default StyledTextInput;
