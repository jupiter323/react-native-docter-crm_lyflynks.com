import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        // borderWidth: 1,
        borderRadius:5,
        // borderColor: '#bbb',
        borderBottomWidth: 0,
        // shadowColor: '#222',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        padding: 4,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 60,
        width: 300
    }
});

const Card = ({ children, height, style }) => (
    <View style={styles.card}>
        { children }
    </View>
);

export default Card;