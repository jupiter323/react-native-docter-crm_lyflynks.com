import React from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

class CheckInDate extends React.Component {
  constructor(props) {
    super(props);
  }

  onDateChange = (date) => {
    this.props.onDateChange(date);
  }

  render() {
    return (
      <View styles={styles.container}>
        <DatePicker
          style={styles.datepicker}
          date={this.props.selectedDateTime}
          mode="datetime"
          placeholder="select date"
          format="MM/DD/YYYY hh:mma"
          minDate={new Date()}
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
              marginLeft: 'auto',
              marginRight: 'auto'
            }
          }}
          onDateChange={(date) => {this.onDateChange(date)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative'
  },
  datepicker: {
    flex: 1,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default CheckInDate;
