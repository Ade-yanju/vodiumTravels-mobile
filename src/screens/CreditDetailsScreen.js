import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function CreditDetailsScreen() {
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/credit");
      setCredit(res.data);
    };
    load();
  }, []);

  if (!credit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Text style={{ color: "#777", textAlign: "center", marginTop: 40 }}>
          Loading credit…
        </Text>
      </SafeAreaView>
    );
  }

  const available = credit.creditLimit - credit.creditUsed;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>
          Credit Details
        </Text>

        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 20,
            padding: 24,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "#777" }}>CREDIT SCORE</Text>
          <Text style={{ color: "#FFD400", fontSize: 42 }}>
            {credit.score}
          </Text>

          <Text style={{ color: "#777", marginTop: 10 }}>
            Tier: {credit.tier}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 20,
            padding: 24,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#777" }}>LIMIT</Text>
          <Text style={{ color: "#fff", fontSize: 22 }}>
            ₦{credit.creditLimit.toLocaleString()}
          </Text>

          <Text style={{ color: "#777", marginTop: 10 }}>
            Used: ₦{credit.creditUsed.toLocaleString()}
          </Text>

          <Text style={{ color: "#777", marginTop: 10 }}>
            Available: ₦{available.toLocaleString()}
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ color: "#777", marginBottom: 6 }}>
            HOW YOUR SCORE WORKS
          </Text>
          {[
            "Wallet funding behavior",
            "Trip completion reliability",
            "Account age",
            "Concierge usage",
          ].map((item, i) => (
            <Text key={i} style={{ color: "#555", marginBottom: 4 }}>
              • {item}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
