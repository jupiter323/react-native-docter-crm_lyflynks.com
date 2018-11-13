import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import { EditIcon, CalendarIcon, ClockIcon } from '../../components/icons';
import ModalInput from './ModalInput';
import {
    colorSwatch, deviceWidth,
  } from '../../styles/Theme';
import { InputNotes, SelectMembers, Notes, MemberCard, AnyMemberCanComplete, InfoCard, Actions } from './components';
import { CalendarItem, TimeItem } from './components/InputCompo';
import moment from 'moment';
import { getHoursAndMinutes } from './util';
import { connect } from 'react-redux';
import CheckInAPIs from '../../api/lib/check_in';
import { checkIn } from '../../actions/check_in';
import { NavigationActions, StackActions } from 'react-navigation';

const fakeMembers = [
    {
        "full_name": "Billy Jones",
        "email": "billy@bobjones.com"
    },
    {
        "full_name": "JP Ritchardson",
        "email": "jp@gmail.com"
    }
];

function getDateString (markedDates = {}) {
    const date = Object.keys(markedDates)[0];
    return date ? moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY') : 'Please Select a date';
}

function getTwoDigitNumber(num) {
    return num > 9 ? num: `0${num}`;
}

function getTimeString (time) {
    const [hrs, min, pm] = getHoursAndMinutes(time);
    return `${getTwoDigitNumber(hrs)}:${getTwoDigitNumber(min)} ${pm ? 'PM': 'AM'}`;
}

class CheckInForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            visible: false, 
            count: 1, 
            checkInFormObj: {},
            elders: [],
            members: [],
        };
    }

    componentDidMount = async () => {
      // TODO: fetch Elders
      // TODO: fetch Members
        const token = this.props.token;
        this.fetchMembers(token);
        this.fetchElders(token);
    }

    fetchMembers = async (token) => {
        const response = await CheckInAPIs.fetchMembers(token);
        const filteredMembers = response.data.filter((a, i) => i < 2).map(a => ({ full_name: a.fname + '' + a.lname, email: a.email }));
        const members = filteredMembers.length === 1 ? filteredMembers.map(m => ({...m, checked: true})) : filteredMembers;
        this.setState({ members });
    }

    fetchElders = async (token) => {
        const response = await CheckInAPIs.fetchElders(token);
        console.log(response, 'response');
        const elders = response.data.length === 1 ? response.data.map(e => ({ ...e, checked: true})) : response.data;
        this.setState({ elders: elders.length > 0 ? elders : fakeMembers, visible: true });
    }
    

    handleOnRequestClose = () => {
        this.setState({ visible: false });
    }

    handleOnSubmit = () => {
        const { elders, notes, members, anyOneCanComplete, markedDates, time } = this.state;
        const selectedDate = Object.keys(markedDates)[0];
        const [hrs, mins, pm] = getHoursAndMinutes(time);
        const checkin_time = moment(`${selectedDate} ${hrs}:${mins} ${pm ? 'PM': 'AM'}`, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
        const payload = {
            elder_names: elders.map(e => e.full_name),
            anybody_flag: anyOneCanComplete ? 't' : 'f',
            requested_member_names: members.filter(m => m.checked).map(m => m.full_name),
            note: notes,
            checked_in_with_elder_names: elders.filter(e => e.checked).map(e => e.full_name),
            created_by_id: 2,
            updated_by_id: 2,
            checkin_time,
            publish_to_app: true
        };

        this.props.checkIn(payload, this.props.token, ()=> {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'ActivityLogScreen'
                    })
                ]
            })
            this.props.navigation.dispatch(resetAction);
        });
    }

    handleOnCancel = () => {
        this.props.navigation.goBack();
    }

    handleOnEdit = (count) => {
        this.setState({ visible: true, count });
    }

    render() {
        const { visible, anyOneCanComplete, count, elders, members, notes, markedDates, time } = this.state;

        return (
            <Screen 
                navigation={this.props.navigation}
                title="Check In"
                back={true}
                >
                <View style={{ width: deviceWidth - 30 }}>
                    <MemberCard
                        field={1}
                        editable={elders.length > 1}
                        message="Please Select Elders"
                        type="Elder"
                        members={elders.filter(e => e.checked)} 
                        onEdit={this.handleOnEdit}
                    />
                    {anyOneCanComplete ? <AnyMemberCanComplete checked={true} /> : <MemberCard
                        field={2}
                        editable={members.length > 1}
                        message="Please Select Members"
                        type="Member"
                        members={members.filter(e => e.checked)} 
                        onEdit={this.handleOnEdit}
                    />}
                    {/*  */}
                    <InfoCard
                        field={3}
                        onEdit={this.handleOnEdit}
                        icon={<CalendarIcon style={{}} />} 
                        text={getDateString(markedDates)} 
                    />
                    <InfoCard
                        field={4}
                        onEdit={this.handleOnEdit} 
                        icon={<ClockIcon style={{}} />} 
                        text={getTimeString(time)} 
                    />                    
                    <Notes 
                        onEdit={this.handleOnEdit}
                        notes={notes}
                        field={5}
                    />
                    <Actions
                        onSubmit={this.handleOnSubmit}
                        onCancel={this.handleOnCancel}
                    />
                </View>
                <ModalInput
                    visible={visible}
                    count={count}
                    height={count === 3 ? 400 : 300}
                    onRequestClose = {this.handleOnRequestClose}
                    body={this.renderBody()}
                    />
            </Screen>
        );
    }

    handleOnNext = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            if (this.state.count > 5) {
                this.setState({ visible: false });
            }
        });
    }

    handleOnBack = () => {
        this.setState({ count: this.state.count - 1 }, () => {
            if (this.state.count === 0) {
                this.setState({ visible: false });
            }
        });
    }

    handleOnDateChange = (markedDates) => {
        this.setState({ markedDates });
    }

    handleOnTimeChange = (time) => {
        this.setState({ time });
    }

    handleOnNoteChange = (notes) => {
        console.log(notes, 'notes');
        this.setState({ notes });
    }

    handleOnMemberCheck = (index, checked) => {
        const members = this.state.members.map((m, i) => {
            if (i === index) return { ...m, checked };
            return m;
        });
        this.setState({ members });
    }

    handleOnElderCheck = (index, checked) => {
        const elders = this.state.elders.map((e, i) => {
            if (i === index) return { ...e, checked };
            return e;
        });
        this.setState({ elders });
    }

    handleOnAnyCheck = (anyOneCanComplete) => {
        this.setState({anyOneCanComplete});
    }

    renderOption = () => {
        switch(this.state.count) {
            case 1:
                return <SelectMembers 
                    title="Select Elders" 
                    members={this.state.elders}
                    onCheck={this.handleOnElderCheck} 
                    />;
            case 2:
                return <SelectMembers 
                    title="Select Members"
                    onAnyCheck={this.handleOnAnyCheck}
                    anyOneCanComplete={this.state.anyOneCanComplete}
                    members={this.state.members}
                    onCheck={this.handleOnMemberCheck} 
                    />;
            case 3:
                return <CalendarItem 
                    markedDates={this.state.markedDates} 
                    title="Select Date" 
                    onDateChange={this.handleOnDateChange} 
                    />;
            case 4:
                return <TimeItem 
                    title="Select Time"
                    value={this.state.time}
                    onChange={this.handleOnTimeChange} 
                />;
            default:
                return <InputNotes
                    notes={this.state.notes}
                    onNoteChange={this.handleOnNoteChange} 
                    title="Notes" 
                />;
        }
    }

    renderBody = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex : 4}}>
                {this.renderOption()}
                </View>
                <View style={{ flex : 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button title="Back" onPress={this.handleOnBack} />
                    </View>
                    <View style={{flex: 1}}>
                        <Button title="Next" onPress={this.handleOnNext} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.member_account.data
});

const mapDispatchToProp = (dispatch) => ({
    checkIn(...params) {
        dispatch(checkIn(...params));
    }
});

export default connect(mapStateToProps, mapDispatchToProp)(CheckInForm);
