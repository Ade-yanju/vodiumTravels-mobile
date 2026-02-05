import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import api from "../services/api";

export default function CreateTripScreen({ navigation }) {
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState("");
  const [paymentType, setPaymentType] = useState("CREDIT");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!destination || !cost) {
      alert("Please complete all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/trips", {
        destination,
        cost: Number(cost),
        paymentType,
      });

      // ✅ GO BACK TO TRIPS TAB
      navigation.replace("Main", {
        screen: "Trips",
      });
    } catch (e) {
      alert(e.response?.data?.message || "Trip request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        {/* BACK */}
        <TouchableOpacity
          onPress={() => navigation.replace("Main", { screen: "Trips" })}
        >
          <Text style={{ color: "#FFD400", fontSize: 18 }}>✕</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            marginTop: 20,
          }}
        >
          Request a Trip
        </Text>

        <TextInput
          placeholder="Destination"
          placeholderTextColor="#555"
          value={destination}
          onChangeText={setDestination}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#444",
            color: "#fff",
            marginTop: 24,
            paddingVertical: 8,
          }}
        />

        <TextInput
          placeholder="Cost (NGN)"
          placeholderTextColor="#555"
          keyboardType="numeric"
          value={cost}
          onChangeText={setCost}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#444",
            color: "#fff",
            marginTop: 24,
            paddingVertical: 8,
          }}
        />

        <TouchableOpacity
          onPress={() =>
            setPaymentType(paymentType === "CREDIT" ? "WALLET" : "CREDIT")
          }
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "#FFD400" }}>Pay with: {paymentType}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={submit}
          disabled={loading}
          style={{
            backgroundColor: "#FFD400",
            padding: 16,
            borderRadius: 14,
            marginTop: 40,
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {loading ? "Submitting..." : "SUBMIT REQUEST"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
