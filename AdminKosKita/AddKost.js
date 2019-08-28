//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {fbs} from './Config';
import edit from '../gambar/edit.png';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import man from '../gambar/man.png';
import image from '../gambar/imagenotfound.png';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const {width: WIDTH} = Dimensions.get('window');
class AddKost extends Component {
  state = {
    nama_kost: '',
    alamat_kost: '',
    harga_kost: '',
    foto_kost: 'default',
    urlFoto: '',
    name_image: '',
  };

  bukaimage() {
    const options = {
      title: 'Choose Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.uri;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          foto_kost: source,
          name_image: response.fileName,
        });
      }
    });
  }

  tambahKost(uri, mime = 'image/jpeg', name) {
    let uid = fbs.database.ref('/kosts').push().key;
    if (name === '') {
      let uidPembuat = fbs.auth.currentUser.uid;
      fbs.database
        .ref('/kosts')
        .child(uid)
        .set({
          nama_kost: this.state.nama_kost,
          alamat_kost: this.state.alamat_kost,
          harga_kost: this.state.harga_kost,
          foto_kost: '',
          uid: uid,
          uidPembuat: uidPembuat,
        });
      this.props.navigation.goBack();
    } else {
      return new Promise((resolve, reject) => {
        let imgUri = uri;
        let uploadBlob = null;
        const uploadUri =
          Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const imageRef = fbs.storage.ref(`/kosts/${uid}`);

        fs.readFile(uploadUri, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${mime};BASE64`});
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime, name: name});
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            let uidPembuat = fbs.auth.currentUser.uid;
            fbs.database
              .ref('/kosts')
              .child(uid)
              .set({
                nama_kost: this.state.nama_kost,
                alamat_kost: this.state.alamat_kost,
                harga_kost: this.state.harga_kost,
                foto_kost: url,
                uid: uid,
                uidPembuat: uidPembuat,
              });
            this.props.navigation.goBack();
            resolve(url);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  onInput() {
    Alert.alert('Simpan Profil', 'Apakah anda yakin ingin mengubah profil ?', [
      {
        text: 'Iya',
        onPress: () =>
          this.tambahKost(
            this.state.foto_kost,
            'image/jpeg',
            this.state.name_image,
          ),
      },
      {
        text: 'Tidak',
      },
    ]);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{paddingTop: 25, alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
              Tambah Kost
            </Text>
          </View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <TouchableOpacity
              style={{position: 'absolute', zIndex: 2, right: 65, top: 115}}
              onPress={() => this.bukaimage()}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image source={edit} style={{width: 20, height: 20}} />
              </View>
            </TouchableOpacity>
            <View style={{backgroundColor: '#fff', borderRadius: 10}}>
              <Image
                source={
                  this.state.foto_kost === 'default'
                    ? image
                    : {uri: this.state.foto_kost}
                }
                style={{
                  width: 170,
                  height: 120,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Nama Kost"
              placeholderTextColor="#dddddd"
              underlineColorAndroid="transparent"
              onChangeText={nama => this.setState({nama_kost: nama})}
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Alamat Kost"
              placeholderTextColor="#dddddd"
              underlineColorAndroid="transparent"
              onChangeText={alamat => this.setState({alamat_kost: alamat})}
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Harga Kost"
              placeholderTextColor="#dddddd"
              underlineColorAndroid="transparent"
              onChangeText={harga_kost =>
                this.setState({harga_kost: harga_kost})
              }
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
                textAlign: 'left',
              }}
            />
          </View>
          <View style={{paddingTop: 25}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableHighlight
                onPress={() => this.onInput()}
                style={{
                  width: WIDTH - 260,
                  height: 45,
                  backgroundColor: '#27ae60',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    fontFamily: 'sans-serif',
                    color: '#fff',
                  }}>
                  Simpan
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c',
  },
});

//make this component available to the app
export default AddKost;
