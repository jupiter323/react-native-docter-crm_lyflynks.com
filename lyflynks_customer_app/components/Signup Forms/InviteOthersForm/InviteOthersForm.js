import React from "react";
import { View, Text, Modal } from "react-native";
import { Input, Card, Button } from "../../UI";
import { member } from "../../../actions/auth";
import { connect } from "react-redux";
import _ from "lodash";
import { modifyEmailInvitations } from "../../../actions/member_form";

const mapStateToProps = state => {
  debugger;
  return {
    ...state.accountCreationForm,
    ...state.auth,
    ...state.emailInvitations
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

  renderEmails() {
    debugger;
    const { invitations, dispatch } = this.props;
    return _.map(invitations, invite => {
      return (
        <Input
          value={invite.email}
          key={invite.id}
          onChangeText={value => {
            debugger;
            dispatch(
              modifyEmailInvitations({
                operation: "edit",
                id: invite.id,
                email: value
              })
            );
          }}
          placeholder="Email"
        />
      );
    });
  }

  render() {
    const {
      instructions,
      renderInstructions,
      proceedAhead,
      dispatch
    } = this.props;
    return (
      <View>
        {/* <Card>{renderInstructions(instructions)}</Card> */}
        <View style={styles.container}>
          {/* <Input
            onChangeText={this.updateUsername}
            value={this.props.username}
            onChangeText={dispatch(
              modifyEmailInvitations({
                operation: "add",
                email: this.props.email
              })
            )}
            placeholder="Email"
          /> */}
          {this.renderEmails()}
          <Button
            style={styles.inviteButton}
            onPress={() =>
              dispatch(modifyEmailInvitations({ operation: "add" }))
            }
          >
            Add
          </Button>
          <Button
            style={styles.inviteButton}
            onPress={() =>
              dispatch(modifyEmailInvitations({ operation: "delete" }))
            }
          >
            Add
          </Button>
          {/* {this.renderModal()}
          <Button
            style={styles.inviteButton}
            onPress={() => this.setState({ modalVisible: true })}
          >
            Invite
          </Button>
          <Button
            style={styles.inviteButton}
            onPress={() => this.setState({ modalVisible: true })}
          >
            Invite
          </Button>
          <Button
          //onPress={() => //dispatch(member(prepareUserDataForSignup()))}
          >
            Finish
          </Button> */}
        </View>
      </View>
    );
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text>We will contact them shortly.</Text>
            <Button
              style={styles.inviteButton}
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible });
              }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    );
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
    alignItems: "center"
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  modalContainer: {
    flex: 1,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  inviteButton: {
    borderRadius: 5,
    width: 150,
    marginTop: 15,
    marginBottom: 15
  }
};
export { InviteOthersForm };
