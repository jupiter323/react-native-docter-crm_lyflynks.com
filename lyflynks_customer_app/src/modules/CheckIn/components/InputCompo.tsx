import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomCard, AnyMemberCanComplete } from './Cards';
import { CheckBox, View, Input, Subtitle, Thumbnail, Switch, Label } from 'native-base';
import {
    colorSwatch,
    deviceWidth
  } from 'styles/Theme';
import CalendarItem from 'componentsLib/Calendar';
import TimeItem from 'componentsLib/TimeInput';

export { CalendarItem, TimeItem }; 

export const SelectMembers = ({ anyOneCanComplete, onCheck, title, onAnyCheck, members }) => {
    const options = members.map((m, i) => (
        <CustomCard  height={40} width={deviceWidth - 60} key={i}>
            <TouchableOpacity onPress={() => onCheck(i, !m.checked)}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Thumbnail style={{ height: 30, width: 30 }} source={ require('images/elder-01.png') } />
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