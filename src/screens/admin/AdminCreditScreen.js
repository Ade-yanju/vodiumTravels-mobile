import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import api from "../../services/api";

export default function AdminCreditScreen() {
  const [userId, setUserId] = useState("");
  const [limit, setLimit] = useState("");

  const update = async () => {
    await api.patch(`/admin/credit/${userId}`, {
      creditLimit: Number(limit),
    });
    alert("Credit updated");
    setUserId("");
    setLimit("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 22 }}>
          Credit Override
        </Text>

        <TextInput
          placeholder="User ID"
          placeholderTextColor="#555"
          value={userId}
          onChangeText={setUserId}
          style={{ borderBottomWidth: 1, borderBottomColor: "#444", color: "#fff", marginTop: 24 }}
        />

        <TextInput
          placeholder="New Credit Limit"
          placeholderTextColor="#555"
          keyboardType="numeric"
          value={limit}
          onChangeText={setLimit}
          style={{ borderBottomWidth: 1, borderBottomColor: "#444", color: "#fff", marginTop: 24 }}
        />

        <TouchableOpacity
          onPress={update}
          style={{
            backgroundColor: "#FFD400",
            padding: 16,
            borderRadius: 14,
            marginTop: 40,
          }}
        >
          <Text style={{ textAlign: "center" }}>UPDATE CREDIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
