import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

/* SCREENS */
import HomeScreen from "../screens/HomeScreen";
import TripsScreen from "../screens/TripsScreen";
import ConciergeScreen from "../screens/ConciergeScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#111",
          height: 70,
        },
        tabBarActiveTintColor: "#FFD400",
        tabBarInactiveTintColor: "#777",
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let icon;

          switch (route.name) {
            case "Home":
              icon = "home";
              break;
            case "Trips":
              icon = "airplane";
              break;
            case "Concierge":
              icon = "chatbubble-ellipses";
              break;
            case "Wallet":
              icon = "wallet";
              break;
            case "Profile":
              icon = "person";
              break;
          }

          return <Ionicons name={icon} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Concierge" component={ConciergeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
