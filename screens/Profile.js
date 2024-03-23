
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2d144b',
        padding: 30,
        alignItems: 'left',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#2d144b',
    },
    banner: {
        padding: 20,
        backgroundColor: '#f2c875',
        alignItems: 'center',
        margin: 10,
    },
    userNameText: {
        color: 'white',
        fontSize: 18,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#eb6c9c',
        borderRadius: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 400,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#eb6c9c',
        borderRadius: 20,
        paddingVertical: 5,
    },
    transparentButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    icon: {
        fontSize: 24,
        color: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    moreFunctionsContainer: {
        marginLeft: 50,
        marginRight: 50,
    },
});


function Profile({ navigation }) {
  return (
      <SafeAreaView style={styles.container}>
          <ScrollView>
              <View style={styles.header}>
                  <View style={styles.userInfo}>
                      <Image
                          source={require( '../assets/portrait.png') }
                          style={styles.profileImage}
                      />

                      <Text style={styles.userNameText}>Tester Tester</Text>
                      <View style={{ flex: 1 }} />
                      <TouchableOpacity>
                          <Text style={styles.userNameText}>✏️Edit</Text>
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

              <View style={{ height: 40 }} />

              <View style={styles.banner}>
                  <Text style={styles.buttonText}>Your Monthly Saving Goal</Text>
                  <Text style={styles.userNameText}>$400</Text>
              </View>

              <View style={styles.detailRow}>
                  <Text>ID</Text><Text>111</Text>
              </View>
              <View style={styles.detailRow}>
                  <Text>Gender</Text><Text>Male</Text>
              </View>
              <View style={styles.detailRow}>
                  <Text>Phone Number</Text><Text>(123) 456-789</Text>
              </View>
              <View style={styles.detailRow}>
                  <Text>Email</Text><Text>tester@test.au</Text>
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
                          <Text style={styles.buttonText}>Financial Records</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                          <Text style={styles.buttonText}>Gamification</Text>
                      </TouchableOpacity>
                  </View>
              </View>


          </ScrollView>
      </SafeAreaView>





        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Button
        //     title="Login"
        //     onPress={() => navigation.navigate('Login')}
        //   />
        // </View>

  );
}

export default Profile;
