import React from 'react';
import Circle from './Circle';
import { Text } from 'react-native';

function getInitals(name) {
	return name.split(' ').map(n => n.substring(0, 1)).join('')
}

const Initial = ({ name = '', ...rest }) => (
    <Circle {...rest}>
        <Text style={{color: '#fff', fontSize: 20}}>
            {getInitals(name)}
        </Text>
    </Circle>
);

export default Initial;