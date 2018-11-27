import React from 'react';
import Circle from './Circle';
import { Text } from 'react-native';

const Initial = ({ name = '', ...rest }) => (
    <Circle {...rest}>
        <Text style={{color: '#fff', fontSize: 20}}>
            {name.substring(0, 1)}
        </Text>
    </Circle>
);

export default Initial;