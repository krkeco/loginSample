/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet,  
  View,
  TouchableOpacity,
  Text,
  Image,
  } from 'react-native';

  import InputBar from './InputBar';
  import LoginButton from './LoginButton';


type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      secureEntry: true,
    };
  }

  submitButton = async() =>{

    try { 
      let response = 
      await fetch('https://shrouded-garden-24329.herokuapp.com/users',
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
        
      });

      let res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        
        alert('You have logged in.')
        
                  
      
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
          console.log("error " + error);
          alert('There was an error logging in: '+error)

    }
  }

  

  render() {
    return (
       <View style={styles.container}>
       
        <View style={styles.logoWrapper}>
          <Image
            source={require('./img/tic.png')}
            style={styles.logo}
           />
        </View>

        <InputBar
          title="Email:"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="email"
         />

        <InputBar
          title="Password:"
          textContentType="password"
          secureTextEntry={this.state.secureEntry}
          placeholder="password"
        />

        <LoginButton
          onPress={this.submitButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  logoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

});
