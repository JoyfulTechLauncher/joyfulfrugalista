import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import MyTabs from "./components/MyTabs";
import Profile from "./screens/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import AddPage from "./screens/addPage";
import AppNav from "./NavConfig";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Registry" component={Registry} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <AppNav />;
}
