import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useEffect, useState } from "react";
  import api from "../services/api";
  import socket from "../services/socket";
  
  export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      const load = async () => {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      };
      load();
  
      socket.on("notification", (notif) => {
        setNotifications((prev) => [notif, ...prev]);
      });
  
      return () => socket.off("notification");
    }, []);
  
    const markRead = async (id) => {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1, padding: 24 }}>
          <Text style={{ color: "#fff", fontSize: 24 }}>
            Activity
          </Text>
  
          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 30 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => markRead(item._id)}
                style={{
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#222",
                }}
              >
                <Text
                  style={{
                    color: item.read ? "#777" : "#FFD400",
                  }}
                >
                  {item.title}
                </Text>
  
                <Text style={{ color: "#fff", marginTop: 4 }}>
                  {item.message}
                </Text>
  
                <Text
                  style={{
                    color: "#555",
                    marginTop: 4,
                    fontSize: 12,
                  }}
                >
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
  