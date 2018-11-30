import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Input, BoundaryLine, DropdownMenu, Screen } from 'componentsLib';
import { colorSwatch } from 'styles/Theme';
import { Content } from "native-base";
import CommonStyles from 'styles/CommonStyles';
const stateMap = (store) => {
  const { member, member_account } = store.auth;
  const { errorMessage, invitationResponse } = store.email_invitations;
  return {
    ...store.creditCard,
    member,
    member_account,
    errorMessage,
    invitationResponse
  };
};

class AccountSettingsScreen extends React.Component {

  render() {
   
    return (
      <Screen
        navigation={this.props.navigation}
        title="ACCOUNT SETTINGS"
        back={true}
      >
        <Content>


          <View style={styles.containerStyle}>

            {/* name input start */}
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                <Input
                  style={[CommonStyles.InputNormalStatus, { marginLeft: 0 },]}
                // placeholder={InputFields.name.placeholder}
                // value={this.props[InputFields.name.id]}
                // onFocus={this.updateActive.bind(this, InputFields.name)}
                // style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.name.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.name.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                // onChangeText={this.updateInputFieldValue.bind(this, InputFields.name)}
                // onBlur={this.updateErrorMessage.bind(this, InputFields.name)}
                />

                <View style={styles.inputIconContainerStyle}>
                  {/* {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.name.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null} */}
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {/* {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? this.props.errors[InputFields.name.errorId] : null} */}
                </Text>
              </View>
            </View>
            {/* name input end */}


            <Text style={styles.fieldLabel}>PAYMENTS</Text>



            <BoundaryLine style={styles.boundaryLine} />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ marginLeft: -25 }}>
                <Text style={CommonStyles.fieldLabel}>VISA</Text>
              </View>

              <Text style={CommonStyles.fieldLabel}>...{this.props.cardNumber.substring(12)}</Text>
            </View>

            <TouchableOpacity
              onPress={()=>this.props.navigation.navigate("CreditCardUpdate")}
            >
              <Text style={styles.clickTxtStyle}>Update Credit Card</Text>
            </TouchableOpacity>

            <View style={styles.wrapperBox}></View>

            <Text style={styles.fieldLabel}>ACCOUNT CALL ORDER</Text>

            <BoundaryLine style={styles.boundaryLine} />


            <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('CallOrder')}
            >
              <Text style={styles.clickTxtStyle}>Update Call Order</Text>
            </TouchableOpacity>

            <View style={styles.wrapperBox}></View>

            <Text style={styles.fieldLabel}>ACCOUNT STATUS</Text>

            <BoundaryLine style={styles.boundaryLine} />

            <TouchableOpacity
              onPress={()=>{this.deactivateAccount()}}
            >
              <Text style={styles.clickTxtStyle}>Deactivate Account</Text>
            </TouchableOpacity>
          </View>

        </Content>
      </Screen>
    );
  }
  deactivateAccount(){
    alert("Do you want deactivate your account?")
    
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 10

  },
  boundaryLine: {
    marginHorizontal: 25,
    width: '100%',
    marginTop: 15,
  },
  clickTxtStyle: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    color: colorSwatch.bostonBlue
  },
  inputIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 4,
  },
  inputIconStyle: {
    width: 20,
    height: 20,
    zIndex: 100
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '100%'
  },
  inputSubContainer: {
    width: '100%',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 10,
    marginTop: 5,
    marginBottom: 10
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 0
  },
  fieldLabel: {
    width: '100%',
    textAlign: "left",
    fontSize: 15,
    marginTop: 10,
    zIndex: 0,
    color: '#000'
  },
  wrapperBox: {
    margin: 10
  }
});

// export default connect(stateMap,{ sendAccountInvite })(MemberInviteScreen);

export default connect(stateMap)(AccountSettingsScreen);

