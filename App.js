
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainPage from "./screens/MainPage";
import MyTabs from './components/MyTabs';
import Profile from "./screens/Profile"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import AddPage from './screens/addPage';
import ProfileEdit from './screens/ProfileEdit';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}




