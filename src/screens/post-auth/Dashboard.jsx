import { Text } from "react-native";
import React from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { auth } from "../../firebase/FirebaseConfig";

const Dashboard = () => {
  return (
    <BackgroundGradient marginHorizontal={30} justifyContent={'center'} flex={1}>
      <Text
        style={{
          color: "white",
          marginVertical: 60,
          textTransform: "capitalize",
        }}
      >
        Cześć {auth.currentUser ? auth.currentUser.displayName : null}
      </Text>
    </BackgroundGradient>
  );
};

export default Dashboard;

