import React, { Component } from 'react';
import { Alert,View, StyleSheet, ScrollView } from "react-native";
import { ListItem, Card, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";
import { BackHandler } from "react-native";


import { updateEntity } from "../../memberAction";
import { signUp } from "../../accountAction";
import ImageButton from "components/ImageButton";

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
        {renderInstructions(instructions)}
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
    
        <Text  style={styles.heading} />
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
        <ImageButton  
        />
        <Button
          style={styles.nextBtn}
          title="Next"
          fontWeight= 'bold'
          fontFamily='Avenir' 
          buttonStyle={{
            backgroundColor: "#00A68C",
            width: '90%',
            height: 50,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
            // elevation: 3,
            marginBottom:5,
            zIndex:0,
            marginLeft:20
          }}
          textStyle={{
            fontSize:18 ,  
            fontFamily:'Avenir',
            fontWeight:'bold'
          }}
          containerStyle={{ marginTop: 20 }}
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
    const { dispatch, proceedAhead } = this.props;
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
    proceedAhead();
  }

  renderPreferredDays() {
    const { preferredDays } = this.props;
    console.log(preferredDays);

    const keys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return keys.map((key) => {
      const day = preferredDays[key];
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
    const keys = ['morning', 'earlyAfternoon', 'evening'];
    return keys.map(key => {
      const time = preferredTime[key];
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
  nextBtn:{
    borderRadius: 10,
    shadowOpacity: 5, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5, 
    elevation: 10,
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
