import React, { useEffect, useState } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { uid } from "./Login.js";

const URL =
  "https://joyful-429b0-default-rtdb.asia-southeast1.firebasedatabase.app/";

const colors = {
  //buttonColor: '#eb6c9c',
  buttonColor: "#f2c875",
  textColor: "#2d144b",
};

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
  const str = URL + "users/" + uid + ".json";
  const response = await axios.get(str);
  //console.log(response);
  const userData = response.data;

  return userData;
}

function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function getData() {
        try {
          //const uid1 = "TKUesaNLmKaCkop8Urb0AL6uFy02";
          const userData = await fetchProfile(uid);
          if (isActive) {
            setUserData(userData);
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          if (isActive) {
            setLoading(false);
          }
        }
      }

      getData();

      return () => {
        isActive = false;
      };
    }, [])
  );
  //防止在未得到数据前提前渲染
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  //console.log(userData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("../assets/portrait.png")}
              style={styles.profileImage}
            />

            <Text style={styles.userNameText}>
              {userData ? userData.name : "Not set"}
            </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() => navigation.replace("   ", { screen: "Login" })}
            >
              <Text style={styles.userNameText}>Log out</Text>
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
          <TouchableOpacity
            style={styles.transparentButton}
            onPress={() =>
              navigation.navigate("   ", {
                screen: "ProfileEdit",
                params: {
                  otherParam: userData,
                },
              })
            }
          >
            <Text style={styles.icon}>⚙️</Text>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/*<View style={{ height: 10 }} />*/}

        <View style={styles.banner}>
          <Text style={styles.buttonText}>Your Monthly Saving Goal</Text>
          <Text style={styles.savingGoalText}>
            {userData ? `$${userData.goal}` : "Not set"}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text>Phone Number</Text>
          <Text>{userData ? userData.phone : "Not set"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Email</Text>
          <Text>{userData ? userData.email : "Not set"}</Text>
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
