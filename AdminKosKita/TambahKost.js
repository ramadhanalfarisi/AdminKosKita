//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// create a component
const {width: WIDTH} = Dimensions.get('window');
class TambahKost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddKost')}
          style={{
            width: WIDTH - 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{color: '#e74c3c', fontSize: 18, fontWeight: '500'}}>
            Tambah Kost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ListKost')}
          style={{
            width: WIDTH - 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{color: '#e74c3c', fontSize: 18, fontWeight: '500'}}>
            List Kost
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
export default TambahKost;
