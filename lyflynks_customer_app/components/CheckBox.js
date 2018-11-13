import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const CB_ENABLED_IMAGE = require('./cb_enabled.png');
const CB_DISABLED_IMAGE = require('./cb_disabled.png');

const Checkbox = ({ checked }) => {
    const image = checked ? <Image src={CB_ENABLED_IMAGE}/> : <Image src={CB_DISABLED_IMAGE}/>;
    return (
        <TouchableOpacity>
            {image}
        </TouchableOpacity>
    );
}

export default CheckBox;