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
  Text, 
  TouchableOpacity 
} from "react-native";

type Props = {};
export default class LoginButton extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      password: ""
    };
  }
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    fontSize: 20,
    backgroundColor: "#ee3124",
    height: 50,
    textAlign: "center",
    margin: 10
  },
  text: {
    textAlign: "center",
    fontSize: 24
  }
});
