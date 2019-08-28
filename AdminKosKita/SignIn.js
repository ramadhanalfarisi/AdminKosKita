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
import {ContainerBeranda} from './RouterBeranda';

const {width: WIDTH} = Dimensions.get('window');
export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    secure: true,
    view: view,
    email: '',
    password: '',
  };

  signin(email, password) {
    try {
      fbs.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.props.navigation.navigate('Beranda');
        })
        .catch(error => {
          let code = error.code;
          if (code === 'auth/wrong-password') {
            Alert.alert('Gagal Sign In', 'Password salah');
          } else if (code === 'auth/invalid-email') {
            Alert.alert('Gagal Sign In', 'Email tidak valid');
          } else if (code === 'auth/network-request-failed') {
            Alert.alert('Gagal Sign In', 'Periksa jaringan anda');
          } else {
            Alert.alert('Gagal Sign In', code);
          }
        });
    } catch (error) {
      console.log(error);
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

  masukSignUp() {
    this.props.navigation.navigate('SignUp');
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
        </View>
        <View style={styles.viewBtnLogin}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this.signin(this.state.email, this.state.password)}>
            <Text style={styles.textLogin}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.viewSignUp}>
            <Text>You don't have an account ? let's </Text>
            <TouchableOpacity
              style={styles.btnSignup}
              onPress={() => this.masukSignUp()}>
              <Text style={styles.textSignUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

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
