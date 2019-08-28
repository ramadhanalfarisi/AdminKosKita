/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Container} from './AdminKosKita/Router';
import {fbs} from './AdminKosKita/Config';
import {ContainerBeranda} from './AdminKosKita/RouterBeranda';
import Flash from './AdminKosKita/Flash';
// create a component

class App extends Component {
  state = {
    login: null,
  };

  componentWillMount() {
    fbs.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({login: true});
      } else {
        this.setState({login: false});
      }
    });
  }

  renderItem() {
    if (this.state.login == true) {
      return <ContainerBeranda />;
    } else if (this.state.login == false) {
      return <Container />;
    } else {
      return <Flash />;
    }
  }

  render() {
    return <View style={styles.container}>{this.renderItem()}</View>;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
