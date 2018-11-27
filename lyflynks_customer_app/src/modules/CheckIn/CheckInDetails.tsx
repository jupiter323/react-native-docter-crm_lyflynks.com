import React from 'react';
import Screen from 'components/Screen';
import { View, Text, Alert } from 'react-native';
import { Thumbnail, CheckBox, Title, Subtitle } from 'native-base';
import {
    colorSwatch,
    deviceWidth
  } from 'styles/Theme';
import { Actions, InfoCard, Circle, Initial } from './components';
import { EditIcon, CalendarIcon, ClockIcon, ActivityLogIcon } from 'components/icons';
import { CustomCard } from './components/Cards';
import CheckInAPIs from './api';
import { connect } from 'react-redux';
import { cancelCheckIn } from './action';
import moment from 'moment';

const Member = ({ name }) => (
    <View style={{ padding : 16, alignItems: 'center' }}>
        <Initial name={name} />
        <Title style={{ color: colorSwatch.codGray }}>{name}</Title>
        <Subtitle style={{ color: colorSwatch.dustyGray }}>Elder</Subtitle>
    </View>
);

const RequestBy = ({ name, createdAt }) => (
    <CustomCard>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Subtitle style={{ color: colorSwatch.dustyGray }}>REQUESTED BY</Subtitle>
        </View>
        <View style={{ flex : 2, flexDirection: 'row', paddingTop: 8}}>
            <View style={{ flex:2, alignItems: 'flex-start', paddingLeft: 2, justifyContent: 'center', borderRightWidth: 2, borderColor: colorSwatch.bombayGray}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>{ name }</Subtitle>
            </View>
            <View style={{ flex:3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 16}}>
                <Subtitle style={{ color: colorSwatch.codGray }}>{moment(createdAt).format('MMMM D, YYYY')}</Subtitle>
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
        check_in_time: apiData.check_in_time,
    };
}

const tempId = 10;

class CheckInDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount = async () => {
        const { token, navigation } = this.props;
        const id = navigation.getParam('id', 10);
        const result = await CheckInAPIs.fetchCheckIn(id, token);
        console.log(JSON.stringify(result.data), 'result');
        this.setState({ data: getDataFromApi(result.data), result: result.data });
    }

    handleOnSubmit = () => {
        const { token, navigation } = this.props;
        navigation.replace('CheckInFormScreen', { data: this.state.result });
    }

    cancelCheckIn = () => {
        const { token, navigation } = this.props;
        const id = navigation.getParam('id', 10);
        this.props.cancelCheckIn(id, token);
        navigation.goBack();
    }

    handleOnCancel = () => {
        Alert.alert('Cancel', 'Are you sure?', [
            {text: 'Cancel', onPress: ()=> {  }},
            {text: 'Ok', onPress: ()=> {  this.cancelCheckIn() }}
        ]);
    }

    render() {
        const { data } = this.state;
        return (
            <Screen
                navigation={this.props.navigation}
                title="Check In Details"
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
                    text={moment(data.check_in_time).format('MMMM D, YYYY')} 
                />
                <InfoCard
                    field={4}
                    editable={false}
                    icon={<ClockIcon style={{}} />} 
                    text={moment(data.check_in_time).format('hh:mm A')} 
                />
                <RequestBy name={data.requested_member_name} createdAt={data.createdAt}/>
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

export default connect(mapStateToProps, mapDispatchToProp)(CheckInDetail);