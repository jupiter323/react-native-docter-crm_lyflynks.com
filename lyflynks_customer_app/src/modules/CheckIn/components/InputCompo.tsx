import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  AnyMemberCanComplete } from './Cards';
import { CheckBox, View, Input, Subtitle, Thumbnail, Switch, Label } from 'native-base';
import {
    colorSwatch,
    deviceWidth,
    colors,
  } from 'styles/Theme';
import Calendar from 'componentsLib/Calendar';
import Time  from 'componentsLib/TimeInput';
// import { colors } from 'react-native-elements';

export const CalendarItem = Calendar;
export const TimeItem = Time;


export const SelectMembers = ({ anyOneCanComplete, onCheck, title, onAnyCheck, members }) => {
    const options = members.map((m, i) => (
        <View style={{ paddingHorizontal: 32, backgroundColor: anyOneCanComplete || m.checked ? '#F7F4F0' : '#fff',  paddingVertical: 8, height: 50 }}>
            <TouchableOpacity onPress={() => onCheck(i, !m.checked)}>
                <View style={{ flexDirection: 'row', borderBottomWidth: anyOneCanComplete || m.checked ? 0 : 1.5, paddingBottom: 21, borderBottomColor: colorSwatch.bombayGray }}>
                    <View style={{ flex: 6, alignItems: 'flex-start' }}>
                        <Subtitle style={{ color: colors.black }}>{m.full_name}</Subtitle>
                    </View>
                    <View style={{flex:1, alignItems: 'flex-end' }}>
                        <CheckBox disabled={anyOneCanComplete} checked={anyOneCanComplete || m.checked} onPress={() => onCheck(i, !m.checked)} color={colorSwatch.caribbeanGreen} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    ));

    return (
        <View>
            <View style={{ alignItems: 'center', marginBottom : onAnyCheck ? 8 : 16 }}>
                <Text style={{ color: colorSwatch.persianGreen, fontWeight: 'bold' }}>
                    { title }   
                </Text>
            </View>
            {onAnyCheck && 
                <View style={{ padding: 8, paddingHorizontal: 16 }}>
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