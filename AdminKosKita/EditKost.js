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
class EditKost extends Component {
  state = {
    nama_kost: '',
    alamat_kost: '',
    harga_kost: '',
    foto_kost: '',
    uid: this.props.navigation.state.params.detailkey,
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

  updateKost(uri, mime = 'image/jpeg', name) {
    let uid = this.state.uid;
    if (name === '') {
      fbs.database
        .ref('/kosts')
        .child(uid)
        .update({
          nama_kost: this.state.nama_kost,
          alamat_kost: this.state.alamat_kost,
          harga_kost: this.state.harga_kost,
          foto_kost: this.state.foto_kost,
        })
        .then(this.props.navigation.goBack());
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
            fbs.database
              .ref('/kosts')
              .child(uid)
              .update({
                nama_kost: this.state.nama_kost,
                alamat_kost: this.state.alamat_kost,
                harga_kost: this.state.harga_kost,
                foto_kost: url,
              })
              .then(this.props.navigation.goBack());
            resolve(url);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  onInput() {
    Alert.alert('Simpan Kost', 'Apakah anda yakin ingin mengubah kost ?', [
      {
        text: 'Iya',
        onPress: () =>
          this.updateKost(
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

  componentDidMount() {
    fbs.database
      .ref('/kosts')
      .child(this.state.uid)
      .on('value', snapshot => {
        this.setState(prev => {
          return {
            nama_kost: snapshot.val().nama_kost,
            alamat_kost: snapshot.val().alamat_kost,
            harga_kost: snapshot.val().harga_kost,
            foto_kost: snapshot.val().foto_kost,
          };
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{paddingTop: 25, alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
              Edit Kost
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
                  this.state.foto_kost === ''
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
              value={this.state.nama_kost}
              onChangeText={nama_kost => this.setState({nama_kost: nama_kost})}
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
              value={this.state.alamat_kost}
              onChangeText={alamat_kost =>
                this.setState({alamat_kost: alamat_kost})
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
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Harga Kost"
              placeholderTextColor="#dddddd"
              underlineColorAndroid="transparent"
              value={this.state.harga_kost}
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
export default EditKost;
