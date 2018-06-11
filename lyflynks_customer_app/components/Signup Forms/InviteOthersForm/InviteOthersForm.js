import React from "react";
import { View, Modal } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";

import { Input } from "../../UI";
import { member } from "../../../actions/auth";
import { modifyEmailInvitations } from "../../../actions/email_invitations";

const mapStateToProps = state => {
  return {
    ...state.auth,
    ...state.member_form,
    ...state.email_invitations
  };
};
@connect(mapStateToProps)
class InviteOthersForm extends React.Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.member.success && !this.props.member.success) {
      //this.props.navigation.navigate("MemberAccountLogin");
    }
  }

  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <View style={styles.container}>
        <Text h4 style={styles.heading}>
          Would you like to add any other members to your account once it has
          been activated?
        </Text>
        {this.renderEmails()}
        {this.renderModal()}
        <Button
          raised
          icon={{ name: "send" }}
          title="Invite"
          backgroundColor="#00A68C"
          onPress={this.toggleModal.bind(this)}
        />
        <Icon
          raised
          name="add"
          reverse={true}
          type="material-icon"
          color="#2096f3"
          containerStyle={{
            position: "absolute",
            bottom: 5,
            right: 10,
            alignSelf: "flex-end"
          }}
          onPress={this.modifyEmailInvite.bind(this, "add")}
        />
      </View>
    );
  }

  renderEmails() {
    const { invitations, dispatch } = this.props;
    return _.map(invitations, invite => {
      return (
        <View style={styles.inviteContainer} key={invite.id}>
          <Input
            value={invite.email}
            style={styles.emailcontainer}
            onChangeText={this.modifyEmailInvite.bind(this, "edit", invite)}
            placeholder="Email"
          />
          <Icon
            name="delete"
            type="material-icon"
            color="#e2401b"
            size={30}
            onPress={this.modifyEmailInvite.bind(this, "delete", invite)}
          />
        </View>
      );
    });
  }

  modifyEmailInvite(operation, emailInvite, updatedEmailId) {
    const { dispatch } = this.props;
    dispatch(
      modifyEmailInvitations({
        operation,
        id: emailInvite.id || undefined,
        email: updatedEmailId !== undefined ? updatedEmailId : emailInvite.email
      })
    );
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={this.toggleModal.bind(this)}
      >
        <View style={styles.modalContainer}>
          <Text h2 style={styles.modalHeading}>
            we will contact them shortly.
          </Text>
          <Button
            raised
            backgroundColor="#00A68C"
            iconRight={{ name: "done" }}
            title="Done"
            onPress={this.toggleModal.bind(this)}
          />
        </View>
      </Modal>
    );
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  prepareUserDataForSignup() {
    return (user = {
      fnmae: this.props.firstname
    });
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center"
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E3A53",
    margin: 10
  },
  inviteContainer: {
    flexDirection: "row",
    width: "100%"
  },
  emailcontainer: {
    flex: 0.9
  },
  modalContainer: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-around",
    backgroundColor: "#C5AE91"
  },
  modalHeading: {
    textAlign: "center",
    color: "white"
  }
};
export { InviteOthersForm };
