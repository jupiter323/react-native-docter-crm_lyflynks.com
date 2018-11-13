import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomCard, AnyMemberCanComplete } from './Cards';
import { CheckBox, View, Input, Subtitle, Thumbnail, Switch, Label } from 'native-base';
import {
    colorSwatch,
    deviceWidth
  } from '../../../styles/Theme';
import { Calendar } from 'react-native-calendars'; 
import { Slider } from 'react-native-elements';
import { getHoursAndMinutes } from '../util';  

const styles = StyleSheet.create({
    selectedTime: {
        padding:15, 
        borderRadius: 7,
        width:50,
        borderWidth: 2,
        borderColor: '#00A68C',
        top:50,
        left:'40%'
    }
});

const calendarTheme = {
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
};

export const CalendarItem = ({ markedDates, onDateChange }) => (
    <Calendar 
        onDayPress={day => {
            const markedDates =  {[day.dateString]: {
                selected: true,
                color: '#00A68C'
            }}
            onDateChange(markedDates);
        }}
        dayNames={['M','T','W','T','F','S','S']} 
        monthFormat={'MMMM'}
        theme={calendarTheme}
        markedDates={markedDates}
    />
);

const SliderWithTitle = ({ title, ...rest }) => (
    <React.Fragment>
        <Text style={{fontSize:16, color:'#000'}}>{title}</Text>
        <Slider
            minimumTrackTintColor="#00A68C"
            maximumTrackTintColor="#d3d3d3"
            thumbStyle={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#1a9274' }}
            {...rest}
        />
    </React.Fragment>
);

function getTwoDigit (text) {
    return +text < 10 ? `0${text}` : text;
}

const TimeBox = ({ text }) => (
    <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d3d3d3' , borderRadius: 2}}>
        <Text style={{ fontSize: 20 }}> { getTwoDigit(text) } </Text>
    </View>
);

const DisplayTime = ({ hours, minutes }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TimeBox text={hours} />
        <View style={{ height: 30, width: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>:</Text>
        </View>
        <TimeBox text={minutes} />      
    </View>
);

export class TimeItem extends React.PureComponent {
    
    handleOnValueChange = (val, type) => {
        const { value, onChange } = this.props;
        const [ hrs, min, pm ] = getHoursAndMinutes(value);
        if (type === 'hrs') {
            onChange(`${val},${min},${pm}`);
        } else if (type === 'min') {
            onChange(`${hrs},${val},${pm}`);
        } else {
            onChange(`${hrs},${min},${val}`);
        }
    }
    
    render() {
        const { value } = this.props;
        const [hrs, mins, pm] = getHoursAndMinutes(value);
        return (
            <View style={{flex: 1, padding: 20}}>  
                <View style={{ flex: 1 }}>
                    <DisplayTime 
                        hours={hrs}
                        minutes={mins}
                    />
                </View>
                <View style={{ flex: 4}}>
                    <SliderWithTitle
                        title="Hours"
                        onValueChange={(val) => this.handleOnValueChange(val, 'hrs')} 
                        step={1}
                        maximumValue={12}
                        value={hrs}
                    />
        
                    <SliderWithTitle
                        title="Minutes" 
                        step={1}
                        onValueChange={(val) => this.handleOnValueChange(val, 'min')}
                        maximumValue={60}
                        value={mins}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center'  }}>
                        <Label>
                            PM
                        </Label>
                        <Switch value={pm} onValueChange={(val) => this.handleOnValueChange(val, 'pm')} />
                    </View>
                </View>
            </View>
        );
    }
} 

export const SelectMembers = ({ anyOneCanComplete, onCheck, title, onAnyCheck, members }) => {
    const options = members.map((m, i) => (
        <CustomCard  height={40} width={deviceWidth - 60} key={i}>
            <TouchableOpacity onPress={() => onCheck(i, !m.checked)}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Thumbnail style={{ height: 30, width: 30 }} source={ require('../../../assets/images/elder-01.png') } />
                    </View>
                    <View style={{ flex: 5, alignItems: 'flex-start' }}>
                        <Subtitle style={{ color: colorSwatch.dustyGray }}>{m.full_name}</Subtitle>
                    </View>
                    <View style={{flex:1 }}>
                        <CheckBox disabled={anyOneCanComplete} checked={anyOneCanComplete || m.checked} onPress={() => onCheck(i, !m.checked)} color={colorSwatch.caribbeanGreen} />
                    </View>
                </View>
            </TouchableOpacity>
        </CustomCard>
    ));

    return (
        <View>
            <View style={{ alignItems: 'center', marginBottom : onAnyCheck ? 8 : 16 }}>
                <Text style={{ color: colorSwatch.persianGreen, fontWeight: 'bold' }}>
                    { title }   
                </Text>
            </View>
            {onAnyCheck && 
                <View style={{ padding: 8 }}>
                    <AnyMemberCanComplete checked={anyOneCanComplete} onCheck={onAnyCheck} />
                </View>}
            {options}
        </View>
    );
}

export const InputNotes = ({ title, notes, onNoteChange }) => {
    return (
        <View style={{flex: 1, padding: 16}}>
            <View style={{ alignItems: 'center', marginBottom : 16 }}>
                <Text style={{ color: colorSwatch.persianGreen, fontWeight: 'bold' }}>
                    { title }   
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Input 
                    multiline={true} 
                    value={notes} 
                    numberOfLines={5} 
                    placeholder="Enter notes here"
                    onChangeText={onNoteChange} 
                />
            </View>
        </View>
    );
}