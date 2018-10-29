import React from "react";
import { View, Text, TouchableOpacity,Alert } from "react-native";
import { Input } from "../components/UI/Input";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { sendAccountInvite } from "../actions/email_invitations";

const stateMap = (store) => {
  const { member, member_account } = store.auth;
  const { errorMessage, invitationResponse } = store.email_invitations;
  return {
    member,
    member_account,
    errorMessage,
    invitationResponse
  };
};


class MemberInviteScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('invite member function called successfully');
    console.log(this.props);
    if(nextProps.invitationResponse !== "success"){
      this.setState({error:"Member already invited!"}); 
    }

    if (nextProps.invitationResponse === "success") {
      Alert.alert("Member successfully invited.");

      this.props.navigation.navigate("ActivityLogScreen");
      
    }
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Drawer",
    tabBarOptions: {
      style: {
        backgroundColor: "black"
      }
    },
    headerLeft: (
      <TouchableOpacity onPress={() => this.navigateScreen()}>
        <Icon style={{ marginLeft: 15, color: "#fff" }} name={"bars"} size={25} />
      </TouchableOpacity>
    )
  }); 

  constructor(props) {
    console.log("member invitescreen");
    super(props);
    this.state = { email: "",error:"" };

    
  }

  invite = emailText => {
    //dispatch
    Alert.alert(this.props.member_account.data);
    const {   email, sendAccountInvite, member_account, errorMessage, invitationResponse } = this.props;
     sendAccountInvite({ token: this.props.member_account.data, email: emailText });  
    console.log('invite token:',this.props.member_account.data); 
    console.log('invite email:',emailText); 
  };

  InviteMember = (emailText) => { 
    const { email, sendAccountInvite, member_account, errorMessage, invitationResponse } = this.props;
    const token = member_account.data; 
    console.log('errorMessage',errorMessage);
    if(!emailText){
      this.setState({error:"Please enter email id"}); 
    } 
    sendAccountInvite({ token: this.props.member_account.data, email: emailText });  
  }



  componentDidMount() { 
    const { dispatch, member } = this.props;
    console.log('member');
    console.log(member);
  }

  render() {
    navigateScreen = () => {
      this.props.navigation.navigate("DrawerToggle");
    };
    return (
      <View style={styles.container}> 
        <Text style={styles.infoText}>
          Inviting another family member to assist with the care of your aging parent is simple! Enter their email
          address below and click the invite member button
        </Text>
        <Input
        style={{borderRadius:35,borderColor:"#00A68C"}}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="lyflynks@gmail.com"
        />
       <Text style={{color:"red",margin:5}}> {this.state.error} </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.InviteMember(this.state.email)}>
          <Text style={styles.buttonText}>Invite Member</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#FFFFFF"
  },
  button: {
    backgroundColor: "#00A68C",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#00A68C"
  },
  buttonText: {
    fontSize: 24,
    color: "#fff"
  },
  infoText: {
    margin: 25,
    alignSelf: "center",
    fontSize: 18,
    color:"#000"
  },
  errorMessage: {
    color: "red",
    alignSelf: "center"
  }
};

// export default connect(stateMap,{ sendAccountInvite })(MemberInviteScreen);

export default connect(stateMap, { sendAccountInvite })(MemberInviteScreen);

