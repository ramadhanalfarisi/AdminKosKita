//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import {fbs} from './Config';
import close from '../gambar/close.png';
import imagekost from '../gambar/imagenotfound.png';

const {width: WIDTH} = Dimensions.get('window');

// create a component
class ModalList extends Component {
  state = {
    visible: false,
    nama_kost: '',
    alamat_kost: '',
    harga_kost: '',
    foto_kost: '',
    detailkey: this.props.navigation.state.params.detailkey,
  };
  tutup() {
    this.props.navigation.goBack();
  }
  hapus(key) {
    Alert.alert('Hapus Kost', 'Apakah anda ingin menghapus kost ini ?', [
      {
        text: 'Iya',
        onPress: () => {
          fbs.database
            .ref('/kosts')
            .child(key)
            .remove();
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  }
  ubah() {
    this.props.navigation.navigate('EditKost', {
      detailkey: this.state.detailkey,
    });
  }
  componentDidMount() {
    fbs.database
      .ref('/kosts')
      .child(this.state.detailkey)
      .on('value', snapshot => {
        if (snapshot.val() === null) {
          this.tutup();
        } else {
          this.setState(prev => {
            return {
              nama_kost: snapshot.val().nama_kost,
              alamat_kost: snapshot.val().alamat_kost,
              harga_kost: snapshot.val().harga_kost,
              foto_kost: snapshot.val().foto_kost,
            };
          });
        }
      });
  }
  render() {
    return (
      <SafeAreaView
        style={{flex: 1}}
        visible={this.state.visible}
        animationType="slide">
        <TouchableOpacity
          onPress={this.tutup.bind(this)}
          style={{
            width: 25,
            height: 25,
            borderRadius: 15,
            backgroundColor: '#fff',
            zIndex: 1,
            position: 'absolute',
            marginTop: 10,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={close}
            style={{
              width: 10,
              height: 10,
            }}
          />
        </TouchableOpacity>

        <Image
          style={{width: WIDTH, height: 200}}
          source={
            this.state.foto_kost === ''
              ? imagekost
              : {uri: this.state.foto_kost}
          }
        />
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: WIDTH - 30,
              height: 100,
            }}>
            <Text style={{fontSize: 20, color: 'red', fontWeight: '500'}}>
              {this.state.nama_kost}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingTop: 10}}>
              {this.state.alamat_kost}
            </Text>
            <Text style={{fontSize: 15, paddingTop: 10}}>
              {this.state.harga_kost}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{
              width: WIDTH - 200,
              height: 50,
              backgroundColor: '#c0392b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => this.hapus(this.state.detailkey)}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'sans-serif',
                color: '#fff',
              }}>
              Hapus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: WIDTH - 200,
              height: 50,
              backgroundColor: '#2980b9',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => this.ubah()}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'sans-serif',
                color: '#fff',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ModalList;
