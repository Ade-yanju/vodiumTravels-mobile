import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // ✅ cookie-like
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ ONLY update auth state
      // Navigation is handled automatically by AppNavigator
      await login(token, user, rememberMe);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        {/* LOGO */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#FFD400",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>V</Text>
          </View>

          <Text
            style={{
              color: "#FFD400",
              marginTop: 12,
              letterSpacing: 3,
              fontSize: 14,
            }}
          >
            VODIUM
          </Text>
        </View>

        {/* TITLE */}
        <Text
          style={{
            color: "#fff",
            fontSize: 26,
            marginTop: 50,
            marginBottom: 8,
            fontFamily: "serif",
          }}
        >
          Member Login
        </Text>

        <Text style={{ color: "#777", marginBottom: 36 }}>
          Enter the private vault of luxury travel
        </Text>

        {/* EMAIL */}
        <Text style={{ color: "#888", marginBottom: 6 }}>MEMBER EMAIL</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. alex@vodium.luxe"
          placeholderTextColor="#555"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#444",
            color: "#fff",
            paddingVertical: 10,
            marginBottom: 28,
          }}
        />

        {/* PASSWORD */}
        <Text style={{ color: "#888", marginBottom: 6 }}>SECURITY CODE</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#444",
            paddingVertical: 6,
          }}
        >
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="••••••••"
            placeholderTextColor="#555"
            style={{
              flex: 1,
              color: "#fff",
              paddingVertical: 8,
            }}
          />

          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ padding: 6 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* REMEMBER ME */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Text style={{ color: "#777" }}>Remember this device</Text>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            thumbColor="#FFD400"
          />
        </View>

        {/* FORGOT */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Recover")}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: "#FFD400", fontSize: 13 }}>
            Forgot security code?
          </Text>
        </TouchableOpacity>

        {/* CTA */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#FFD400",
            paddingVertical: 18,
            borderRadius: 14,
            marginTop: 40,
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {loading ? "Entering Vault..." : "ENTER VAULT"}
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 30 }}
        >
          <Text style={{ color: "#777", textAlign: "center" }}>
            Not a member yet?{" "}
            <Text style={{ color: "#FFD400" }}>Request an invitation</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
