import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Screen from 'components/Screen';
import { connect } from 'react-redux';
import { CalendarItem } from '../CheckIn/components/InputCompo';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { transportationDateUpdated } from './action';
import {
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';

class TransportDateSelect extends React.Component {
  onContinuePressed = () => {
    this.props.navigation.navigate('TransportationPickup');
  }

  onDateChange = (date) => {
    const { dispatch } = this.props;

    dispatch(transportationDateUpdated(new Date(date)));
  }

  render() {
    let minimumDate = moment(new Date()).format('MM/DD/YYYY hh:mm a');

    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Select a Pickup Date'
          back={true}
          />

        <View style={styles.innerContainer}>
          <Text style={styles.text}>When do you need a ride?</Text>
          <View>
            <DatePicker
              style={styles.datepicker}
              date={moment(this.props.transportationDate).format('MM/DD/YYYY hh:mm a')}
              mode="datetime"
              placeholder="Select a Pickup Date"
              format="MM/DD/YYYY hh:mm a"
              minDate={minimumDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={this.onDateChange}
            />
          </View>
          <View style={styles.button}>
            <Button primary
              title='Continue'
              onPress={ () => this.onContinuePressed() } />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  datepicker: {
    width: 250,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.header,
    color: colorSwatch.edenBlue,
    marginBottom: 20,
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => ({
  transportationDate: state.transport.transportationDate
});

export default connect(mapStateToProps, null)(TransportDateSelect);
