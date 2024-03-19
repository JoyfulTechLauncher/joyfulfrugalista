import { View, Text, Pressable, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";
function ButtonsSet() {
  return (
    <View style={styles.buttonContainer}>
      <PrimaryButton>Detail</PrimaryButton>
      <PrimaryButton>Summary</PrimaryButton>
      <PrimaryButton>Community</PrimaryButton>
      <PrimaryButton>Profile</PrimaryButton>
    </View>
  );
}

export default ButtonsSet;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    right: 30,
  },
});
