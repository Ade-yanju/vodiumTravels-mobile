import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/* FLOWS */
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import AuthNavigator from "./AuthNavigator";
import MainTabs from "./MainTabs";
import AdminNavigator from "./AdminNavigator";

/* DETAIL SCREENS */
import CreditDetailsScreen from "../screens/CreditDetailsScreen";
import CreateTripScreen from "../screens/CreateTripScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import ConciergeChatScreen from "../screens/ConciergeChatScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, user, onboardingSeen } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {/* 🟡 ONBOARDING */}
      {!onboardingSeen && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
      )}

      {/* 🔐 AUTH */}
      {!token && onboardingSeen && (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />
      )}

      {/* 👤 USER APP */}
      {token && user?.role === "USER" && (
        <>
          <Stack.Screen name="Main" component={MainTabs} />

          {/* DETAIL / ACTION SCREENS */}
          <Stack.Screen
            name="CreditDetails"
            component={CreditDetailsScreen}
          />
          <Stack.Screen
            name="CreateTrip"
            component={CreateTripScreen}
          />
          <Stack.Screen
            name="Transactions"
            component={TransactionsScreen}
          />
          <Stack.Screen
            name="ConciergeChat"
            component={ConciergeChatScreen}
          />
        </>
      )}

      {/* 🧑‍💼 ADMIN APP */}
      {token && user?.role === "ADMIN" && (
        <Stack.Screen
          name="Admin"
          component={AdminNavigator}
        />
      )}
    </Stack.Navigator>
  );
}
