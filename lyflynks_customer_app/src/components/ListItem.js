import React  from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import DoctorCard from '../components/doctorCard'
import CommonStyles from '../styles/CommonStyles';
import {
  fontFamily,
  fontSize,
  colorSwatch,
  colors
} from '../styles/Theme';
import AlertDialog from './styleguide/AlertDialog';
import SwipeoutButton from './SwipeoutButton';
import AlertDeleteDlMessage from './list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from './list-item/AlertDeleteDlTitle';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  EmergencyIcon,
  TransportIcon,
  HealthIcon,
  CompanionIcon,
} from './icons';

export default class ListItem extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    itemTitle: PropTypes.any,
    careerText: PropTypes.any,
    distanceText: PropTypes.number,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    onPressButton: PropTypes.func,
    isSpecial: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: false,
      slide: false,
      bgColorIconContainer: {}
    }
  }

  capitalizeText = (word) => {
    return word.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }


  prepareIcon = (action) => {
    let {type} = this.props
    let activity_icon, bgColor = null
    switch (type) {
      case 'medical_appointment':
        bgColor = {backgroundColor: colorSwatch.bostonBlue}
        activity_icon = <HealthIcon color='#fff' style={styles.icon}  />
        break;
      case 'transportation':
        bgColor = { backgroundColor: colorSwatch.edenBlue}
        activity_icon = <TransportIcon color='#fff' style={styles.icon} />
        break;
      case 'lawn_service':
        bgColor = {backgroundColor: colorSwatch.bombayGray}
        activity_icon = <CompanionIcon color='#fff' style={styles.icon} />
        break;
      case 'medication':
        bgColor = {backgroundColor: colorSwatch.persianGreen}
        activity_icon = <EmergencyIcon color='#fff' style={styles.icon} />
        break;
      case 'medical appointment':
        bgColor = {backgroundColor: colorSwatch.bostonBlue}
        activity_icon = <HealthIcon color='#fff' style={styles.icon} />
        break
      case 'lawncare':
        bgColor = {backgroundColor:  colorSwatch.bombayGray}
        activity_icon = <CompanionIcon color='#fff' style={styles.icon} />
        break;
      case 'emergency':
        bgColor = { backgroundColor: colorSwatch.caribbeanGreen }
        activity_icon = <EmergencyIcon color='#fff' style={styles.icon} />
        break;
      case 'check in':
        bgColor = { backgroundColor: colorSwatch.edenBlue }
        activity_icon = <CompanionIcon color='#fff' style={styles.icon} />
        break;
      default:
        bgColor = { backgroundColor: colorSwatch.bombayGray }
        activity_icon = <CompanionIcon color='#fff' style={styles.icon} />
    }
    if (action === 'icon') return activity_icon
    return bgColor
  }

  toogleSlide = () => {
    this.setState({ slide: !this.state.slide })
  }

  renderArrow = () => {
    let {type} = this.props
    if (type === 'medical appointment') {
      return (
      <Icon
        size={25}
        name={this.state.slide ? 'ios-arrow-down' :'ios-arrow-forward'}
          style={styles.moreBtn} onPress={()=> this.toogleSlide()}/>)
    } else {
      return null
    }
    if (action === 'icon') return activity_icon
    return bgColor
  }

  toogleSlide = () => {
    this.setState({ slide: !this.state.slide })
  }
  render() {
    let swipeBtns = [{
      component: <SwipeoutButton slide={this.state.slide}/>,
      onPress: () => {this.toggleAlertDeleteDialog(true)},
      backgroundColor: '#fff'
    }];


    return (
      <View>
        <Swipeout
          right={swipeBtns}
          buttonWidth={80}
          sensitivity={200}
          backgroundColor='#fff'
          >
          <View style={[CommonStyles.itemWhiteBox, {position: 'relative',}]}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={this.props.onPressButton}
            >
              <View style={styles.card}>
                <View style={styles.left}>
                  <View style={[styles.leftAva, this.prepareIcon('color')]}>
                    {this.prepareIcon('icon')}
                  </View>
                  <View style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5  }}>
                    <View style={styles.leftInfo}>
                      <Text style={styles.header}>{this.capitalizeText(this.props.type)}</Text>
                      <Text style={styles.subText}>{this.props.subText}</Text>
                      </View>
                      {
                        this.props.type === 'medical appointment' && this.state.slide?
                          <View style={styles.containerDoctorCard}>
                            <DoctorCard {...this.props} capitalizeText = {this.capitalizeText}/>
                          </View>
                          : null
                      }
                      {this.renderArrow()}
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </Swipeout>
        <AlertDialog
          modalVisible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
              visible: false,
            });
          }}
          dlTitle={{
            component: <AlertDeleteDlTitle
              text='Delete Activity'
            />
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText='Do you want delele this activity'
              highlightText='Activity'
              behindText='on list?'
            />
          }}
          dismissBtn={{
            text: 'Cancel',
            onPress: () => {this.toggleAlertDeleteDialog(false)},
          }}
          acceptBtn={{
            text: 'Done',
            onPress: () => {this.toggleAlertDeleteDialog(false)} ,
          }}
        />
      </View>
    );
  }

  // Hide ande show alert dialog
  toggleAlertDeleteDialog(visible) {
    this.setState({
      modalVisible: visible,
      visible: false,
    });
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden'
  },
  right: {
    width: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  leftAva: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    minHeight: 70,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  leftInfo: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  header: {
    marginTop: -5,
    color: colorSwatch.codGray,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
  },
  subText: {
    color: colorSwatch.bombayGray,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
     lineHeight: 20,
    marginTop: -5,
    textAlignVertical: 'top',
  },
  leftBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 23
  },
  leftBottomTxt: {
    paddingLeft: 6,
    color: colorSwatch.dustyGray,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  icon: {
    width: 30,
    height: 30,
  },
  ranking: {
    marginTop: -5,
    marginLeft: 5,
    fontSize: fontSize.header,
    color: colorSwatch.bostonBlue,
    fontFamily: fontFamily.regular,
  },
  specialCir: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 200,
  },
  moreBtn: {
    position: 'absolute',
    right: 8,
    top: 0,
    color: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  containerDoctorCard : {
    paddingLeft: 10,
    paddingVertical: 10
  }
});


