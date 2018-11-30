import React from 'react';
import Screen from 'components/Screen';
import { View, Text, Alert } from 'react-native';
import { Thumbnail, CheckBox, Title, Subtitle } from 'native-base';
import {
    colorSwatch,
    deviceWidth
  } from 'styles/Theme';
import { Actions, InfoCard } from './components';
import { EditIcon, CalendarIcon, ClockIcon, ActivityLogIcon } from 'components/icons';
import { CustomCard } from './components/Cards';
import CheckInAPIs from './api';
import { connect } from 'react-redux';
import { cancelCheckIn } from './action';

const Member = ({ name }) => (
    <View style={{ padding : 16, alignItems: 'center' }}>
        <Thumbnail source={ require('images/elder-01.png') } />        
        <Title style={{ color: colorSwatch.codGray }}>{name}</Title>
        <Subtitle style={{ color: colorSwatch.dustyGray }}>Elder</Subtitle>
    </View>
);

const RequestBy = ({ name }) => (
    <CustomCard>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Subtitle style={{ color: colorSwatch.dustyGray }}>REQUESTED BY</Subtitle>
        </View>
        <View style={{ flex : 2, flexDirection: 'row', paddingTop: 8}}>
            <View style={{ flex:2, alignItems: 'flex-start', paddingLeft: 2, justifyContent: 'center', borderRightWidth: 2, borderColor: colorSwatch.bombayGray}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>{ name }</Subtitle>
            </View>
            <View style={{ flex:3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 16}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>August 2, 2018</Subtitle>
            </View>
        </View>
    </CustomCard>
);

const AnyMemberCanComplete = ({ checked }) => (
    <View style={{ flexDirection: 'row' }}>
        <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 8}}>
            <Subtitle style={{ color: colorSwatch.codGray }}>CHECK IN</Subtitle>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text>Any Member Can Complete</Text>
            <CheckBox checked={checked} color={colorSwatch.caribbeanGreen}/>
        </View>
    </View>
);

function getDataFromApi(apiData) {
    return {
        elder_name: apiData.elder_names[0],
        anybody_flag: apiData.anybody_flag,
        requested_member_name: apiData.requested_member_names[0] || apiData.checked_in_with_elder_names[0],
        note: apiData.note,
    };
}

const tempId = 10;

class TransportationDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount = async () => {
        const { token, navigation } = this.props;
        // const id = navigation.getParam('id', 10);
        const result = await CheckInAPIs.fetchCheckIn(tempId, token);
        console.log(JSON.stringify(result.data), 'result');
        this.setState({ data: getDataFromApi(result.data) });
    }

    handleOnSubmit = () => {
        const { token, navigation } = this.props;
        navigation.replace('TransportationFormScreen', { data: this.state.data });
    }

    cancelCheckIn = () => {
        const { token, navigation } = this.props;
        this.props.cancelCheckIn(tempId, token);
        navigation.goBack();
    }

    handleOnCancel = () => {
        Alert.alert('Cancel', 'Are you sure?', [
            {text: 'Cancel', onPress: ()=> {  }},
            {text: 'Ok', onPress: ()=> {  this.cancelCheckIn() }}
        ])
    }

    render() {
        const { data } = this.state;
        return (
            <Screen
                navigation={this.props.navigation}
                title="Transportation Details"
                back={true}
                >
                <Member name={data.elder_name}/>
                <View style={{ marginTop: 8, marginBottom: 8, alignItems: 'center' }}>
                    <ActivityLogIcon color={colorSwatch.bostonBlue} style={{}}  />
                    <Subtitle style={{ color: colorSwatch.bostonBlue }}>
                        CHECK IN COMPLETED
                    </Subtitle>
                </View>
                <AnyMemberCanComplete checked={data.anybody_flag} />
                <View style={{ marginTop: 8 }}>

                </View>
                <InfoCard
                    field={3}
                    editable={false}
                    icon={<CalendarIcon style={{}} />} 
                    text={'August 8, 2018'} 
                />
                <InfoCard
                    field={4}
                    editable={false}
                    icon={<ClockIcon style={{}} />} 
                    text={'05:40 PM'} 
                />
                <RequestBy name={data.requested_member_name}/>
                <Actions 
                    onSubmit={this.handleOnSubmit} 
                    submitText="Update"
                    onCancel={this.handleOnCancel}
                />
            </Screen>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.member_account.data
});

const mapDispatchToProp = (dispatch) => ({
    // checkIn(...params) {
    //     dispatch(checkIn(...params));
    // },
    cancelCheckIn(params) {
        dispatch(cancelCheckIn(params));
    }
});

export default connect(mapStateToProps, mapDispatchToProp)(TransportationDetails);