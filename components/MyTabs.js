import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Details from "../screens/Details";
import Summary from "../screens/Summary";
import Community from "../screens/Community";
import Profile from "../screens/Profile";
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    // <View>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#2d144b" },
        headerStyle: { backgroundColor: "#2d144b" },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Summary" component={Summary} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    //</View>
  );
}
export default MyTabs;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    right: 30,
  },
});
