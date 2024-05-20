import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailsScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch('http://163.172.177.98:8081/user/details/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to retrieve user details');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getUserInfo();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (errorMessage) {
        return (
            <View style={styles.screen}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>Personal Information</Text>
            <Text style={styles.infoText}>Email: {userData.user.email}</Text>
            <Text style={styles.infoText}>Games Played: {userData.gamesPlayed}</Text>
            <Text style={styles.infoText}>Games Lost: {userData.gamesLost}</Text>
            <Text style={styles.infoText}>Games Won: {userData.gamesWon}</Text>
            <Text style={styles.infoText}>Current Games: {userData.currentlyGamesPlaying}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lobby')}>
                <Text style={styles.buttonText}>Go to Lobby</Text>
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
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#219384',
    },
    infoText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#219384',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#2b2643',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
    },
    buttonText: {
        color: '#219384',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserDetailsScreen;
