import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text as PlainText, ScrollView } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";

import { emailInviteValidator } from "../index";
import { Input } from "../../UI";
import {
  modifyEmailInvitations,
  sendEmailInvitations,
  updateEmailErrorMessage
} from "../../../actions/email_invitations";

const mapStateToProps = state => {
  return { ...state.email_invitations, ...state.member_form };
};

class InviteOthersForm extends React.Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  componentDidUpdate(prevProps) {
    const { invitationResponse } = this.props;
    const { modalVisible } = this.state;
    if (invitationResponse !== prevProps.invitationResponse) {
      invitationResponse === "success" ? this.setState({ modalVisible: !modalVisible }) : "";
    }
  }

  render() {
    const { instructions, renderInstructions, invitationResponse, invitations } = this.props;
    return (
      <View style={styles.container}>
        <Text h4 style={styles.heading}>
          Would you like to add any other members to your account once it has been activated?
        </Text>
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {this.renderEmails()}
          {this.renderModal()}
          {this.renderTryAgain()}
        </ScrollView>
        <View style={{ flex: 0.15 }}>
          <Button
            raised
            icon={{ name: "send" }}
            title="Next"
            disabled={this.checkForInvalidFields()}
            backgroundColor="#00A68C"
            containerViewStyle={styles.finishButton}
            onPress={this.sendEmailInvitations.bind(this, invitations)}
          />
        </View>
        <Icon
          raised
          name="add"
          reverse={true}
          type="material-icon"
          color="#2096f3"
          containerStyle={styles.addButton}
          onPress={this.addEmail.bind(this, "add")}
        />
      </View>
    );
  }

  renderEmails() {
    const { invitations, dispatch } = this.props;
    return _.map(invitations, invite => {
      return (
        <View key={invite.id}>
          <View style={styles.inviteContainer}>
            <Input
              value={invite.email}
              style={styles.input}
              onChangeText={this.editEmail.bind(this, "edit", invite)}
              placeholder="Email"
              onBlur={this.updateEmailErrorMessage.bind(this, invite)}
            />
            <Icon
              name="delete"
              type="material-icon"
              color="#0E3A53"
              size={30}
              onPress={this.deleteEmail.bind(this, "delete", invite)}
            />
          </View>
          <View>
            <Text style={{ alignSelf: "center", color: "red" }}>{invite.error}</Text>
          </View>
        </View>
      );
    });
  }

  updateEmailErrorMessage(invite) {
    const { dispatch } = this.props;
    dispatch(
      updateEmailErrorMessage({
        id: invite.id,
        error: this.validateValue(invite.email)
      })
    );
  }

  validateValue(value) {
    return emailInviteValidator("emailInvite", value);
  }

  renderModal() {
    const { invitationResponse, navigation, errorEmails } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={this.navigateToSignUpComplete.bind(this)}
      >
        <View style={styles.modalContainer}>
          <Text h2 style={styles.modalHeading}>
            We will contact you shortly.
          </Text>
          {this.renderErrorEmails()}
          <Button
            raised
            backgroundColor="#00A68C"
            icon={{ name: "send" }}
            title="Next"
            onPress={this.navigateToSignUpComplete.bind(this)}
          />
        </View>
      </Modal>
    );
  }

  renderErrorEmails() {
    if (this.props.errorEmails.length != 0) {
      return (
        <View>
          <PlainText style={{ alignSelf: "center" }}>Following emails couldn't be send</PlainText>
          {this.getErrorEmails()}
        </View>
      );
    }
  }

  getErrorEmails() {
    const { errorEmails } = this.props;
    return errorEmails.map(email => {
      return (
        <PlainText key={email} style={{ alignSelf: "center" }}>
          {email}
        </PlainText>
      );
    });
  }

  navigateToSignUpComplete() {
    const { navigation } = this.props;
    this.setState({ modalVisible: false });
    navigation.navigate("SignUpComplete");
  }

  renderTryAgain() {
    const { invitationResponse, errorMessage } = this.props;
    return invitationResponse == "failure" ? (
      <PlainText style={styles.errorMessage}>
        Seems like a network problem. Please try again later
      </PlainText>
    ) : null;
  }

  addEmail(operation, email) {
    const { dispatch } = this.props;
    dispatch(modifyEmailInvitations({ operation }));
  }

  editEmail(operation, email, updatedEmailId) {
    const { dispatch } = this.props;
    dispatch(
      modifyEmailInvitations({
        operation,
        id: email.id,
        email: updatedEmailId
      })
    );
  }

  deleteEmail(operation, email) {
    const { dispatch } = this.props;
    dispatch(
      modifyEmailInvitations({
        operation,
        id: email.id
      })
    );
  }

  checkForInvalidFields() {
    const { invitations } = this.props;
    for (let invite in invitations) {
      if (invitations[invite].error !== "") {
        return true;
      }
    }
    return false;
  }

  sendEmailInvitations(emailInvitations) {
    const { dispatch, token } = this.props;
    dispatch(sendEmailInvitations(emailInvitations, token));
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
  scrollViewContainer: {
    width: "100%",
    flex: 0.8
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E3A53",
    margin: 10,
    flex: 0.15
  },
  addButton: {
    position: "absolute",
    bottom: 35,
    right: 15,
    alignSelf: "flex-end"
  },
  inviteContainer: {
    flexDirection: "row",
    width: "100%"
  },
  finishButton: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    width: 180
  },
  input: {
    height: 40,
    margin: 10,
    backgroundColor: "#fafafa",
    borderColor: "#eeeeee",
    borderWidth: 1,
    flex: 0.95
  },
  modalContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-around"
  },
  modalHeading: {
    textAlign: "center"
  }
};

export default connect(mapStateToProps)(InviteOthersForm);
