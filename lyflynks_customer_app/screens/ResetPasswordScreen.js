import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import NavigatorService from '../Navigation/service/navigator';
import { Input, Button } from "../components/UI";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

export default class ResetPasswordScreen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
    }
  }

	render() {
		return (
			<View style={styles.container}>
        <Input 
          onChangeText={(newPassword) => this.setState({newPassword})}
          underlineColorAndroid="transparent"
          value={this.state.oldPassword}
          placeholder='New Password'
        />
				<Input 
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
          value={this.state.confirmPassword}
          placeholder='Confirm Password'
        />
        <Button onPress={() => this.props.navigation.navigate('NewMemberWizard')} >
          Next
        </Button>
			</View>
		);
	}
}

const styles = {
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
  	backgroundColor: '#00A68C',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#00A68C'
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  infoText: {
  	margin: 15,
  	alignSelf: 'center',
  	fontSize: 18,
  }
}