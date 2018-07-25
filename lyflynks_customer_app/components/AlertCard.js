import React from "react";
import { TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const AlertCard = props => {
  const { key, expand } = props;

  return (
    <TouchableOpacity
      key="1"
      style={[styles.card, expand ? styles.cardExpanded : styles.cardFolded]}
    >
      <Text style={styles.activityAlertDescription}> A new member invited </Text>
      <Text style={styles.activityWhen}>
        <FontAwesome name="calendar-o" />
        <Text>12 may 2018, 8:30 pm</Text>
      </Text>
      <Button title="expand" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 25,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    display: "flex",
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowColor: "#000"
  },
  cardFolded: {
    height: 100
  },
  cardExpanded: {
    height: 200
  },
  activityAlertDescription: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10
  },
  activityWhen: {
    color: "#AFB1B4",
    fontSize: 14,
    textAlign: "right"
  }
});

{
  /* <TouchableOpacity key="1" style={this.state.expand ? styles.cardExpanded : styles.card}>
          <Text style={styles.activityAlertDescription}> A new member invited </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
          <Button title="expand" onPress={this.expandCard.bind(this)} />
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity key="2" style={styles.card}>
          <Text style={styles.activityAlertDescription}>
            {" "}
            Billyj@gmail.com has joined your account{" "}
          </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity key="3" style={styles.card}>
          <Text style={styles.activityAlertDescription}>
            {" "}
            Reminder to book an medical appointment{" "}
          </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
        </TouchableOpacity> */
}
