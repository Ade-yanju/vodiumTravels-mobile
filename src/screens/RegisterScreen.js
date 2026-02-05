import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState, useContext } from "react";
  import api from "../services/api";
  import { AuthContext } from "../context/AuthContext";
  
  export default function RegisterScreen({ navigation }) {
    const { setToken } = useContext(AuthContext);
  
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

  
    const register = async () => {
      try {
        setLoading(true);
        const res = await api.post("/auth/register", {
          fullName,
          email,
          password,
        });
        login(res.data.token, {
            fullName,
            email,
            kycStatus: "NOT_STARTED",
          });
          
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
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
  
          {/* LOGO */}
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
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
                fontSize: 22,
                letterSpacing: 2,
                marginTop: 12,
              }}
            >
              VODIUM
            </Text>
  
            <Text style={{ color: "#777", marginTop: 6 }}>
              Bespoke Travel Concierge
            </Text>
          </View>
  
          {/* TITLE */}
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 40,
              marginBottom: 30,
            }}
          >
            Create your account
          </Text>
  
          {/* FULL NAME */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            FULL NAME
          </Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Alexander Vance"
            placeholderTextColor="#555"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#444",
              color: "#fff",
              paddingVertical: 10,
              marginBottom: 24,
            }}
          />
  
          {/* EMAIL */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            EMAIL ADDRESS
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="alex@vodium.luxe"
            placeholderTextColor="#555"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#444",
              color: "#fff",
              paddingVertical: 10,
              marginBottom: 24,
            }}
          />
  
          {/* PASSWORD */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            PASSWORD
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#555"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#444",
              color: "#fff",
              paddingVertical: 10,
            }}
          />
  
          {/* CTA */}
          <TouchableOpacity
            onPress={register}
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
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </Text>
          </TouchableOpacity>
  
          {/* FOOTER */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 24 }}
          >
            <Text style={{ color: "#777", textAlign: "center" }}>
              Already a member? Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  