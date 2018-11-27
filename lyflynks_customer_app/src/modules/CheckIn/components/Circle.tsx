import React from 'react';
import { View, Text } from 'react-native';

const Circle = ({ size = 50, color = '#00A68C', children }) => (
    <View style={{ width: size, alignItems: 'center', justifyContent: 'center' , height: size, borderRadius: size / 2, backgroundColor: color }}>
        {/* <View style={{ flex: 1, }}> */}
            {children}
        {/* </View> */}
    </View>
);

export default Circle;