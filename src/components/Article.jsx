import { TouchableOpacity, Text, ImageBackground } from "react-native";
import React from "react";
import { mainGreen } from "../styles/AppStyles";

const Article = ({
  articleTitle,
  articleImage,
  navigation,
  title,
  content,
  contentImage
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ArticleContent", {
          title: title,
          content: content,
          contentImage: contentImage
        })
      }
      style={{
        width: "100%",
        height: 250
      }}
    >
      <ImageBackground
        source={articleImage}
        style={{ flex: 1, justifyContent: "center", alignItems: "center", borderBottomWidth: 2, borderBottomColor: mainGreen }}
        resizeMode={'cover'}
      >
        <Text
          style={{
            backgroundColor: "rgba(22, 79, 143, 0.7)",
            width: "100%",
            textAlign: "center",
            height: 45,
            lineHeight: 45,
            fontSize: 18,
            color: "white",
            fontFamily: "Open-Sans-Bold",
          }}
        >
          {articleTitle}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Article;
