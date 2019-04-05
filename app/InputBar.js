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
  View, 
  TextInput 
} from "react-native";

type Props = {};
export default class InputBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      password: ""
    };
  }
  render() {
    return (
      <View
        style={styles.container}
      >
      <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between'}}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TextInput
          textContentType={this.props.textContentType}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75, 
    width: '100%',
    flexDirection: "row", 
    alignContent: "center",
    margin: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 5,
  },
  input: {
    height: 40,
    fontSize: 20,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginRight:30,
    width: 200,
  },
});
