import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { Card } from "./Card";
import { Button } from "./Button";
import { connect } from "react-redux";
import { updateValue } from "../actions/account_creation_form";
import Color from "color";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PREFFERED_TIME = ["Morning", "Early Afternoon", "Evening"];

class PrefferedDayTimeForm extends React.Component {
  renderPrefferedTime() {
    return PREFFERED_TIME.map(time => {
      return (
        <CheckBox
          key={time}
          title={time}
          checked={this.props.prefferdDay === time}
          onPress={() =>
            this.props.updateValue({ prop: "prefferdTime", value: time })
          }
        />
      );
    });
  }

  renderWeekdays() {
    return WEEKDAYS.map(weekday => {
      return (
        <CheckBox
          key={weekday}
          title={weekday}
          checked={this.props.prefferdDay === weekday}
          onPress={() =>
            this.props.updateValue({ prop: "prefferdDay", value: weekday })
          }
        />
      );
    });
  }

  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    debugger;
    return (
      <View style={styles.conatiner}>
        {renderInstructions(instructions)}
        <View style={styles.prefferdDayTimeContainer}>
          <View style={styles.prefferedWeekdayContainer}>
            {this.renderWeekdays()}
          </View>
          <View style={styles.prefferedTimeContainer}>
            {this.renderPrefferedTime()}
          </View>
        </View>
        <Button style={styles.nextButton} onPress={proceedAhead}>
          Next
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return ({ prefferdDay, prefferdTime } = state.accountCreationForm);
};

export default connect(
  mapStateToProps,
  { updateValue }
)(PrefferedDayTimeForm);

const styles = StyleSheet.create({
  conatiner: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  },
  prefferdDayTimeContainer: {
    borderColor: "red",
    flexDirection: "row",
    height: 300
  },
  prefferedWeekdayContainer: {
    flex: 0.6
  },
  prefferedTimeContainer: {
    flex: 0.4
  },
  nextButton: {
    backgroundColor: "#aaf255",
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  }
});
