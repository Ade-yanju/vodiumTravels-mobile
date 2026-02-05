import {
    View,
    Text,
    FlatList,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useEffect, useState } from "react";
  import api from "../services/api";
  
  export default function TransactionsScreen() {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const load = async () => {
        const res = await api.get("/transactions");
        setTransactions(res.data);
      };
      load();
    }, []);
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1, padding: 24 }}>
          <Text style={{ color: "#fff", fontSize: 24 }}>
            Transactions
          </Text>
  
          <FlatList
            data={transactions}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 30 }}
            renderItem={({ item }) => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#222",
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={{
                    color: item.type === "CREDIT" ? "#4CAF50" : "#F44336",
                  }}
                >
                  {item.type}
                </Text>
  
                <Text style={{ color: "#fff", marginTop: 4 }}>
                  ₦{item.amount.toLocaleString()}
                </Text>
  
                <Text style={{ color: "#777", marginTop: 4 }}>
                  {item.source}
                </Text>
  
                <Text style={{ color: "#555", marginTop: 4, fontSize: 12 }}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
  