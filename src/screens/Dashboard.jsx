import { Text } from "react-native";
import React, { useState } from "react";
import BackgroundGradient from "../hoc/BackgroundGradient";
import StyledButton from "../components/StyledButton";
import { signOut } from "firebase/auth";
import { auth } from "../../App";

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <BackgroundGradient>
      <Text style={{ color: "white", marginVertical: 60 }}>
        Cześć {auth.currentUser ? auth.currentUser.displayName : null}
      </Text>
      <StyledButton text={"WYLOGUJ SIĘ"} onPress={logOut} loading={loading} />
    </BackgroundGradient>
  );
};

export default Dashboard;
