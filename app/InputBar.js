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
  Text, 
  View,
  TextInput
  } from 'react-native';

type Props = {};
export default class InputBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={{height: 75, flexDirection: 'row', alignContent: 'center'}}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TextInput
          textContentType={this.props.textContentType}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
