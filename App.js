import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useContext } from "react";

import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#FFD400" size="large" />
      </View>
    );
  }

  return <AppNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
