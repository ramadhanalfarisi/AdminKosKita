//import liraries
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import background from '../gambar/background.jpg';
import logo from '../gambar/home.png';
import user from '../gambar/profile.png';
import password from '../gambar/lock.png';
import view from '../gambar/view.png';
import hide from '../gambar/hide.png';
import {fbs} from './Config';

// create a component
const {width: WIDTH} = Dimensions.get('window');
class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    secure: true,
    securerepas: true,
    view: view,
    viewrepas: view,
    email: '',
    password: '',
    repassword: '',
  };

  signup(email, password) {
    try {
      if (this.state.password.length < 6) {
        Alert.alert(
          'Gagal Sign Up',
          'Password tidak boleh berjumlah kurang dari 6',
        );
      } else {
        if (this.state.password == this.state.repassword) {
          fbs.auth
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              let potong = user.user.email.slice(0, 5);
              fbs.database
                .ref('/admins')
                .child(user.user.uid)
                .set({
                  nama_user: potong,
                  alamat_user: '',
                  email_user: user.user.email,
                  no_telp: '',
                  foto_user: 'default',
                  uid: user.user.uid,
                });
            })
            .catch(error => {
              let code = error.code;
              let message = error.message;
              if (code === 'auth/weak-password') {
                Alert.alert('Gagal Sign Up', 'Password terlalu lemah');
              } else {
                Alert.alert('Gagal Sign Up', message);
              }
            });
        } else {
          Alert.alert('Gagal Sign Up', 'Password Tidak Sama');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  hiderepas() {
    const secre = this.state.securerepas;
    if (secre === true) {
      this.setState({
        viewrepas: hide,
        securerepas: false,
      });
    } else {
      this.setState({
        viewrepas: view,
        securerepas: true,
      });
    }
  }

  hide() {
    const sec = this.state.secure;
    if (sec === true) {
      this.setState({
        view: hide,
        secure: false,
      });
    } else {
      this.setState({
        view: view,
        secure: true,
      });
    }
  }
  render() {
    return (
      <ImageBackground source={background} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>Koskita</Text>
        </View>
        <View>
          <View>
            <Image style={styles.logoInput} source={user} />
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({email: email})}
            />
          </View>
          <View>
            <Image style={styles.logoInput} source={password} />
            <TextInput
              style={styles.input}
              placeholder={'Password'}
              placeholderTextColor={'#fff'}
              secureTextEntry={this.state.secure}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password: password})}
            />
            <TouchableOpacity
              style={styles.btnView}
              onPress={this.hide.bind(this)}>
              <Image source={this.state.view} style={styles.view} />
            </TouchableOpacity>
          </View>
          <View>
            <Image style={styles.logoInput} source={password} />
            <TextInput
              style={styles.input}
              placeholder={'Retype Password'}
              placeholderTextColor={'#fff'}
              secureTextEntry={this.state.securerepas}
              underlineColorAndroid="transparent"
              onChangeText={retype => this.setState({repassword: retype})}
            />
            <TouchableOpacity
              style={styles.btnView}
              onPress={this.hiderepas.bind(this)}>
              <Image source={this.state.viewrepas} style={styles.view} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewBtnLogin}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this.signup(this.state.email, this.state.password)}>
            <Text style={styles.textLogin}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    width: null,
    height: null,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: '#fff',
    marginHorizontal: 25,
    marginTop: 20,
  },
  logoInput: {
    width: 22,
    height: 22,
    position: 'absolute',
    bottom: 13,
    left: 38,
    paddingRight: 5,
  },
  view: {
    width: 25,
    height: 25,
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    left: 295,
    marginRight: 30,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#2B5571',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'sans-serif',
  },
  viewBtnLogin: {
    paddingTop: 15,
  },
  btnSignup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignUp: {
    color: '#0073BF',
  },
  viewSignUp: {
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default SignUp;
