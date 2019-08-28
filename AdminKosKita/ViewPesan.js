//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {fbs} from './Config';

// create a component
const {height: HEIGHT, width: WIDTH} = Dimensions.get('screen');
class ViewPesan extends Component {
  state = {
    uidUser: this.props.navigation.state.params.uidUser,
    namaKost: this.props.navigation.state.params.nama_kost,
    foto: this.props.navigation.state.params.foto,
    person: {
      name: this.props.navigation.state.params.nama_kost,
      uid: this.props.navigation.state.params.uidUser,
    },
    messages: [],
    kirimpesan: '',
  };

  renderRow(item) {
    let Useruid = fbs.auth.currentUser.uid;
    return (
      <View
        style={{
          width: '60%',
          alignSelf: item.from === Useruid ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === Useruid ? '#e74c3c' : '#c0392b',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: '#eee',
            paddingLeft: 7,
            paddingTop: 3,
            paddingBottom: 5,
            fontSize: 12,
          }}>
          {this.convertTime(item.time)}
        </Text>
        <Text
          style={{
            color: '#fff',
            paddingLeft: 7,
            paddingBottom: 5,
            fontSize: 15,
          }}>
          {item.message}
        </Text>
      </View>
    );
  }

  kirimPesan() {
    let Useruid = fbs.auth.currentUser.uid;
    let msgid = fbs.database
      .ref('messages')
      .child(Useruid)
      .child(this.state.person.uid)
      .push().key;
    let updates = {};
    let message = {
      message: this.state.kirimpesan,
      time: fbs.timestamp.ServerValue.TIMESTAMP,
      from: Useruid,
    };
    updates[
      'messages/' + Useruid + '/' + this.state.person.uid + '/' + msgid
    ] = message;
    updates[
      'messages/' + this.state.person.uid + '/' + Useruid + '/' + msgid
    ] = message;
    fbs.database.ref().update(updates);
    this.setState({kirimpesan: ''});
  }

  convertTime(time) {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  }

  componentDidMount() {
    let Useruid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('messages')
      .child(Useruid)
      .child(this.state.person.uid)
      .on('child_added', snapshot => {
        this.setState(prevState => {
          return {
            messages: [...prevState.messages, snapshot.val()],
          };
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: WIDTH,
            height: 50,
            paddingTop: 5,
            paddingLeft: 5,
            borderColor: '#ddd',
            backgroundColor: '#ee5253',
            shadowOffset: {width: 0, height: 0},
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 2,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: this.state.foto}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: '#fff',
              paddingLeft: 10,
            }}>
            {this.state.namaKost}
          </Text>
        </View>
        <FlatList
          style={{padding: 10}}
          data={this.state.messages}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            width: WIDTH,
            height: 50,
            flexDirection: 'row',
            flexWrap: 'wrap',
            shadowOffset: {width: 0, height: 0},
            borderTopColor: '#ddd',
            borderTopWidth: 1,
          }}>
          <TextInput
            placeholder="Masukkan Pesan"
            placeholderTextColor="grey"
            value={this.state.kirimpesan}
            onChangeText={message => this.setState({kirimpesan: message})}
            style={{
              height: 50,
              width: WIDTH - 60,
              justifyContent: 'center',
              fontSize: 15,
            }}
          />
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              style={{paddingLeft: 5}}
              onPress={() => this.kirimPesan()}>
              <Text
                style={{fontSize: 17, fontWeight: 'bold', color: '#ee5253'}}>
                Kirim
              </Text>
            </TouchableOpacity>
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
  },
});

//make this component available to the app
export default ViewPesan;
