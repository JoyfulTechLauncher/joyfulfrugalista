import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";

const URL =
  "https://joyful-429b0-default-rtdb.asia-southeast1.firebasedatabase.app/";
const colors = {
  //buttonColor: '#eb6c9c',
  buttonColor: "#f2c875",
  textColor: "#2d144b",
};

var profileList = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#2d144b",
    padding: 30,
    alignItems: "left",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#2d144b",
  },
  banner: {
    padding: 20,
    backgroundColor: "#f2c875",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
  },
  userNameText: {
    color: "white",
    fontSize: 18,
  },
  savingGoalText: {
    color: colors.textColor,
    fontSize: 22,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonColor,
    borderRadius: 5,
    width: "52%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.buttonColor,
    zIndex: 1,
    borderRadius: 20,
    paddingVertical: 5,
    width: "95%",
    alignSelf: "center",
    marginTop: -30,
  },
  transparentButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
  buttonText: {
    color: colors.textColor,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  moreFunctionsContainer: {
    marginLeft: 45,
    marginRight: 65,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

async function fetchProfile(uid) {
  const response = await axios.get(URL + "/users/" + uid + ".json");
  const userData = response.data;

  return userData;
}

function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      const userData = await fetchProfile("0l7PnttYM4SDQj6wp95jD0xvv7z1");
      setUserData(userData);
    }

    getData();
  }, []);

  console.log(userData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("../assets/portrait.png")}
              style={styles.profileImage}
            />

            <Text style={styles.userNameText}>Tester Tester</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() =>
                navigation.navigate("MyStack", { screen: "Login" })
              }
            >
              <Text style={styles.userNameText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.transparentButton}>
            <Text style={styles.icon}>🌟</Text>
            <Text style={styles.buttonText}>Achievements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transparentButton}>
            <Text style={styles.icon}>🔔</Text>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transparentButton}>
            <Text style={styles.icon}>👥</Text>
            <Text style={styles.buttonText}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transparentButton}>
            <Text style={styles.icon}>⚙️</Text>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/*<View style={{ height: 10 }} />*/}

        <View style={styles.banner}>
          <Text style={styles.buttonText}>Your Monthly Saving Goal</Text>
          {/* need dynamically update */}
          <Text style={styles.savingGoalText}>$400</Text>
        </View>

        <View style={styles.detailRow}>
          <Text>Gender</Text>
          <Text>{userData.gender}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Phone Number</Text>
          <Text>{userData.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Email</Text>
          <Text>{userData.email}</Text>
        </View>

        <View style={{ height: 20 }} />

        <View style={styles.moreFunctionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Customize Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Saving Plan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Gamification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Button
    //         title="Login"
    //         onPress={() => navigation.navigate('Login')}
    //     />
    // </View>
  );
}

export default Profile;
