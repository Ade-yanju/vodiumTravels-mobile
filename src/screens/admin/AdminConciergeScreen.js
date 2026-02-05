import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminConciergeScreen({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/admin/concierge");
      setRequests(res.data);
    };
    load();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Concierge Requests</Text>

        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AdminConciergeChat", {
                  requestId: item._id,
                  user: item.userId,
                })
              }
              style={{
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#222",
              }}
            >
              <Text style={{ color: "#FFD400" }}>{item.category}</Text>
              <Text style={{ color: "#fff" }}>{item.userId.fullName}</Text>
              <Text style={{ color: "#777" }}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
