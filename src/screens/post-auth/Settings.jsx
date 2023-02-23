import React, { useState } from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { signOut } from "firebase/auth";
import StyledButton from "../../components/StyledButton";
import { auth } from "../../firebase/FirebaseConfig";

const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigation.navigate("Home");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <BackgroundGradient>
      <StyledButton text={"WYLOGUJ SIĘ"} onPress={logOut} loading={loading} />
    </BackgroundGradient>
  );
};

export default Settings;
