import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminTripsScreen() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/admin/trips").then((res) => setTrips(res.data));
  }, []);

  const approve = async (id) => {
    const res = await api.patch(`/admin/trips/${id}/approve`);
    setTrips((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        contentContainerStyle={{ padding: 24 }}
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#222",
              paddingVertical: 16,
            }}
          >
            <Text style={{ color: "#FFD400" }}>
              {item.destination}
            </Text>
            <Text style={{ color: "#777" }}>
              ₦{item.cost} • {item.status}
            </Text>

            {item.status === "PENDING" && (
              <TouchableOpacity
                onPress={() => approve(item._id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "#FFD400",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ textAlign: "center" }}>APPROVE</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
