import * as React from 'react';
import { Text } from 'react-native';
import { View, Switch, Label } from 'native-base';
import { Slider } from 'react-native-elements';

function getHoursAndMinutes(val = '') {
    const [hrs, mins, pm] = val.split(',');
    return [+hrs || 0, +mins || 0, pm == 'true' ? true : false];
}

const SliderWithTitle = ({ title, ...rest }) => (
    <React.Fragment>
        <Text style={{fontSize:16, color:'#000'}}>{title}</Text>
        <Slider
            minimumTrackTintColor="#00A68C"
            maximumTrackTintColor="#d3d3d3"
            thumbStyle={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#1a9274' }}
            {...rest}
        />
    </React.Fragment>
);

function getTwoDigit (text) {
    return +text < 10 ? `0${text}` : text;
}

const TimeBox = ({ text }) => (
    <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d3d3d3' , borderRadius: 2}}>
        <Text style={{ fontSize: 20 }}> { getTwoDigit(text) } </Text>
    </View>
);

const DisplayTime = ({ hours, minutes }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TimeBox text={hours} />
        <View style={{ height: 30, width: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>:</Text>
        </View>
        <TimeBox text={minutes} />      
    </View>
);

class TimeInput extends React.PureComponent {
    
    handleOnValueChange = (val, type) => {
        const { value, onChange } = this.props;
        const [ hrs, min, pm ] = getHoursAndMinutes(value);
        if (type === 'hrs') {
            onChange(`${val},${min},${pm}`);
        } else if (type === 'min') {
            onChange(`${hrs},${val},${pm}`);
        } else {
            onChange(`${hrs},${min},${val}`);
        }
    }
    
    render() {
        const { value } = this.props;
        const [hrs, mins, pm] = getHoursAndMinutes(value);
        return (
            <View style={{flex: 1, padding: 20}}>  
                <View style={{ flex: 1 }}>
                    <DisplayTime 
                        hours={hrs}
                        minutes={mins}
                    />
                </View>
                <View style={{ flex: 4}}>
                    <SliderWithTitle
                        title="Hours"
                        onValueChange={(val) => this.handleOnValueChange(val, 'hrs')} 
                        step={1}
                        maximumValue={12}
                        value={hrs}
                    />
        
                    <SliderWithTitle
                        title="Minutes" 
                        step={1}
                        onValueChange={(val) => this.handleOnValueChange(val, 'min')}
                        maximumValue={60}
                        value={mins}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center'  }}>
                        <Label>
                            PM
                        </Label>
                        <Switch value={pm} onValueChange={(val) => this.handleOnValueChange(val, 'pm')} />
                    </View>
                </View>
            </View>
        );
    }
}

export default TimeInput;