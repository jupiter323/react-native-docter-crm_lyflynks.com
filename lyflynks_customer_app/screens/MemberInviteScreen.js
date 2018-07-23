import React, { Component } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { Input } from "../components/UI/Input";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { sendAccountInvite } from "../actions/email_invitations";

@connect(store => {
  const { member, member_account } = store.auth;
  const { errorMessage, invitationResponse } = store.email_invitations;
  return {
    member,
    member_account,
    errorMessage,
    invitationResponse
  };
})
class MemberInviteScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.invitationResponse === "success") {
      this.props.navigation.navigate("Activities");
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
    super(props);
    this.state = { email: "" };
  }

  invite = emailText => {
    const { email, sendAccountInvite, member_account, errorMessage, invitationResponse } = this.props;
    sendAccountInvite({ token: this.props.member_account.data, email: emailText });
  };

  componentDidMount() {
    const { dispatch, member } = this.props;
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
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="lyflynks@gmail.com"
        />
        <TouchableOpacity style={styles.button} onPress={() => this.invite(this.state.email)}>
          <Text style={styles.buttonText}>Invite Member</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
      </View>
    );
  }
}

export default connect(
  null,
  { sendAccountInvite }
)(MemberInviteScreen);

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
    margin: 15,
    alignSelf: "center",
    fontSize: 18
  },
  errorMessage: {
    color: "red",
    alignSelf: "center"
  }
};
