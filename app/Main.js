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
import LoginButton from "./LoginButton";
import bcrypt from "react-native-bcrypt";

type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: "email@example.com",
      password: "123456",
      hash: "",
      secureEntry: true,
      loggingIn: false,
    };
  }

createToken = () => {

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(this.state.password, salt);
// alert(hash);
this.logIn(hash);

}

componentDidMount() {
  alert('Credentials are currently hardcoded, you can change them if you like.  The password is currently required, but the email is not.')
}

  logIn = async (hash) => {
    try {
      let response = await fetch(
        // "https://shrouded-garden-24329.herokuapp.com/users",
        // "192.168.43.39:8000/api/users/new",
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

      let res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        this.setState({
          password: '',
          email: '',
          loggingIn: false,
      })
        alert(res.toString());
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

    let loginButton = <LoginButton onPress={()=>{
      this.setState({loggingIn: true},this.createToken());
    }} />;
    if(this.state.loggingIn){
      //disable loginbutton while logging in
      loginButton = <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <View style={styles.container}>

        <View style={styles.logoWrapper}>
          <Image source={require("./img/tic.png")} style={styles.logo} />
        </View>

        <InputBar
          setText={(text) => {this.setState({email: text});}}
          value={this.state.email}
          title="Email:"
          textContentType="emailAddress"
          keyboardType="email-address"
          secureTextEntry={false}
          placeholder="email"
        />

        <InputBar
          setText={(text) => {this.setState({password: text});}}
          value={this.state.password}
          title="Password:"
          textContentType="password"
          secureTextEntry={true}
          placeholder="password"
        />
        
        {loginButton}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  }
});
