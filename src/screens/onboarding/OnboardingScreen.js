import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";

import { slides } from "./slides";
import OnboardingSlide from "../../components/OnboardingSlide";

export default function OnboardingScreen({ navigation }) {
  const pagerRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Go to Auth stack (Login default)
  const goToAuth = () => {
    navigation.replace("Auth");
  };

  // Go directly to Register inside Auth stack
  const goToRegister = () => {
    navigation.replace("Auth", {
      screen: "Register",
    });
  };

  const handleNext = () => {
    if (index === slides.length - 1) {
      goToAuth();
    } else {
      pagerRef.current?.setPage(index + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {/* SKIP */}
      <TouchableOpacity
        onPress={goToAuth}
        style={{ alignSelf: "flex-end", padding: 20 }}
      >
        <Text style={{ color: "#FFD400", fontSize: 14 }}>Skip</Text>
      </TouchableOpacity>

      {/* SLIDES */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}
      >
        {slides.map((item) => (
          <View key={item.id}>
            <OnboardingSlide item={item} />
          </View>
        ))}
      </PagerView>

      {/* FOOTER */}
      <View style={{ padding: 24 }}>
        {/* PRIMARY CTA */}
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: "#FFD400",
            paddingVertical: 16,
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
              color: "#000",
            }}
          >
            {index === slides.length - 1 ? "CONTINUE" : "NEXT"}
          </Text>
        </TouchableOpacity>

        {/* SECONDARY CTA */}
        <TouchableOpacity onPress={goToRegister} style={{ marginTop: 16 }}>
          <Text
            style={{
              color: "#777",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
