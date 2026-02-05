import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#FFD400", letterSpacing: 3 }}>
          VODIUM ADMIN
        </Text>

        <Text style={{ color: "#fff", fontSize: 26, marginTop: 20 }}>
          Operations Dashboard
        </Text>

        {[
          { label: "Trips Queue", screen: "AdminTrips" },
          { label: "Concierge Requests", screen: "AdminConcierge" },
          { label: "Credit Management", screen: "AdminCredit" },
        ].map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => navigation.navigate(item.screen)}
            style={{
              backgroundColor: "#111",
              padding: 20,
              borderRadius: 16,
              marginTop: 24,
            }}
          >
            <Text style={{ color: "#FFD400", fontSize: 16 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
