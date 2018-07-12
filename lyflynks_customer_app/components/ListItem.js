import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';
import Swipeout from 'react-native-swipeout';

import CommonStyles from '../styles/CommonStyles';
import {
  fontFamily,
  fontSize,
  colorSwatch,
} from '../styles/Theme';
import AlertDialog from './styleguide/AlertDialog';
import SwipeoutButton from './SwipeoutButton';
import AlertDeleteDlMessage from './list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from './list-item/AlertDeleteDlTitle';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: false,
    }
  }

  render() {
    let swipeBtns = [{
      component: <SwipeoutButton />,
      onPress: () => {this.toggleAlertDeleteDialog(true)}
    }];

    return (
      <View>
        <Swipeout
          right={swipeBtns}
          buttonWidth={100}
          backgroundColor= 'transparent'>
          <View style={[CommonStyles.itemWhiteBox, {position: 'relative'}]}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={this.props.onPressButton}
            >
              <View style={styles.card}>
                <View style={styles.left}>
                  <View style={styles.leftAva}>
                    <Image
                      source={this.props.image.url}
                      style={{width: this.props.image.width, height: this.props.image.height}}
                    />
                    {
                      (() => {
                        if (this.props.isSpecial && false) {
                          return (
                            <LinearGradient
                              start={{x: 0.4, y: 0.5}} end={{x: 1.0, y: 1.0}}
                              colors={['rgb(255,111,111)', 'rgb(255,35,35)']}
                              style={styles.specialCir} />
                          )
                        }
                      })()
                    }
                  </View>
                  <View style={styles.leftInfo}>
                    <Text style={styles.header}>{this.props.header}</Text>
                    <Text style={styles.subText}>{this.props.subText}</Text>
                    <View style={styles.leftBottom}>
                      {/* <Image
                        source={require('../assets/images/placeholder.png')}
                        style={{width: 13, height: 16}}
                      /> 
                      <Text style={styles.leftBottomTxt}>{this.props.bottomText} km away</Text> */}
                    </View>
                  </View>
                </View>
                {/* <View style={styles.right}>
                  <Image
                    source={require('../assets/images/star.png')}
                    style={{width: 16, height: 15.3}}
                  /> 
                  <Text style={styles.ranking}>5.0</Text>
                </View> */}
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
              text='Delete Doctor'
            /> 
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText='Do you want delele doctor'
              highlightText='Jose Holland'
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
    padding: 15,
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
    position: 'relative',
    width: 70,
    height: 70
  },
  leftInfo: {
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
    lineHeight: 23,
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
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

ListItem.propTypes = {
  imageUrl: PropTypes.number,
  itemTitle: PropTypes.string,
  careerText: PropTypes.string,
  distanceText: PropTypes.number,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  onPressButton: PropTypes.func,
  isSpecial: PropTypes.bool,
};
