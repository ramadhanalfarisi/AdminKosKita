//import liraries
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import imagenotfound from '../gambar/imagenotfound.png';

// create a component
class Recommend extends Component {
  render() {
    return (
      <View
        style={{
          width: 155,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          marginTop: 10,
          backgroundColor: '#fff',
        }}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Image
            source={
              this.props.image === '' ? imagenotfound : {uri: this.props.image}
            }
            style={{
              flex: 1,
              width: null,
              height: 110,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            felx: 1,
            paddingLeft: 10,
            paddingVertical: 5,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#b63838'}}>
            {this.props.namaKost}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            {this.props.alamat}
          </Text>
          <Text style={{fontSize: 10, fontWeight: '600'}}>
            {this.props.harga}
          </Text>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Recommend;
