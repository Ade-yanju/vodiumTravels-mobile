import { View, Text, Image } from "react-native";

export default function OnboardingSlide({ item }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Image
        source={item.image}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 300,
          marginTop: 40,
        }}
      />

      <Text
        style={{
          color: "#FFD400",
          fontSize: 24,
          textAlign: "center",
          marginTop: 40,
          fontWeight: "600",
        }}
      >
        {item.title}
      </Text>

      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          textAlign: "center",
          marginTop: 16,
          lineHeight: 24,
        }}
      >
        {item.description}
      </Text>
    </View>
  );
}
