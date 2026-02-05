import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import AdminTripsScreen from "../screens/admin/AdminTripsScreen";
import AdminConciergeScreen from "../screens/admin/AdminConciergeScreen";
import AdminCreditScreen from "../screens/admin/AdminCreditScreen";

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="AdminTrips" component={AdminTripsScreen} />
      <Stack.Screen name="AdminConcierge" component={AdminConciergeScreen} />
      <Stack.Screen name="AdminCredit" component={AdminCreditScreen} />
    </Stack.Navigator>
  );
}
