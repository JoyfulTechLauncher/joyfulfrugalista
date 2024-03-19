import { TextInput, View, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PrimaryButton from "../components/PrimaryButton";
import MenuButton from "../components/PrimaryButton";
import ButtonsSet from "../components/ButtonsSet";
import MyTabs from "../components/MyTabs";

function MainPage() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default MainPage;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    right: 30,
  },

  upper: {
    padding: 50,
    backgroundColor: "#2b144b",

    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    padding: 40,
    backgroundColor: "#2b144b",
    marginTop: 600,
  },
});
