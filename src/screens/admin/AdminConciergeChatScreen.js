import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import api from "../../services/api";
import socket from "../../services/socket";

export default function AdminConciergeChatScreen({ route }) {
  const { requestId, user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/admin/concierge/${requestId}/messages`);
      setMessages(res.data);
    };
    load();

    socket.on("concierge_message", (msg) => {
      if (msg.requestId === requestId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("concierge_message");
  }, []);

  const send = async () => {
    if (!text) return;

    await api.patch(`/admin/concierge/${requestId}/reply`, { text });

    setText("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: "#FFD400", marginBottom: 10 }}>
          {user.fullName} • Concierge Chat
        </Text>

        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                alignSelf: item.sender === "ADMIN" ? "flex-end" : "flex-start",
                backgroundColor: item.sender === "ADMIN" ? "#FFD400" : "#111",
                padding: 12,
                borderRadius: 12,
                marginBottom: 10,
                maxWidth: "80%",
              }}
            >
              <Text
                style={{
                  color: item.sender === "ADMIN" ? "#000" : "#fff",
                }}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Reply to user..."
            placeholderTextColor="#555"
            style={{
              flex: 1,
              color: "#fff",
              backgroundColor: "#111",
              padding: 12,
              borderRadius: 12,
            }}
          />
          <TouchableOpacity
            onPress={send}
            style={{
              marginLeft: 10,
              backgroundColor: "#FFD400",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
