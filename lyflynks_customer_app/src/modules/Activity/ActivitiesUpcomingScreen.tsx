
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

import ActivitiesTimeline from 'components/ActivityLogTimeline'
import { upcoming } from './action';

const stateMap = (store) => {
  const { upcoming, isFetching, error, newAddedCheckIn } = store.activities;
  const { member_account } = store.auth;
  return { member_account, upcoming, isFetching, error, newAddedCheckIn };
};

const fakeCheckInData = {
  for_who: '',
  status: 'U',
  type: 'check_in',
  when: null,
  who: '',
  taskId: '',
  href: 'http://google.com',
};


class ActivitiesUpcoming extends Component {
  componentDidMount() {
    const { dispatch, member_account, unread } = this.props;
    this.props.navigation.setParams({ unread });
    this.props.navigation.setParams({
      navigateToNofications: this.navigateToNofications.bind(this)
    });
    const token = member_account.data;

    dispatch(upcoming({
      limit: 15,
    }, token));
  }

  _renderContent () {
    let { error, upcoming, navigation, newAddedCheckIn } = this.props
    if (upcoming.success) {
      return <ActivitiesTimeline navigation={navigation} data={[ ...newAddedCheckIn.map(n => ({ ...fakeCheckInData, id: n.id })), ...upcoming.data ]}/>
    }
  }

  navigateToNofications() {
    this.props.navigation.navigate("Alerts");
  }

  render() {

    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <View>
        {
          this._renderContent()
        }
      </View>
    );
  }
}

const styles = {
  headerActionsRight: {
    display: "flex",
    flexDirection: "row",
    flex: 0.2
  },
  headerDrawerButton: {
    color: "#fff",
    backgroundColor: "black",
    fontSize: 24,
    marginLeft: 20
  },
  headerSettingsButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 20
  },
  leftCol: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f9",
    padding: 20
  },
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 25,
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
  cardView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch"
  },
  activityStatus(status) {
    let color;
    switch (status) {
      case "requested":
        color = "#2196F3";
        break;
      case "in progress":
        color = "yellow";
        break;
      case "scheduled":
        color = "green";
        break;
    }
    return {
      position: "absolute",
      color,
      right: 20,
      top: 15,
      fontSize: 14,
      fontWeight: "700"
    };
  },
  activityForWhoLabel: {
    fontSize: 13,
    color: "#334",
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 20
  },
  activityForWho: {
    fontSize: 18,
    color: "#0E3A53",
    fontWeight: "200",
    letterSpacing: 0.5,
    marginTop: 5
  },
  activityWho: {
    fontSize: 20,
    color: "#002",
    fontWeight: "200",
    letterSpacing: 0.5,
    marginTop: 5
  },
  activityType: {
    fontSize: 14,
    color: "#C5AE91",
    fontWeight: "900",
    letterSpacing: 1
  },
  activityWhen: {
    fontSize: 12,
    color: "#0E3A53"
  }
};

export default connect(stateMap)(ActivitiesUpcoming);
