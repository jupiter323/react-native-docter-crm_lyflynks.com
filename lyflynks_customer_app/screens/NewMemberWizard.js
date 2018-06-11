import React, { Component } from 'react';
import { ScrollView , View, Text, Button, TextInput, TouchableOpacity,
KeyboardAvoidingView, Platform } from 'react-native';
import NavigatorService from '../Navigation/service/navigator';
import DefaultInput from '../components/UI/DefaultInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


export default class NewMemberWizard extends Component {
  @connect(store => {
    const { email } = store.members_accounts;
    return {
      email
    }
  })

	static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Drawer',
    tabBarOptions: {
      style: {
         backgroundColor: 'black',
      }
    },
    headerLeft: (
      <TouchableOpacity onPress={() => this.navigateScreen()} >
        <Icon style={{ marginLeft:15,color:'#fff' }} name={'bars'} size={25} />
      </TouchableOpacity>
    ),
  });

	constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      LastName: '',
      email: '',
      phoneNumber: '',
      altPhoneNumber: '',
      wizardFirstStep: true,
    };
  }
	render() {
    console.log(Platform)
    navigateScreen = () => {
      NavigatorService.navigate('DrawerToggle')
    }
    let wizardFirstStep;
    if(this.state.wizardFirstStep){
      wizardFirstStep = (
        <View style={{width: '100%', padding: 10,}}>
          <Text style={styles.infoText}>First we need to know a little bit about you</Text>
          <DefaultInput 
            onChangeText={(firstName) => this.setState({firstName})}
            underlineColorAndroid="transparent"
            value={this.state.firstName}
            placeholder='First Name'
          />
          <DefaultInput 
            onChangeText={(LastName) => this.setState({LastName})}
            underlineColorAndroid="transparent"
            value={this.state.LastName}
            placeholder='Last Name'
          />
          <DefaultInput 
            onChangeText={(email) => this.setState({email})}
            underlineColorAndroid="transparent"
            value={this.state.email}
            placeholder='john.carter@gmail.com'
          />
          <DefaultInput 
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.phoneNumber}
            placeholder='Primary Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <DefaultInput 
            onChangeText={(altPhoneNumber) => this.setState({altPhoneNumber})}
            underlineColorAndroid="transparent"
            value={this.state.altPhoneNumber}
            placeholder='Alternate Phone Number'
          />
          <TouchableOpacity style={styles.button} onPress={() => this.invite(this.state.email)} >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
            wizardFirstStep = (
        <View style={{width: '100%', padding: 10,}}>
          <Text style={styles.infoText}>First we need to know a little bit about you</Text>
          
        </View>
      )

    }
		return (
			<KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ScrollView>
          <Text style={styles.headingText}>Please setup your new member account</Text>
  				{wizardFirstStep}
        </ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  button: {
  	backgroundColor: '#00A68C',
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#00A68C',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  infoText: {
    marginLeft: 10,
    marginRight: 15,
  },
  headingText: {
  	margin: 15,
  	alignSelf: 'center',
  	fontSize: 22,
  }
}