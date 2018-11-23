import * as React from 'react';
import { Calendar as LibCalender } from 'react-native-calendars'; 

const calendarTheme = {
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#000', 
    todayTextColor: '#000',
    dayTextColor: '#2d4150', 
    textDisabledColor: '#d9e1e8',
    dotColor: '#00A68C',
    selectedDotColor: '#000',
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

const Calendar = ({ onDateChange, ...rest }) => (
    <LibCalender 
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
        {...rest}
    />
);

export default Calendar;
