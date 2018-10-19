import React from 'react';
import { Alert,AppRegistry,View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import SegmentControl from 'react-native-segment-control';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'; 
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Slider } from 'react-native-elements';  
import { Switch } from 'react-native-switch';
import SwitchSelector from 'react-native-switch-selector';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 10,
      minute: 15,
      checked:false
    };
    this.handleChange = this.handleChange.bind(this);
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
  state = {
    trueSwitchIsOn: true,
    falseSwitchIsOn: false,
  };

  state = {
    eventSwitchIsOn: false,
    eventSwitchRegressionIsOn: true,
  };
 

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const handleClick = () =>{
      Alert.alert(
        String(hours)+':'+String(minute)
      )
   }
   
   handleIndexChange = (index) => {
    return <View><Text>Hello</Text></View>
   }

    const DateTab = () => {
      return <View style={{padding:10}}> 
          <Calendar  
           hideExtraDays={true}
           // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            const markedDates =  {[day.dateString]: {
              selected: true,
              color: '#00A68C'
            }}
            this.setState({markedDates})
            
          }}
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
                 style={styles.btnShadow}
                title="Next" 
                loadingProps={{ size: "large", color: "#00A68C" }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                backgroundColor: "#00A68C",
                width: '100%',
                height: 45,
                borderWidth: 0,
                borderRadius: 25,
                margin:20,
                marginLeft:0,
    
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
              <Text style={styles.coloumn}>:</Text>
              <Text style={styles.minute}>{String(minute)}</Text>
              
              <Text style={{fontSize:16,color:'#000',width:'100%',marginTop:50}}>Hours</Text> 
              <Slider 
                step={1}
                maximumValue={12}
                maximumTrackTintColor="#dddcdc"
                minimumTrackTintColor="#00A68C"
                thumbTintColor="#00A68C" 
                
                onValueChange={this.changeHours.bind(this)}
                value={hours}
                trackStyle={{
                  elevation:4,
                  height:3,
                  borderColor:'#00A68C',
                  shadowColor:'#fff',
                  shadowRadius:5, 
                  shadowOffset: {
                    width: 0,
                    height: 1
                  }
                }}
                thumbStyle={{elevation:10,borderColor:'#00A68C', backgroundColor:'#00A68C' ,shadowColor:'#f4f4f4',shadowRadius:5,height:17,width:16}}
              
              />
              <Text style={{fontSize:16,color:'#000'}}>Minutes</Text>
              <Slider  style={styles.slider}
              step={1}
              maximumValue={59}
              maximumTrackTintColor="#dddcdc"
              minimumTrackTintColor="#00A68C"
              thumbTintColor="#00A68C"
              onValueChange={this.changeMinute.bind(this)}
              value={minute} 
              trackStyle={{
                elevation:4,
                height:3,
                borderColor:'#00A68C',
                shadowColor:'#fff',
                shadowRadius:5, 
                shadowOffset: {
                  width: 0,
                  height: 1
                }
              }}
              thumbStyle={{elevation:10,borderColor:'#00A68C', backgroundColor:'#00A68C' ,shadowColor:'#f4f4f4',shadowRadius:5,height:17,width:16}}
              />   
       
         <View style={styles.ampm}> 
          <SwitchSelector
          initial={0}
          hasPadding="false" 
          buttonColor='#fff' 
          selectedColor="#fff"
          textColor="#000"
          backgroundColor="#ccc" 
          borderColor="#ccc" 
          options={[
              { label: 'AM', value: 'am'}, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: 'PM', value: 'pm'} //images.masculino = require('./path_to/assets/img/masculino.png')
          ]} />

          
        </View> 

              <Button
              style={styles.btnShadow}
                title="Next" 
                loadingProps={{ size: "large", color: "#00A68C" }}
                titleStyle={{ fontWeight: "700",fontSize:20,fontWeight:'bold' }}
                buttonStyle={{
                backgroundColor: "#00A68C",
                width: '100%',
                height: 45,
                borderColor: "#00A68C",
                borderWidth: 0,
                borderRadius: 25,
                margin:20,
                marginLeft:0,
    
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
        view: DateTab, 
      },
      {
        title: 'TIME',
        view: TimeTab 
      }
    ];  
    
    const clickMe = () => { 
      return <View><Text>click me </Text></View>
    }
    
    return (
      <View style={styles.container}>  

        <SegmentControl segments={segments}
          activeTabStyle={{  backgroundColor: '#ccc' }}
        />
       
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
  slider:{
    borderRadius: 10,
    shadowOpacity: 5, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,  
  }, 
  btnShadow:{
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
  ampm: {
    flex: 1, 
    justifyContent: 'center',
    width:'30%', 
    height:40,
    marginLeft:'35%'
   
  },
  text: {
    alignSelf: 'center',
    margin: 50,
    paddingBottom:10,
    marginTop:10
  },
  hours:{
    padding:15, 
    borderRadius: 9,
    width:55,
    height:55,
    borderWidth: 2,
    borderColor: '#dddcdc', 
    position:'absolute',
    top:40,
    left:'42%',
    backgroundColor:'#dddcdc',
    fontSize: 20,
    fontWeight: 'bold',

  },
  coloumn:{
    position:'absolute',
    top:60,
    right:'64%',
    fontWeight:'bold' 
  },
  minute:{
    padding:15, 
    borderRadius: 9,
    width:55,
    height:55,
    borderWidth: 2,
    borderColor: '#dddcdc',  
    position:'absolute',
    top:40,
    right:'40%',
    backgroundColor:'#dddcdc',
    fontSize: 20,
    fontWeight: 'bold',
  }

}); 