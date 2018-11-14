import React from 'react';
import { Alert,AppRegistry,View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import SegmentControl from 'react-native-segment-control';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'; 
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Slider } from 'react-native-elements';  

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 10,
      minute: 10,
      markedDates:'2018-10-17'
    };
  }

  changeHours(value) {
    this.setState(() => {
      return {
        hours: parseFloat(value),
      };
    });
  } 

  changeMinute(value) {
    this.setState(() => {
      return {
        minute: parseFloat(value),
      };
    });
  }

  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });
  }
 

  render() {
    const handleClick = () =>{
      Alert.alert(
        String(hours)+':'+String(minute)
      )
   }
    const DateTab = () => {
      return <View style={{padding:10}}> 
          <Calendar  
           // Handler which gets executed on day press. Default = undefined
           onDayPress={day => {
            //console.log('selected day', day);
            // Alert.alert('selected day', day.dateString);
            const markedDates =  {[day.dateString]: {
              selected: true,
              color: '#00A68C'
            }}
            this.setState({markedDates})
          }}
          dayNames={'M','T','W','T','F','S','S'} 
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM'}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#000', 
            todayTextColor: '#000',
            dayTextColor: '#2d4150', 
            textDisabledColor: '#d9e1e8',
            dotColor: '#00A68C',
            selectedDotColor: '#000',
            arrowColor: 'orange',
            monthTextColor: '#000000', 
            arrowColor: '#0E3A53', 
            selectedDayPadding: '10',
            textMonthFontSize:20,
            textMonthFontFamily:'Avenir',
            todayBackgroundColor:'#fff',
            selected: '#E94D49',
            selectedDayBackgroundColor: '#00A68C',
            selectedDayTextColor: '#fff',
          }}
          markedDates={this.state.markedDates}
          
        /> 
    
                <Button
                title="Next" 
                loadingProps={{ size: "large", color: "#00A68C" }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                backgroundColor: "#00A68C",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 25,
                margin:20,
                marginLeft:35,
    
                }}
                containerStyle={{ marginTop: 20 }}
 
                />
    
                </View>
    };
    const {hours} = this.state;
    const {minute} = this.state;
    const TimeTab = () => {
      return <View style={{flex: 1,  alignItems: 'stretch', justifyContent: 'center', padding:40}}>
              
              <Text style={styles.hours}>{String(hours)}</Text>
              <Text style={styles.minute}>{String(minute)}</Text>
              
              <Text style={{fontSize:16,color:'#000'}}>Hours</Text>
              <Slider 
              step={1}
              maximumValue={12}
              onValueChange={this.changeHours.bind(this)}
              value={hours}
              />
              <Text style={{fontSize:16,color:'#000'}}>Minutes</Text>
              <Slider 
              step={1}
              maximumValue={60}
              onValueChange={this.changeMinute.bind(this)}
              value={minute}
              />  
      
              <Button
                title="Next" 
                loadingProps={{ size: "large", color: "#00A68C" }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                backgroundColor: "#00A68C",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 25,
                margin:20,
                marginLeft:5,
    
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={handleClick}
                />
      
      
            </View>
        ;
    };
    
    const segments = [
      {
        title: 'DATE',
        view: DateTab
      },
      {
        title: 'TIME',
        view: TimeTab
      }
    ]; 

    
    return (
      <View style={styles.container}>
        <SegmentControl segments={segments} />
       
      </View>
    );

  }
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding:10,
    flexDirection:'row',
    borderRadius:30
   
  },
  text: {
    alignSelf: 'center',
    margin: 50,
    paddingBottom:10,
    marginTop:10
  },
  hours:{
    padding:15, 
    borderRadius: 7,
    width:50,
    borderWidth: 2,
    borderColor: '#00A68C',
    flex: 1,
    flexDirection: 'row',
    position:'absolute',
    top:50,
    left:'40%'

  },
  minute:{
    padding:15, 
    borderRadius: 7,
    width:50,
    borderWidth: 2,
    borderColor: '#00A68C',
    flex: 1,
    flexDirection: 'row',
    position:'absolute',
    top:50,
    right:'40%'
  }

}); 