import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthContext } from '/hooks/useAuthContext';

const SignInScreen = ({ route, navigation }) => {
    const { email: initialEmail } = route.params || {};
    const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuthContext();

    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);

    const attemptLogin = async () => {
        try {
            await login(email, password);
            setErrorMessage('');
            Alert.alert('Success', 'Login was successful!');
            navigation.navigate('UserDetails');
        } catch (error) {
            setErrorMessage('Login attempt failed, please try again.');
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>Sign In</Text>
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
            <TouchableOpacity style={styles.submitButton} onPress={attemptLogin}>
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

export default SignInScreen;
