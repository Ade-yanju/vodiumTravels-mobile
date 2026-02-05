import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function WalletScreen({ navigation }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/wallet");
      setWallet(res.data);
    };
    load();
  }, []);

  if (!wallet) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Text style={{ color: "#777", textAlign: "center", marginTop: 40 }}>
          Loading wallet…
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>
          Wallet
        </Text>

        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 20,
            padding: 24,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "#777" }}>BALANCE</Text>
          <Text style={{ color: "#FFD400", fontSize: 36 }}>
            ₦{wallet.balance.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Transactions")}
          style={{
            backgroundColor: "#FFD400",
            padding: 18,
            borderRadius: 14,
            marginTop: 40,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            VIEW TRANSACTIONS
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#555",
            marginTop: 30,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          All wallet activity is securely recorded
        </Text>
      </View>
    </SafeAreaView>
  );
}
