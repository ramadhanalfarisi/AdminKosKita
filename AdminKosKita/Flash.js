//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';

// create a component
class Flash extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../gambar/background.jpg')}>
        <Image
          source={require('../gambar/home.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          KosKita
        </Text>
      </ImageBackground>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Flash;
