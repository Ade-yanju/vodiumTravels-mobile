import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";
import socket from "../services/socket";

export default function HomeScreen() {
  const [wallet, setWallet] = useState(null);
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const walletRes = await api.get("/wallet");
      const creditRes = await api.get("/credit");

      setWallet(walletRes.data);
      setCredit(creditRes.data);
    };

    loadData();

    // REAL-TIME UPDATES
    socket.on("wallet_update", (data) => {
      setWallet((prev) =>
        prev && prev.userId === data.userId
          ? { ...prev, balance: data.balance }
          : prev,
      );
    });

    socket.on("credit_update", (data) => {
      setCredit((prev) =>
        prev && prev.userId === data.userId ? { ...prev, ...data } : prev,
      );
    });

    return () => {
      socket.off("wallet_update");
      socket.off("credit_update");
    };
  }, []);

  if (!wallet || !credit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#777" }}>Loading vault…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        {/* HEADER */}
        <Text
          style={{
            color: "#FFD400",
            letterSpacing: 4,
            fontSize: 12,
          }}
        >
          VODIUM
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 26,
            marginTop: 18,
          }}
        >
          Welcome back
        </Text>

        {/* CREDIT CARD */}
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 22,
            padding: 24,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "#777" }}>CREDIT SCORE</Text>

          <Text
            style={{
              color: "#FFD400",
              fontSize: 42,
              marginTop: 6,
            }}
          >
            {credit.score}
          </Text>

          <Text style={{ color: "#777", marginTop: 6 }}>
            Tier: {credit.tier}
          </Text>

          <Text style={{ color: "#777", marginTop: 6 }}>
            Credit Limit: ₦{credit.creditLimit.toLocaleString()}
          </Text>
        </View>

        {/* WALLET */}
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 22,
            padding: 24,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#777" }}>WALLET BALANCE</Text>

          <Text
            style={{
              color: "#fff",
              fontSize: 34,
              marginTop: 8,
            }}
          >
            ₦{wallet.balance.toLocaleString()}
          </Text>
        </View>

        {/* QUICK ACTIONS (VISUAL SHORTCUTS) */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 34,
          }}
        >
          {[
            { label: "Trips", icon: "airplane" },
            { label: "Concierge", icon: "chatbubble-ellipses" },
            { label: "Wallet", icon: "wallet" },
            { label: "Profile", icon: "person" },
          ].map((item) => (
            <View
              key={item.label}
              style={{
                alignItems: "center",
                width: "23%",
              }}
            >
              <View
                style={{
                  backgroundColor: "#111",
                  padding: 16,
                  borderRadius: 18,
                }}
              >
                <Ionicons name={item.icon} size={22} color="#FFD400" />
              </View>

              <Text
                style={{
                  color: "#777",
                  fontSize: 12,
                  marginTop: 8,
                }}
              >
                {item.label}
              </Text>
            </View> */}
          {/* ))} */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}
