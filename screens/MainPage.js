import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import MenuButton from "../components/PrimaryButton";
import ButtonsSet from "../components/ButtonsSet";

function MainPage() {
  return (
    <View>
      <View style={styles.upper}></View>
      <View style={styles.bottom}>
        <ButtonsSet />
      </View>
    </View>
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
