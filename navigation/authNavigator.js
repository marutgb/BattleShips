import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { Text } from 'react-native';

const AuthStack = createStackNavigator();

const AuthScreens = {
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
};

const AuthNavigator = () => (
    <AuthStack.Navigator
        initialRouteName={AuthScreens.SIGN_IN}
        screenOptions={{
            headerStyle: { backgroundColor: '#2b2643' },
            headerTintColor: '#219384',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
        }}
    >
        <AuthStack.Screen name={AuthScreens.SIGN_IN} component={SignInScreen} options={{
            headerTitle: (props) => <Text {...props}>Sign In</Text>,
        }} />
        <AuthStack.Screen name={AuthScreens.SIGN_UP} component={SignUpScreen} options={{
            headerTitle: (props) => <Text {...props}>Sign Up</Text>,
        }} />
    </AuthStack.Navigator>
);

export default AuthNavigator;
export { AuthScreens };