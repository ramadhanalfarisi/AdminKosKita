//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fbs} from './Config';
import man from '../gambar/man.png';

// create a component
class Komponen extends Component {
  state = {
    uidAkun: this.props.uidAkun,
    nama_user: '',
    foto_user: '',
    pesan: '',
  };
  componentDidMount() {
    let uid = fbs.auth.currentUser.uid;
    this.setState({pesan: ''});
    fbs.database
      .ref('/users')
      .child(this.state.uidAkun)
      .on('value', snapshot => {
        this.setState(prev => {
          return {
            nama_user: snapshot.val().nama_user,
            foto_user: snapshot.val().foto_user,
          };
        });
      });
    fbs.database
      .ref('/messages')
      .child(this.state.uidAkun)
      .child(uid)
      .orderByChild('time')
      .limitToLast(1)
      .on('child_added', snapshot => {
        this.setState(prev => {
          return {pesan: snapshot.val().message};
        });
      });
  }
  render() {
    return (
      <View
        style={{
          height: 100,
          borderBottomWidth: 1,
          borderColor: '#dddddd',
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 5,
        }}>
        <View style={{felx: 1}}>
          <Image
            source={
              this.state.foto_user === 'default'
                ? man
                : {uri: this.state.foto_user}
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            width: 185,
            paddingLeft: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'sans-serif',
              fontWeight: '500',
              color: '#b63838',
              paddingBottom: 5,
            }}>
            {this.state.nama_user}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'sans-serif',
              fontWeight: '500',
              paddingBottom: 5,
              color: 'grey',
            }}>
            {this.state.pesan}
          </Text>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Komponen;
