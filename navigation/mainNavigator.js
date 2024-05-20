import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import LobbyScreen from '../screens/LobbyScreen';
import GameInterfaceScreen from '../screens/GameInterfaceScreen';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const ScreenNames = {
    HOME: 'Home',
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
    USER_DETAILS: 'UserDetails',
    LOBBY: 'Lobby',
    GAME_INTERFACE: 'GameInterface',
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreenNames.HOME}
            screenOptions={{
                headerStyle: { backgroundColor: '#2b2643' },
                headerTintColor: '#219384',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} options={{
                headerTitle: (props) => <Text {...props}>Home</Text>,
            }} />
            <Stack.Screen name={ScreenNames.SIGN_IN} component={SignInScreen} options={{
                headerTitle: (props) => <Text {...props}>Sign In</Text>,
                headerLeft: null,
            }} />
            <Stack.Screen name={ScreenNames.SIGN_UP} component={SignUpScreen} options={{
                headerTitle: (props) => <Text {...props}>Sign Up</Text>,
            }} />
            <Stack.Screen name={ScreenNames.USER_DETAILS} component={UserDetailsScreen} options={({ navigation }) => ({
                headerTitle: (props) => <Text {...props}>Personal Information</Text>,
                headerRight: () => (
                    <Button onPress={async () => {
                        await AsyncStorage.removeItem('accessToken');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenNames.HOME }],
                        });
                    }} title="Logout" color="#219384" />
                ),
            })} />
            <Stack.Screen name={ScreenNames.LOBBY} component={LobbyScreen} options={{
                headerTitle: (props) => <Text {...props}>Lobby</Text>,
            }} />
            <Stack.Screen name={ScreenNames.GAME_INTERFACE} component={GameInterfaceScreen} options={{
                headerTitle: (props) => <Text {...props}>Game Interface</Text>,
            }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
export { ScreenNames };
