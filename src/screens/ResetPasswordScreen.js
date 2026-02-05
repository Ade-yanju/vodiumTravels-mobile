import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState } from "react";
  import api from "../services/api";
  
  export default function ResetPasswordScreen({ route, navigation }) {
    const { token } = route.params; // passed from reset link
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const resetPassword = async () => {
      try {
        setLoading(true);
        await api.post("/auth/reset-password", {
          token,
          password,
          confirmPassword,
        });
        alert("Password updated successfully");
        navigation.navigate("Login");
      } catch (err) {
        alert(err.response?.data?.message || "Reset failed");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1, padding: 24 }}>
  
          {/* BACK */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#FFD400", fontSize: 18 }}>‹</Text>
          </TouchableOpacity>
  
          {/* TITLE */}
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              marginTop: 40,
              marginBottom: 10,
            }}
          >
            Reset Member Password
          </Text>
  
          <Text style={{ color: "#777", marginBottom: 40 }}>
            Your password must be unique to your luxury membership.
          </Text>
  
          {/* NEW PASSWORD */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            NEW PASSWORD
          </Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••••••"
            placeholderTextColor="#555"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#444",
              color: "#fff",
              paddingVertical: 10,
              marginBottom: 24,
            }}
          />
  
          {/* CONFIRM PASSWORD */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            CONFIRM PASSWORD
          </Text>
          <TextInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••••••"
            placeholderTextColor="#555"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#444",
              color: "#fff",
              paddingVertical: 10,
            }}
          />
  
          {/* RULES */}
          <View style={{ marginTop: 30 }}>
            {[
              "At least 12 characters",
              "One uppercase letter",
              "One special symbol (!@#$)",
              "Passwords must match",
            ].map((rule, i) => (
              <Text key={i} style={{ color: "#777", marginBottom: 6 }}>
                • {rule}
              </Text>
            ))}
          </View>
  
          {/* CTA */}
          <TouchableOpacity
            onPress={resetPassword}
            disabled={loading}
            style={{
              backgroundColor: "#FFD400",
              paddingVertical: 18,
              borderRadius: 14,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {loading ? "Updating..." : "UPDATE PASSWORD"}
            </Text>
          </TouchableOpacity>
  
          <Text
            style={{
              color: "#444",
              textAlign: "center",
              marginTop: 30,
              fontSize: 12,
            }}
          >
            Protected by End-to-End Concierge Encryption
          </Text>
  
        </View>
      </SafeAreaView>
    );
  }
  