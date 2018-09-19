import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { ListItem, Card, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";

import { updateEntity } from "../../../actions/member_form";
import { signUp } from "../../../actions/accounts";

const mapStateToProps = state => {
  return { ...state.member_form };
};
class PrefferedDayTimeForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { accountCreated, navigation } = this.props;
    if (
      prevProps.accountCreated != accountCreated &&
      accountCreated === "success"
    ) {
      navigation.navigate("EmailInvite");
    }
  }

  render() {
    const {
      instructions,
      renderInstructions,
      proceedAhead,
      creatingAccount
    } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderInstructions(instructions)}
        <Text h4 style={styles.heading} />
        <Card
          title="Select your preferred time"
          dividerStyle={{ marginBottom: 0 }}
          titleStyle={{ marginTop: 15 }}
          containerStyle={styles.card}
        >
          {this.renderPrefferedTime()}
        </Card>
        <Card
          title="Select your preferred day"
          dividerStyle={{ marginBottom: 0 }}
          titleStyle={{ marginTop: 15 }}
          containerStyle={styles.card}
        >
          {this.renderPreferredDays()}
        </Card>
        {this.renderErrorMessage()}
        <Button
          large
          raised
          title="Next"
          loading={creatingAccount === true}
          backgroundColor="#00A68C"
          buttonStyle={styles.nextButton}
          onPress={this.signUp.bind(this)}
        />
      </ScrollView>
    );
  }

  renderErrorMessage() {
    if (this.props.accountCreated === "failure") {
      return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>;
    }
  }

  signUp() {
    const { dispatch } = this.props;
    const {
      firstName,
      lastName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      zipCode,
      role,
      preferredDays,
      preferredTime
    } = this.props;

    const member = {
      firstName,
      lastName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      zipCode,
      role,
      preferredDays,
      preferredTime
    };
    dispatch(signUp(member));
  }

  renderPreferredDays() {
    const { preferredDays } = this.props;
    return _.map(preferredDays, (day, key) => {
      return (
        <ListItem
          key={key}
          title={day.title}
          switchButton
          hideChevron
          switched={day.selected}
          onSwitch={this.updateEntity.bind(this, "day", key, day)}
        />
      );
    });
  }

  renderPrefferedTime() {
    const { preferredTime } = this.props;
    return _.map(preferredTime, (time, key) => {
      return (
        <ListItem
          key={key}
          title={time.title}
          switchButton
          hideChevron
          switched={time.selected}
          onSwitch={this.updateEntity.bind(this, "time", key, time)}
        />
      );
    });
  }

  updateEntity(entityType, key, entity) {
    const { dispatch } = this.props;
    dispatch(updateEntity({ entityType, key, selected: !entity.selected }));
  }
}

export { PrefferedDayTimeForm };

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "white"
  },
  card: {
    padding: 0,
    margin: 0,
    marginBottom: 15
  },
  heading: {
    textAlign: "center",
    margin: 10
  },
  nextButton: {
    marginBottom: 10
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center"
  }
});

export default connect(mapStateToProps)(PrefferedDayTimeForm);
