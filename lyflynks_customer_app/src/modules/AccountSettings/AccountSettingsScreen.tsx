import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "components/Input";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { sendAccountInvite } from "actions/emailInvitation";
import Screen from "../../common/componentLib/Screen";

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

class AccountSettingsScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('invite member function called successfully');
    console.log(nextProps);

    if (nextProps.invitationResponse === "success") {
      Alert.alert("Member successfully invited.");
      this.props.navigation.navigate("ActivityLogScreen");
    } else if (nextProps.invitationResponse === "failure") {
      this.setState({ error: "Member already invited!" });
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
    this.state = { email: "", error: "" };
  }

  invite = emailText => {
    //dispatch
    Alert.alert(this.props.member_account.data);
    const { email, sendAccountInvite, member_account, errorMessage, invitationResponse } = this.props;
    sendAccountInvite({ token: this.props.member_account.data, email: emailText });
    console.log('invite token:', this.props.member_account.data);
    console.log('invite email:', emailText);
  };

  InviteMember = (emailText) => {

    const { email, sendAccountInvite, member_account, errorMessage, invitationResponse } = this.props;
    const token = member_account.data;
    console.log('errorMessage', errorMessage);
    if (!emailText) {
      this.setState({ error: "Please enter email id" });
      return false;
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
      <Screen
        navigation={this.props.navigation}
        title="MEMBER SETTINGS"
        back={true}
      ></Screen>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
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
    color: "#000"
  },
  errorMessage: {
    color: "red",
    alignSelf: "center"
  }
};

// export default connect(stateMap,{ sendAccountInvite })(MemberInviteScreen);

export default connect(stateMap, { sendAccountInvite })(AccountSettingsScreen);

