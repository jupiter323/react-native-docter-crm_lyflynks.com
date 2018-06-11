import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import NavigatorService from '../Navigation/service/navigator';
import DefaultInput from '../components/UI/DefaultInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { memberInvite } from '../actions/members_accounts';


export default class MemberInviteScreen extends Component {
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
    this.state = { email: '' };
  }

  invite = (emailText) => {
    const { dispatch, email } = this.props;
    dispatch(memberInvite(emailText))
  }

	render() {

    navigateScreen = () => {
      NavigatorService.navigate('DrawerToggle')
    }
		return (
			<View style={styles.container}>
				<Text style={styles.infoText}>Inviting another family member to assist with the care of your 
				aging parent is simple! Enter their email address below and click the invite member button
				</Text>
				<DefaultInput 
	        onChangeText={(email) => this.setState({email})}
	        underlineColorAndroid="transparent"
	        value={this.state.email}
	        placeholder='lyflynks@gmail.com'
	      />
	      <TouchableOpacity style={styles.button} onPress={() => this.invite(this.state.email)} >
	        <Text style={styles.buttonText}>Invite Member</Text>
	      </TouchableOpacity>
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