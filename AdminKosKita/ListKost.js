//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Recommend from './Recommend';
import {fbs} from './Config';

// create a component
class ListKost extends Component {
  constructor() {
    super();
    this.state = {
      listKost: [],
      nama_kost: '',
      alamat_kost: '',
      harga_kost: '',
      foto_kost: '',
      detailkey: '',
    };
  }

  async detailKost(uid) {
    await fbs.database
      .ref('/kosts')
      .child(uid)
      .once('value', snapshot => {
        this.setState(prevState => {
          return {
            nama_kost: snapshot.val().nama_kost,
            alamat_kost: snapshot.val().alamat_kost,
            harga_kost: snapshot.val().harga_kost,
            foto_kost: snapshot.val().foto_kost,
            detailkey: uid,
          };
        });
      });
    this.props.navigation.navigate('ModalList', {
      detailkey: this.state.detailkey,
    });
  }

  componentDidMount() {
    let uid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('/kosts')
      .orderByChild('uidPembuat')
      .equalTo(uid)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data === null) {
          this.setState({listKost: []});
        } else {
          let listKost = Object.values(data);
          this.setState({listKost: listKost});
        }
      });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#dddddd',
              height: 50,
              justifyContent: 'center',
              paddingLeft: 13,
              backgroundColor: '#fff',
            }}>
            <Text style={{color: 'red', fontSize: 18, fontWeight: '700'}}>
              Kost
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
              data={this.state.listKost}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight onPress={() => this.detailKost(item.uid)}>
                    <Recommend
                      image={item.foto_kost}
                      namaKost={item.nama_kost}
                      alamat={item.alamat_kost}
                      harga={item.harga_kost}
                    />
                  </TouchableHighlight>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default ListKost;
