import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CheckBox } from 'native-base';
import Screen from 'components/Screen';
import CheckInAPIs from '../CheckIn/api';
import { MemberCard } from '../CheckIn/components/Cards';
import CommonStyles from 'styles/CommonStyles';
import GradientNavigationBar from 'components/GradientNavigationBar';
import { EditIcon } from 'components/icons';
import Button from 'componentsLib/Button';
import { eldersSelected } from './action';
import {
    colorSwatch,
    fontSize,
    fontFamily
  } from 'styles/Theme';
import colors from "styles/colors";
import _ from 'lodash'

class SelectElders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elders: []
    }
  }

  componentDidMount = async () => {
    const token = this.props.token;
    this.fetchElders(token);
  }

  fetchElders = async (token) => {
    const response = await CheckInAPIs.fetchElders(token);
    this.setState({ elders: response.data });
  }

  onElderSelect = (elder) => {
    const { dispatch } = this.props;

    let elderNames = this.props.selectedElders.slice(0);
    elderNames.push(elder.full_name);

    dispatch(eldersSelected(_.uniq(elderNames)));
  }

  onContinuePressed = () => {
    const { dispatch } = this.props;

    this.props.navigation.navigate('TransportDateSelect');
  }

  render() {
    return (
        <View style={styles.container}>
          <GradientNavigationBar
            navigation={this.props.navigation}
            titleText='Select Passengers'
            back={true}
            />

          <View style={styles.table}>
            { this.state.elders.map(elder => (
              <TouchableOpacity style={styles.row} onPress={() => this.onElderSelect(elder)} key={elder.account_id}>
                <View>
                  <Text key={elder.account_id} style={styles.title}>{elder.full_name}</Text>
                </View>

                <View style={styles.checkBox}>
                  <CheckBox onPress={() => this.onElderSelect(elder)} checked={_.includes(this.props.selectedElders, elder.full_name)} color={colorSwatch.caribbeanGreen} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <Button primary title='Continue' disabled={this.props.selectedElders.length == 0} onPress={() => this.onContinuePressed()} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
		fontSize: fontSize.medium,
		paddingTop: 0,
		color: colorSwatch.codGray,
		fontFamily: fontFamily.medium,
    height: 20
  },
  checkBox: {
		flex: 1,
		alignItems: 'flex-end'
  },
  row: {
		flex: 1,
		flexDirection: 'row',
    paddingVertical: 50,
    paddingHorizontal: 20,
		alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colorSwatch.codGray
  },
  container: {
		padding: 0,
		backgroundColor:'white',
    flex: 1,
    flexDirection: 'column'
  },
  table: {
    marginBottom: 50
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.member_account.data,
    selectedElders: state.transport.selectedElders
  };
};

export default connect(mapStateToProps, null)(SelectElders);
