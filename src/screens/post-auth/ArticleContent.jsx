import { Text, View, ImageBackground } from "react-native";
import React from "react";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { ScrollView } from "react-native-gesture-handler";
import { mainGreen } from "../../styles/AppStyles";

const ArticleContent = ({ route }) => {
  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={route.params.contentImage}
          resizeMode={"cover"}
        >
          <Text
            style={{
              backgroundColor: "rgba(22, 79, 143, 0.7)",
              width: "100%",
              textAlign: "center",
              height: 60,
              lineHeight: 60,
              fontSize: 18,
              color: "white",
              fontFamily: "Open-Sans-Bold",
            }}
          >
            {route.params.title}
          </Text>
        </ImageBackground>
      </View>
      <View style={{ width: "100%", height: 2, backgroundColor: mainGreen }} />
      <ScrollView
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            lineHeight: 35,
            paddingBottom: 30,
          }}
        >
          {route.params.content}
        </Text>
      </ScrollView>
    </BackgroundGradient>
  );
};

export default ArticleContent;
