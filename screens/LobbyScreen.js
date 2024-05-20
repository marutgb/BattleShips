import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LobbyScreen = ({ navigation }) => {
    const [availableGames, setAvailableGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch('http://163.172.177.98:8081/game', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to retrieve games');
                }

                const data = await response.json();
                console.log('Response data:', data);

                const games = data.games || data;
                if (Array.isArray(games)) {
                    const availableGames = games.filter(game => game.player2Id === null);
                    setAvailableGames(availableGames);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, []);

    const joinGame = async (gameId) => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(`http://163.172.177.98:8081/game/join/${gameId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to join game');
            }

            Alert.alert('Success', 'You have joined the game!');
            navigation.navigate('GameInterface', { gameId });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const createGame = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch('http://163.172.177.98:8081/game', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create game');
            }

            const data = await response.json();
            const { id } = data;
            Alert.alert('Success', `Game created with ID: ${id}`);
            navigation.navigate('GameInterface', { gameId: id });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

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
            <Text style={styles.header}>Available Games</Text>
            <TouchableOpacity style={styles.createButton} onPress={createGame}>
                <Text style={styles.buttonText}>Create Game</Text>
            </TouchableOpacity>
            <FlatList
                data={availableGames}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.gameItem}>
                        <Text style={styles.gameText}>Game ID: {item.id}</Text>
                        <Text style={styles.gameText}>Player 1: {item.player1.email}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => joinGame(item.id)}>
                            <Text style={styles.buttonText}>Join Game</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
    gameItem: {
        backgroundColor: '#2b2643',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
    },
    gameText: {
        color: '#219384',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#219384',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#2b2643',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    createButton: {
        backgroundColor: '#219384',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
});

export default LobbyScreen;
