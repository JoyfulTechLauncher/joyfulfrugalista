import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./screens/Details";
import Summary from "./screens/Summary";
import AddPage from "./screens/addPage";
import Community from "./screens/Community";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import {
  Octicons,
  Fontisto,
  MaterialIcons,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    // <View>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#2d144b" },
        headerStyle: { backgroundColor: "#2d144b" },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="note" color="white" size={size} />
          ),
          tabBarLabelStyle: {
            color: "white",
          },
        }}
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="bar-chart" size={21} color="white" />
          ),
          tabBarLabelStyle: {
            color: "white",
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-group" size={21} color="white" />
          ),
          tabBarLabelStyle: {
            color: "white",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="v-card" size={24} color="white" />
          ),
          tabBarLabelStyle: {
            color: "white",
          },
        }}
      />
    </Tab.Navigator>
    //</View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
}

function AppNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyStack" component={MyStack} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    right: 30,
  },
});

export default AppNav;
