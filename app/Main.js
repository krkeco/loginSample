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
      email: "",
      password: "",
      hash: "",
      secureEntry: true
    };
  }

createToken = () => {

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(this.state.password, salt);
// alert(hash);
this.logIn(hash);

}

  // async getToken() {
  //   try {
  //     let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     let accessEmail = await AsyncStorage.getItem(ACCESS_EMAIL);

  //     if (!accessToken || !accessEmail) {
  //       this.setState({ error: "we have an error" });
  //     } else {
  //       this.setState({ access_token: accessToken });
  //       this.setState({ email: accessEmail });
  //       this.props.setAccessToken(accessToken);
  //       this.props.setAccessEmail(accessEmail);
  //     }
  //   } catch (error) {
  //     Alert.alert(
  //       "Server Error",
  //       "Please try logging in again",
  //       [
  //         {
  //           text: "Ok",
  //           onPress: () => {
  //             this.getToken();
  //           },
  //           style: "OK"
  //         }
  //       ],
  //       { cancelable: true }
  //     );
  //     console.log("Something went wrong fetching accesstoken");
  //   }

  //   this.verifyToken();
  // }
  // async verifyToken() {
  
  //     try {
  //       let response = await fetch(this.props.safetyspot_base_url + "/api/user/", {
  //         method: "GET",
  //         headers: {
  //           "User-Token": this.props.access_token,
  //           Email: this.props.access_email
  //         }
  //       });

  //       let res = await response.text();

  //       if (response.status >= 200 && response.status < 300) {
  //         //response to json
  //         var userArray = JSON.parse(res);
  //         var organizationArray = userArray.organization;
  //         //json to state
  //         this.setState({ organizations: organizationArray });
  //         this.setState({ first_name: userArray.first_name });
  //         this.setState({ email: userArray.email });
  //         this.setState({ organization_name: userArray.organization });
  //         this.props.isLegit();
  //         this.props.notLoggingIn();
  //       } else {
  //         let error = res;
  //         throw error;
  //       }
  //     } catch (error) {
  //       this.setState({ error: error });
  //       console.log("error " + error);
  //       this.setState({ showProgress: false });
  //     }
  
  // }

  // async storeToken(accessToken, email) {
  //   try {
  //     await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  //     await AsyncStorage.setItem(ACCESS_EMAIL, email);
  //     console.log("Token was stored successfull ");
  //   } catch (error) {
  //     Alert.alert(
  //       "Server Error",
  //       "Please try logging in again: " + error,
  //       [{ text: "Ok", onPress: () => console.log("continue"), style: "OK" }],
  //       { cancelable: true }
  //     );
  //     console.log("Something went wrong");
  //   }
  // }



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
      })
        alert(res.toString());
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      console.log("error " + error);
      alert("There was an error logging in: " + error);
    }
  };

  render() {
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
        
        <LoginButton onPress={this.createToken} />
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
