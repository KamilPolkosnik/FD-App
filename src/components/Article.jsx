import { TouchableOpacity, Text, ImageBackground } from "react-native";
import React from "react";

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
        height: 250,
        marginVertical: 3,
      }}
    >
      <ImageBackground
        source={articleImage}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        resizeMode={'cover'}
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
          {articleTitle}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Article;
