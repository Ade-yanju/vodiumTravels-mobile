import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState } from "react";
  import api from "../services/api";
  
  export default function RecoverAccessScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
  
    const sendResetLink = async () => {
      try {
        setLoading(true);
        await api.post("/auth/forgot-password", { email });
        alert("If the email exists, recovery instructions have been sent.");
        navigation.goBack();
      } catch {
        alert("Unable to process request");
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
  
          {/* ICON */}
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
              <Text style={{ fontWeight: "700" }}>🔑</Text>
            </View>
          </View>
  
          {/* TITLE */}
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              marginTop: 40,
              marginBottom: 10,
            }}
          >
            Recover Access
          </Text>
  
          <Text style={{ color: "#777", marginBottom: 40 }}>
            Enter your registered email to receive recovery instructions.
          </Text>
  
          {/* EMAIL */}
          <Text style={{ color: "#888", marginBottom: 6 }}>
            EMAIL ADDRESS
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. member@luxurytravel.com"
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
            onPress={sendResetLink}
            disabled={loading}
            style={{
              backgroundColor: "#FFD400",
              paddingVertical: 18,
              borderRadius: 14,
              marginTop: 50,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {loading ? "Sending..." : "SEND RESET LINK →"}
            </Text>
          </TouchableOpacity>
  
          {/* FOOTER */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
          >
            <Text style={{ color: "#777", textAlign: "center" }}>
              ← Back to login
            </Text>
          </TouchableOpacity>
  
          <Text
            style={{
              color: "#444",
              textAlign: "center",
              marginTop: 40,
              fontSize: 12,
            }}
          >
            Concierge Support Available 24/7
          </Text>
  
        </View>
      </SafeAreaView>
    );
  }
  