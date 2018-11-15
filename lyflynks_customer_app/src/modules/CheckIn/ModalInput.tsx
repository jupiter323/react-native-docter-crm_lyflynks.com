import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PrimeModal from 'components/PrimeModal';
import {
    deviceWidth,
    colorSwatch
  } from 'styles/Theme';
import { CloseIcon } from 'components/icons';

const Box = ({ onRequestClose, count, body, height = 300 }) => {
    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: 'row', height: 40, zIndex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <View style={{ zIndex: 10, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: colorSwatch.persianGreen }}>
                    <Text style={{ color: '#fff', fontSize: 14 }} >
                        {count}
                    </Text>
                </View>
            </View>
            <View style={{height, borderRadius: 10, backgroundColor: '#fff', width: deviceWidth - 60}}>
                <View style={{ alignSelf: 'flex-end', paddingRight: 16 }}>
                    <TouchableOpacity onPress={onRequestClose}>
                        <CloseIcon style={{ width: 15 }}/>
                    </TouchableOpacity> 
                </View>
                {body}
            </View>
        </View>
    );
};

const ModalInput = (props) => {
    const { visible, onRequestClose, } = props;
    return (<PrimeModal 
        modalVisible={visible}
        containerStyle={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-start',
            }}
            innerContainerStyle={{
            width: deviceWidth - 60,
            borderRadius: 10,
            backgroundColor: 'transparent',
            }}
        onRequestClose={onRequestClose}
        body={<Box {...props}/>}
    />);
}

export default ModalInput;
