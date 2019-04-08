/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  Text,
  Image
} from "react-native";

import InputBar from "./InputBar";
import RNButton from "./RNButton";
import bcrypt from "react-native-bcrypt";

type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: "email@example.com",
      password: "123456",
      username: '',
      hash: "",
      secureEntry: true,
      loggingIn: false,
      loggedIn: false,
    };
  }

createToken = () => {

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(this.state.password, salt);
// alert(hash);
this.logIn(hash);

}

componentDidMount() {
  alert('Credentials are currently hardcoded, simply login by clicking the button.  If you would prefer to ')
}

  logIn = async (hash) => {
    try {
      let response = await fetch(
        "https://tic-server-xp-mongo.herokuapp.com/api/users/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "email": this.state.email,
            "hash": hash,
          },
        }
      );

      let res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        this.setState({
          password: '',
          email: '',
          username: res.username,
          loggingIn: false,
          loggedIn: true,
      })
        alert(res.response.toString());
      } else {
        this.setState({loggingIn: false});
        let error = res;
        throw error;
      }
    } catch (error) {
      console.log("error " + error);
      alert("There was an error logging in: " + error);
    }
  };

  render() {

    let loginButton = <RNButton 
      onPress={()=>{
        this.setState({loggingIn: true},this.createToken());
      }}
      text="Log in" />;
    if(this.state.loggingIn){
      loginButton = <ActivityIndicator size="large" color="#ee3124" />;
    }

    let logo = 
    <View style={styles.logoWrapper}>
      <Image 
        style={styles.logo}
        source={require("./img/tic.png")} />
    </View>;
          


    let currentScreen = 
      <View style={styles.container}>
        
        {logo}

        <InputBar
          setText={(text) => {this.setState({email: text});}}
          value={this.state.email}
          title="Email:"
          textContentType="emailAddress"
          keyboardType="email-address"
          secureTextEntry={false}
          placeholder="email (email@example.com)"
        />

        <InputBar
          setText={(text) => {this.setState({password: text});}}
          value={this.state.password}
          title="Password:"
          textContentType="password"
          secureTextEntry={true}
          placeholder="password (123456)"
        />
        
        {loginButton}
      </View>;

      if(this.state.loggedIn){

        currentScreen = 
        <View style={styles.container}>
          {logo}
          <View style={styles.profileContainer}>
            <Text style={styles.titleText}>Welcome</Text>
            <Text style={styles.titleText}>{this.state.username}</Text>
          </View>
          <RNButton 
            onPress={()=>{
              this.setState({loggedIn: false}); 
            }}
            text="Log out"
           />
        </View>;
      }


    return (
      
      <View style={styles.container}>
        {currentScreen}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  logoWrapper: {
    width: '100%',
    marginTop:15,
    
  },
  logo: {
    
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
  },
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 15
  }
});
