import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthContext } from '/hooks/useAuthContext';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register } = useAuthContext();

    const handleSignUp = async () => {
        try {
            const result = await register(email, password);
            Alert.alert('Success', 'Registration was successful!');
            navigation.navigate('SignIn', { email: result.email });
        } catch (error) {
            setErrorMessage('Registration failed, please try again.');
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>Sign Up</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#219384"
            />
            <TextInput
                style={styles.inputField}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#219384"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#c0bea0',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        color: '#219384',
    },
    inputField: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#2b2643',
        borderRadius: 5,
        color: '#219384',
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#2b2643',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#219384',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
