import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

import api from "../services/api";
import socket from "../services/socket";

const CATEGORIES = [
  "FLIGHTS",
  "HOTELS",
  "VISA",
  "TRANSPORT",
  "EVENTS",
  "CUSTOM",
];

export default function ConciergeScreen({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("FLIGHTS");

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/concierge");
      setRequests(res.data);
    };
    load();

    socket.on("concierge_update", (req) => {
      setRequests((prev) => [req, ...prev]);
    });

    return () => socket.off("concierge_update");
  }, []);

  const submit = async () => {
    if (!message) return;

    try {
      const res = await api.post("/concierge", {
        message,
        category,
      });

      setMessage("");

      // 🚀 OPEN CHAT IMMEDIATELY
      navigation.navigate("ConciergeChat", {
        requestId: res.data._id,
      });
    } catch {
      alert("Unable to send request");
    }
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderLeftActions={() => (
        <View
          style={{
            backgroundColor: "#FFD400",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text>OPEN</Text>
        </View>
      )}
      onSwipeableLeftOpen={() =>
        navigation.navigate("ConciergeChat", {
          requestId: item._id,
        })
      }
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#222",
          paddingVertical: 16,
        }}
      >
        <Text style={{ color: "#FFD400" }}>{item.category}</Text>
        <Text style={{ color: "#fff", marginTop: 4 }}>{item.message}</Text>
        <Text style={{ color: "#777", marginTop: 4 }}>
          Status: {item.status}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Concierge</Text>

        {/* CATEGORY PICKER */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 16 }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: category === cat ? "#FFD400" : "#111",
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: category === cat ? "#000" : "#777",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INPUT */}
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 16,
            marginTop: 16,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Describe what you need..."
            placeholderTextColor="#555"
            multiline
            style={{ color: "#fff", minHeight: 80 }}
          />

          <TouchableOpacity
            onPress={submit}
            style={{
              backgroundColor: "#FFD400",
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 16,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "600" }}>
              START CONVERSATION
            </Text>
          </TouchableOpacity>
        </View>

        {/* REQUESTS */}
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          style={{ marginTop: 30 }}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
