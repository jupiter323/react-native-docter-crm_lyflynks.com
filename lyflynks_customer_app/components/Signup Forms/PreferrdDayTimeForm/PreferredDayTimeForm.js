import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { Input, Card, Button } from "../../UI";
import { connect } from "react-redux";
import { updateFormValue } from "../../../actions/member_form";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PREFFERED_TIME = ["Morning", "Early Afternoon", "Evening"];

const mapStateToProps = state => {
  return ({ prefferdDay, prefferdTime } = state.accountCreationForm);
};
@connect(mapStateToProps)
class PrefferedDayTimeForm extends React.Component {
  renderPrefferedTime() {
    const { dispatch, prefferdTime } = this.props;
    return PREFFERED_TIME.map(time => {
      return (
        <CheckBox
          key={time}
          title={time}
          checked={prefferdTime === time}
          onPress={() =>
            dispatch(updateFormValue({ prop: "prefferdTime", value: time }))
          }
        />
      );
    });
  }

  renderWeekdays() {
    const { dispatch } = this.props;
    return WEEKDAYS.map(weekday => {
      return (
        <CheckBox
          key={weekday}
          title={weekday}
          checked={this.props.prefferdDay === weekday}
          onPress={() =>
            dispatch(updateFormValue({ prop: "prefferdDay", value: weekday }))
          }
        />
      );
    });
  }

  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <View style={styles.container}>
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

export { PrefferedDayTimeForm };

const styles = StyleSheet.create({
  container: {
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
    borderColor: "#aaf255",
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  }
});
