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
      let isActive = true; // 用于检查组件是否仍然挂载

      async function getData() {
        try {
          const uid = "nOZIt4pQugMvmfPuGezK8nzZLmK2";
          const userData = await fetchProfile(uid);
          if (isActive) {
            setUserData(userData);
            setLoading(false);
          }
        } catch (err) {
          console.error(err); // 打印错误信息
          if (isActive) {
            setLoading(false); // 确保即使发生错误，加载状态也会更新
          }
        }
      }

      getData();

      return () => {
        isActive = false; // 当组件失去焦点或卸载时，更新此状态以避免在已卸载组件上设置状态
      };
    }, []) // useCallback 确保函数不会在每次渲染时重新创建，除非依赖数组中的元素变化
  );
  //
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
              <Text style={styles.userNameText}>Edit</Text>
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
          <Text style={styles.savingGoalText}>${userData.goal}</Text>
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
