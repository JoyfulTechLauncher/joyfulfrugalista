import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const pickerStyle = {
    inputIOS: {
        paddingHorizontal: 0,
        borderWidth: 0,
        borderRadius: 0,
        color: 'black',
        paddingRight: 30,
        height: '100%',  // 确保填满容器高度
    },
    inputAndroid: {
        paddingHorizontal: 0,
        borderWidth: 0,
        borderRadius: 0,
        color: 'black',
        paddingRight: 30,
        height: '100%',  // 确保填满容器高度
    },
};

const EditProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        Alert.alert("Profile Updated", "Your profile has been successfully updated.", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    };

    const sendVerificationCode = (field) => {
        Alert.alert(`Verification Code Sent`, `A verification code has been sent to your ${field}.`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                placeholder="Username"
                placeholderTextColor={styles.placeholderColor.color}
                onChangeText={setUsername}
                value={username}
            />

            <View style={styles.inputContainer}>
                <RNPickerSelect
                    placeholder={{ label: 'Other Gender', value: 'Other Gender' }}
                    style={{ ...pickerStyle, inputIOS: { ...pickerStyle.inputIOS, height: '100%' }, inputAndroid: { ...pickerStyle.inputAndroid, height: '100%' } }}
                    onValueChange={(value) => setGender(value)}
                    items={[
                        { label: 'Female', value: 'female' },
                        { label: 'Male', value: 'male' },
                    ]}
                />
            </View>



            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    placeholderTextColor={styles.placeholderColor.color}
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity onPress={() => sendVerificationCode('phone')} style={styles.button}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={styles.placeholderColor.color}
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity onPress={() => sendVerificationCode('email')} style={styles.button}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            </View>



            <Button
                title="Save Profile"
                onPress={handleSave}
                color="#841584"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#EBCA81',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // 确保子项垂直居中
        marginBottom: 10,
        borderWidth: 0,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        height: 50,
        overflow: 'hidden',
        backgroundColor: '#fae8be',
    },


    input: {
        flex: 1,
        marginRight: 10,
        height: '100%',
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#e3abf7',
        borderRadius: 5,
        height: '100%',
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    placeholderColor: {
        color: '#CECCCB' 
    },

});


export default EditProfileScreen;
