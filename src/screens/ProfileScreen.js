import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/users/me");
      setUser(res.data);
    };
    load();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Text style={{ color: "#777", textAlign: "center", marginTop: 40 }}>
          Loading profile…
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>
          Profile
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text style={{ color: "#777" }}>FULL NAME</Text>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {user.fullName}
          </Text>

          <Text style={{ color: "#777", marginTop: 20 }}>EMAIL</Text>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {user.email}
          </Text>

          <Text style={{ color: "#777", marginTop: 20 }}>KYC STATUS</Text>
          <Text style={{ color: "#FFD400", fontSize: 16 }}>
            {user.kycStatus.replace("_", " ")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreditDetails")}
          style={{
            backgroundColor: "#111",
            padding: 18,
            borderRadius: 14,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "#FFD400", textAlign: "center" }}>
            VIEW CREDIT DETAILS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logout}
          style={{
            marginTop: 30,
            borderWidth: 1,
            borderColor: "#333",
            padding: 16,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "#777", textAlign: "center" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
