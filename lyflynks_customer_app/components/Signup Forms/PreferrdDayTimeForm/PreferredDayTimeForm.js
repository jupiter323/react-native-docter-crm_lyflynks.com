import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ListItem, Card, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";

import { updateEntity } from "../../../actions/member_form";

const mapStateToProps = state => {
  return { ...state.member_form };
};
@connect(mapStateToProps)
class PrefferedDayTimeForm extends React.Component {
  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderInstructions(instructions)}
        <Text h4 style={styles.heading}>
          Select Your Preferred Day
        </Text>
        <Card containerStyle={styles.card}>{this.renderPrefferedTime()}</Card>
        <Text h4 style={styles.heading}>
          Select Your Preferred Time
        </Text>
        <Card containerStyle={[styles.card, { marginBottom: 10 }]}>
          {this.renderPreferredDays()}
        </Card>
        <Button
          large
          raised
          iconRight={{ name: "trending-flat" }}
          title="Next"
          backgroundColor="#00A68C"
          buttonStyle={styles.nextButton}
          onPress={proceedAhead}
        />
      </ScrollView>
    );
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
    padding: 0
  },
  heading: {
    textAlign: "center",
    margin: 10
  }
});
