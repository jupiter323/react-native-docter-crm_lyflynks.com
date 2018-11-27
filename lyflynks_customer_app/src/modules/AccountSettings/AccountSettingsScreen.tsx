import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { sendAccountInvite } from "actions/emailInvitation";
import { SwitchCustom, Button, Input, BoundaryLine, DropdownMenu, Screen } from 'componentsLib';
import { colorSwatch } from 'styles/Theme';
import { Content } from "native-base";
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

  render() {
    navigateScreen = () => {
      this.props.navigation.navigate("CreditCardUpdate");
    };
    return (
      <Screen
        navigation={this.props.navigation}
        title="ACCOUNT SETTINGS"
        back={true}
      >
        <Content>
          <BoundaryLine style={styles.boundaryLine} />

          <TouchableOpacity
            onPress={navigateScreen}
          >
            <Text style={styles.clickTxtStyle}>Update Credit Card</Text>
          </TouchableOpacity>
          <BoundaryLine style={styles.boundaryLine} />
        </Content>
      </Screen>
    );
  }
}


const styles = StyleSheet.create({
  boundaryLine: {
    margin: 25,
    marginTop: 15
  },
  clickTxtStyle: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: 25,
    marginTop: 10,
    color: colorSwatch.bostonBlue
  }
});

// export default connect(stateMap,{ sendAccountInvite })(MemberInviteScreen);

export default connect(stateMap, { sendAccountInvite })(AccountSettingsScreen);

