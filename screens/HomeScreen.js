import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [animKey, setAnimKey] = useState(0);

  const refreshAnimation = () => {
    setAnimKey(prevKey => prevKey + 1);
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        key={animKey}
        animation="shake"
        duration={1500}
        source={require('../assets/battleship.png')}
        style={styles.image}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            refreshAnimation();
            navigation.navigate('SignIn');
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            refreshAnimation();
            navigation.navigate('SignUp');
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c0bea0',
  },
  image: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
  },
  buttonWrapper: {
    marginTop: 50,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#2b2643',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#219384',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
