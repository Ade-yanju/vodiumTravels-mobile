import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

export default function TripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/trips");
      setTrips(res.data);
    };
    load();

    socket.on("trip_update", (trip) => {
      setTrips((prev) => [trip, ...prev]);
    });

    return () => socket.off("trip_update");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Your Trips</Text>

        <FlatList
          data={trips}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#222" }}>
              <Text style={{ color: "#FFD400" }}>{item.destination}</Text>
              <Text style={{ color: "#777" }}>
                ₦{item.cost.toLocaleString()} • {item.status}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateTrip")}
          style={{ backgroundColor: "#FFD400", padding: 16, borderRadius: 14, marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            REQUEST A TRIP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
