import React from 'react';
import Screen from 'components/Screen';
import { View, Text } from 'react-native';
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

const Member = () => (
    <View style={{ padding : 16, alignItems: 'center' }}>
        <Thumbnail source={ require('images/elder-01.png') } />        
        <Title style={{ color: colorSwatch.codGray }}>Susan</Title>
        <Subtitle style={{ color: colorSwatch.dustyGray }}>Elder</Subtitle>
    </View>
);

const RequestBy = () => (
    <CustomCard>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Subtitle style={{ color: colorSwatch.dustyGray }}>REQUESTED BY</Subtitle>
        </View>
        <View style={{ flex : 2, flexDirection: 'row', paddingTop: 8}}>
            <View style={{ flex:2, alignItems: 'flex-start', paddingLeft: 2, justifyContent: 'center', borderRightWidth: 2, borderColor: colorSwatch.bombayGray}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>Rachel Mason</Subtitle>
            </View>
            <View style={{ flex:3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 16}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>August 2, 2018</Subtitle>
            </View>
        </View>
    </CustomCard>
);

const AnyMemberCanComplete = () => (
    <View style={{ flexDirection: 'row' }}>
        <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 8}}>
            <Subtitle style={{ color: colorSwatch.codGray }}>CHECK IN</Subtitle>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text>Any Member Can Complete</Text>
            <CheckBox checked color={colorSwatch.caribbeanGreen}/>
        </View>
    </View>
);

class CheckInDetail extends React.Component {

    componentDidMount = async () => {
        const { token, navigation } = this.props;
        const id = navigation.getParam('id', 1);
        const result = await CheckInAPIs.fetchCheckIn(id, token);
        console.log(result, 'result');
    }

    render() {
        return (
            <Screen
                navigation={this.props.navigation}
                title="Check In Details"
                back={true}
                >
                <Member />
                <View style={{ marginTop: 8, marginBottom: 8, alignItems: 'center' }}>
                    <ActivityLogIcon color={colorSwatch.bostonBlue} style={{}}  />
                    <Subtitle style={{ color: colorSwatch.bostonBlue }}>
                        CHECK IN COMPLETED
                    </Subtitle>
                </View>
                <AnyMemberCanComplete />
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
                <RequestBy />
                <Actions submitText="Update" />
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
    // }
});

export default connect(mapStateToProps, mapDispatchToProp)(CheckInDetail);