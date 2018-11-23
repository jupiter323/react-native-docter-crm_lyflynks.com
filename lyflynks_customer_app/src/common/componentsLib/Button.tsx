import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {
    colorSwatch
  } from 'styles/Theme';

const Button = ({ title, primary, ...rest }) => (
    <TouchableOpacity  style={{ alignItems: 'center', flex: 1, flexDirection: 'row', paddingHorizontal: 16 }} {...rest}>
        <View 
            style={{ height: 35, flex: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: primary ? colorSwatch.persianGreen : colorSwatch.indianKhaki }}>
            <Text style={{ color: colorSwatch.white }}>
                {title}
            </Text>
        </View>
    </TouchableOpacity>
);

export default Button;