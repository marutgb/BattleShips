import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameInterfaceScreen = ({ route }) => {
    const { gameId } = route.params || {};

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>Game Interface</Text>
            {gameId && <Text style={styles.gameIdText}>Game ID: {gameId}</Text>}
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
    gameIdText: {
        fontSize: 18,
        color: '#219384',
    },
});

export default GameInterfaceScreen;
