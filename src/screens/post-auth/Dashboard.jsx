import { Text, FlatList, View } from "react-native";
import React from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { auth } from "../../firebase/FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import {
  mainBlue,
  mainPurple,
  mainGreen,
  mainButton,
} from "../../styles/AppStyles";
import Article from "../../components/Article";
import { articles } from "../../components/articles/articles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Dashboard = ({ navigation }) => {
  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <LinearGradient
        colors={[mainBlue, mainPurple]}
        style={{
          width: "100%",
          height: "20%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
          borderBottomColor: mainGreen,
          borderBottomWidth: 2,
        }}
        locations={[0.1, 0.8]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="post" size={64} color={mainButton} />
          <View style={{ marginLeft: 15, alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                textTransform: "capitalize",
                fontFamily: "Open-Sans-Bold",
              }}
            >
              Cześć {auth.currentUser ? auth.currentUser.displayName : null}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "Open-Sans-Bold",
              }}
            >
              Przeczytaj nasze ostatnie artykuły
            </Text>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        style={{ width: "100%" }}
        data={articles}
        renderItem={({ item }) => (
          <Article
            navigation={navigation}
            articleImage={item.source}
            articleTitle={item.title}
            title={item.title}
            content={item.content}
            contentImage={item.source}
          />
        )}
      />
    </BackgroundGradient>
  );
};

export default Dashboard;
