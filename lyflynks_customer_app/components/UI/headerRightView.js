import React from "react";
import { View } from "react-native";

export const headerRightView = props => {
  const { signOut, navigateToNotifications } = props;
  return (
    <View style={styles.container}>
      <View style={styles.bellContainer}>
        <FontAwesome name="bell" size={25} color="white" style={{ marginTop: 7 }} />
        <Text style={styles.notificationCount}>2</Text>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={signOut}>
          <FontAwesome name="sign-out" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 0.2
  },
  bellContainer: {
    flex: 0.7,
    flexDirection: "row",
    marginRight: 30
  },
  notificationCount: {
    color: "white",
    marginLeft: -3
  },
  signOutContainer: {
    flex: 0.3,
    marginRight: 10
  }
};
