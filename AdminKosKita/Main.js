//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import home from '../gambar/home.png';
import { fbs } from './Config';

// create a component
const { width: WIDTH } = Dimensions.get('window');
class Main extends Component {

  signout() {
    Alert.alert('Sign Out', 'Apakah anda yakin untuk sign out ?', [
      { text: 'Iya', onPress: () => { fbs.auth.signOut() } }, { text: 'Tidak' }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 50, alignItems: 'center' }}>
          <Image source={home} style={{ height: 100, width: 100 }} />
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop: 5,
            }}>
            Admin KosKita
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TambahKost')}
          style={{
            width: WIDTH - 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{ color: '#e74c3c', fontSize: 18, fontWeight: '500' }}>
            Kost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Chat')}
          style={{
            width: WIDTH - 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{ color: '#e74c3c', fontSize: 18, fontWeight: '500' }}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.signout()}
          style={{
            width: WIDTH - 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{ color: '#e74c3c', fontSize: 18, fontWeight: '500' }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
  },
});

//make this component available to the app
export default Main;
