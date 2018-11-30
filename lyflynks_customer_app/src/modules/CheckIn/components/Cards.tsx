import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { EditIcon } from 'components/icons';
import Button from 'componentsLib/Button';
import { Card, CheckBox, Title, Subtitle, Thumbnail } from 'native-base';
import {
    colorSwatch,
    deviceWidth
  } from 'styles/Theme';
import { Initial } from '.';
// import CustomCard from 'componentsLib/Card';

export const CustomCard = ({ children, height = 70 }) => (
    <Card style={{ height, padding: 8 }}>
        { children }
    </Card>
);

export const Actions = ({ onSubmit, onCancel, submitText = 'Submit' }) => (
    <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <View style={{flex: 1}}>
            <Button onPress={onSubmit} primary title={submitText} />
        </View>
        <View style={{flex: 1}}>
            <Button onPress={onCancel} title="Cancel" />
        </View>
    </View>
);

const Edit = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <EditIcon style={{height: 20}} color={colorSwatch.caribbeanGreen}  />
    </TouchableOpacity>
);

export const AnyMemberCanComplete = ({ checked, onCheck }) => (
    <View style={{ height: 60, alignItems: 'center', flexDirection: 'row', padding: 8 }}>
        <View style={{ flex: 5, alignItems: 'flex-start' }}>
            <Subtitle style={{ color: colorSwatch.codGray }}>
                Any Member Can Complete
            </Subtitle>
        </View>
        <View style={{ flex:1, alignItems : 'flex-end', paddingRight: 8}}>
            <CheckBox onPress={() => onCheck(!checked)} checked={checked} color={colorSwatch.caribbeanGreen} />
        </View>
    </View>
);

export const MemberCard = ({ onEdit, editable = true, field, members, type, message }) => {
    if (members.length === 0) {
        return (
            <CustomCard>
                <TouchableOpacity onPress={() => onEdit(field)} style={{flex: 1}}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 2 }}>
                        <Initial name={'Lyf Lynks'} />
                    </View>
                    <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Subtitle style={{ color: colorSwatch.codGray }}>{message}</Subtitle>
                        {/* <Subtitle style={{ color: colorSwatch.dustyGray }}>{type}</Subtitle> */}
                    </View>
                    {editable && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 8 }}>
                        <Edit onPress={() => onEdit(field)} />
                    </View>}
                </View>
                </TouchableOpacity>
            </CustomCard>
        );
    }

    return members.map(m => (
        <CustomCard key={m.email}>
            <TouchableOpacity onPress={() => onEdit(field)} style={{flex: 1}}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 2 }}>
                    <Initial name={m.full_name} />
                </View>
                <View style={{ flex: 5, alignItems: 'flex-start' }}>
                    <Title style={{ color: colorSwatch.codGray }}>{m.full_name}</Title>
                    <Subtitle style={{ color: colorSwatch.dustyGray }}>{type}</Subtitle>
                </View>
                {editable && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 8 }}>
                    <Edit onPress={() => onEdit(field)} />
                </View>}
            </View>
            </TouchableOpacity>
        </CustomCard>
    ));
}

export const InfoCard = ({ icon, text, field, onEdit = () => {}, editable = true }) => (
    <CustomCard height={40}>
        <TouchableOpacity style={{flex: 1}} onPress={() => onEdit(field)}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ width: 40, borderRightWidth: 2, borderColor: colorSwatch.bombayGray }}>
                {icon}
            </View>
            <View style={{ flex: 5, paddingLeft: 16, alignItems: 'flex-start' }}>
                <Subtitle style={{ color: colorSwatch.codGray }}>{text}</Subtitle>
            </View>
            {editable && <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 8 }}>
                <Edit onPress={() => onEdit(field)} />
            </View>}
        </View>
        </TouchableOpacity>
    </CustomCard>
);

export const Notes = ({ notes, onEdit, field }) => (
    <CustomCard height={100}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onEdit(field)}>
        <View style={{flex : 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Title style={{color: colorSwatch.caribbeanGreen}} >Notes</Title>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 8 }}>
                <Edit onPress={() => onEdit(field)} />
            </View>
        </View>
        <View style={{flex : 2, alignItems: 'flex-start'}}>
            <Subtitle style={{color: colorSwatch.dustyGray}} >
                {notes}
            </Subtitle>
        </View>
        </TouchableOpacity>
    </CustomCard>
);