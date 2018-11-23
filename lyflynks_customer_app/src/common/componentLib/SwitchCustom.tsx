import React from 'react';
import { View, StyleSheet } from 'react-native';
import { deviceWidth, colorSwatch } from 'styles/Theme';
import { Switch as InnerSwtich } from 'react-native-switch';
const styles = StyleSheet.create({
    switchInactiveContainer: {
        position: 'absolute',
        height: 36.5,
        width: 62,
        top: 0.5,
        right: 0,
        borderRadius: 17.5,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2
    },

    notificationContainer: {
        flexDirection: 'row',
        width: 62,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 1,
    }
});

const SwitchCustom = ({ ...props }) => (
    <View style={styles.notificationContainer}>
        {!props.value ? <View style={styles.switchInactiveContainer}></View> : null}
        < InnerSwtich
            barHeight={35}
            circleBorderWidth={0}
            circleActiveBorderColor={colorSwatch.persianGreen}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            backgroundInactive={'white'}
            backgroundActive={colorSwatch.persianGreen}
            switchLeftPx={2.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2.5}
            innerCircleStyle={{
                borderWidth: props.value ? 0 : 1.5,
                borderColor: '#CBCBCB'
            }} // style for inner animated circle for what you (may) be rendering inside the circle
            {...props}
        />
    </View>
);

export default SwitchCustom;