/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  BackHandler,
  Image
} from 'react-native';

import { WebView } from 'react-native-webview';
import Setting from './Setting';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      canGoBack: false,
      isLoading: true
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 3000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.canGoBack) {
      this.refWeb.goBack();
    }
    else {
      null
    }
    return true;
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ width: 400, height: 200 }}
            source={require('./assets/logo.png')}
          />

          <Text
            style={{
              fontStyle : 'italic',
              fontSize: 30,
              marginVertical: 30
            }}
          >{Setting.Branding_Text}</Text>
        </View>
      )
    } else {
      return (
        <WebView
          ref={(myWeb) => this.refWeb = myWeb}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{ uri: Setting.Url }} />
      )
    }
  }
}

export default App;
