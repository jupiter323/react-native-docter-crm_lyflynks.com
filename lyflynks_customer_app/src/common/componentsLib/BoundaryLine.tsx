
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { deviceWidth, colorSwatch } from 'styles/Theme';

const styles = StyleSheet.create({
    lineStyle:{        
        margin: 0,
        backgroundColor:colorSwatch.bombayGray,
        height:1.5
    }
})
const BoundaryLine = ({...props})=>(
    <View style={[styles.lineStyle,props.style]}>        
    </View>
)
export default BoundaryLine;