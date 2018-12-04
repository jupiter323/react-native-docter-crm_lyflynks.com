import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Content } from 'native-base';
import { Screen, Input, Button } from 'componentsLib';
import Stripe from 'react-native-stripe-api'
import { STRIPE_API_KEY } from './apiKey';
import { colorSwatch, deviceWidth } from 'styles/Theme';
import CommonStyles from 'styles/CommonStyles';
import InputFields from "./inputFieldsConfig";
import { validator, mmyyValidator } from "util/validator";
import CloseIcon from 'components/icons/CloseIcon';
import Check from 'components/icons/Check';
import {
  updateMemberFormField,
  updateErrorMessage,
  updateInputStatus,
  ERROR_STATUS,
  SUCCESS_STATUS,
  NORMAL_STATUS,
  ACTIVE_STATUS
} from './action'
const mapStateToProps = state => {
  return { ...state.creditCard };
};
class CreditCardForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: "5200828282828210",
      expmonth: "09",
      expyear: "19",
      cvc: "111",

      custommer_id: "test_custommer",
      firstname: "",
      lastname: "",
      token_id: "",
    }
  }

  addCard() {

    if (this.disableSaveButton()) {
      for (let inputField of InputFields)
        this.updateErrorMessage(inputField);
      return;
    }
    else
      this.getStripToken();
  }

  getStripToken() {
    const client = new Stripe(STRIPE_API_KEY);
    let cardnumber = this.props[InputFields[3].id].trim();
    let expmonth = this.props[InputFields[4].id].split("/", 2)[0];
    let expyear = this.props[InputFields[4].id].split("/", 2)[1];
    let cvc = this.props[InputFields[5].id]
    const tokenFormData = {
      number: cardnumber,
      exp_month: expmonth,
      exp_year: expyear,
      cvc: cvc
    }
    const token = client.createToken(tokenFormData).then((res) => {
      if (res.id)
        alert("Success as: "+JSON.stringify(res.id));
      else
        alert("Info is incorrect!")
      console.log(res);
    }).catch((error) => console.log("error", error));

    // Create a new customer and link your new card
    // const customer = await client.createCustomer(token.id, 'don.vetal@gmail.com', '<Your user ID>', 'John', 'Doe');

    // Create charge, 1 USD
    // const charge = await client.createCharge(1 * 100, customer.id, 'Payment example','USD');
  }

  render() {
    return (
      <Screen
        navigation={this.props.navigation}
        title="UPDATE PAYMENT"
        back={true}
      >

        <Content >
          <View style={styles.containerStyle}>
            {/* name input start */}
            <View key={InputFields[0].id} style={styles.inputContainer}>
              <View key={InputFields[0].id} style={styles.inputSubContainer}>
                <Input
                  placeholder={InputFields[0].placeholder}
                  value={this.props[InputFields[0].id]}
                  onFocus={this.updateActive.bind(this, InputFields[0])}
                  style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[0].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[0].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[0].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                  onChangeText={this.updateInputFieldValue.bind(this, InputFields[0])}
                  onBlur={this.updateErrorMessage.bind(this, InputFields[0])}
                />

                <View style={styles.inputIconContainerStyle}>
                  {this.props.inputStatus[InputFields[0].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[0].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {this.props.inputStatus[InputFields[0].statusId] == ERROR_STATUS ? this.props.errors[InputFields[0].errorId] : null}
                </Text>
              </View>
            </View>
            {/* name input end */}


            {/* phone and zip input start */}
            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <View key={InputFields[1].id} style={styles.inputContainer}>
                  <View key={InputFields[1].id} style={styles.inputSubContainer}>
                    <Input //phone number input          
                      placeholder={InputFields[1].placeholder}
                      value={this.props[InputFields[1].id]}
                      onFocus={this.updateActive.bind(this, InputFields[1])}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[1].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[1].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[1].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields[1])}
                      onBlur={this.updateErrorMessage.bind(this, InputFields[1])}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields[1].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[1].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields[1].statusId] == ERROR_STATUS ? this.props.errors[InputFields[1].errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowSubContainerRight}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputSubContainer}>
                    <Input //zip code input        
                      placeholder={InputFields[2].placeholder}
                      value={this.props[InputFields[2].id]}
                      onFocus={this.updateActive.bind(this, InputFields[2])}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[2].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[2].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[2].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields[2])}
                      onBlur={this.updateErrorMessage.bind(this, InputFields[2])}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields[2].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[2].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields[2].statusId] == ERROR_STATUS ? this.props.errors[InputFields[2].errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* phone and zip input end */}
            <View style={CommonStyles.wrapperBox} />


            {/* card number input start */}
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                <Input // card number input
                  placeholder={InputFields[3].placeholder}
                  value={this.props[InputFields[3].id]}
                  onFocus={this.updateActive.bind(this, InputFields[3])}
                  style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[3].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[3].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[3].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                  onChangeText={this.updateInputFieldValue.bind(this, InputFields[3])}
                  onBlur={this.updateErrorMessage.bind(this, InputFields[3])}
                />

                <View style={styles.inputIconContainerStyle}>
                  {this.props.inputStatus[InputFields[3].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[3].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {this.props.inputStatus[InputFields[3].statusId] == ERROR_STATUS ? this.props.errors[InputFields[3].errorId] : null}
                </Text>
              </View>
            </View>
            {/* card number input end */}


            {/* MM/YY  and CVV input start */}
            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputSubContainer}>
                    <Input // MM/YY number input          
                      placeholder={InputFields[4].placeholder}
                      value={this.props[InputFields[4].id]}
                      onFocus={this.updateActive.bind(this, InputFields[4])}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[4].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[4].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[4].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields[4])}
                      onBlur={this.updateErrorMessage.bind(this, InputFields[4])}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields[4].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[4].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields[4].statusId] == ERROR_STATUS ? this.props.errors[InputFields[4].errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowSubContainerRight}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputSubContainer}>
                    <Input //CVV code input        
                      placeholder={InputFields[5].placeholder}
                      value={this.props[InputFields[5].id]}
                      onFocus={this.updateActive.bind(this, InputFields[5])}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields[5].statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields[5].statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields[5].statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields[5])}
                      onBlur={this.updateErrorMessage.bind(this, InputFields[5])}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields[5].statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields[5].statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields[5].statusId] == ERROR_STATUS ? this.props.errors[InputFields[5].errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/*  MM/YY  and CVV input end */}



            <View style={styles.btnContainer}>
              <Button
                primary
                onPress={this.addCard.bind(this)}
                title="SAVE"
                btnStyle={CommonStyles.BtnStyle}
                txtStyle={CommonStyles.BtnTxtStyle} />
            </View>
          </View>
        </Content>
      </Screen >

    );
  }

  updateActive(inputField) {
    const { dispatch } = this.props;
    dispatch(updateInputStatus(
      {
        prop: inputField.statusId,
        value: ACTIVE_STATUS
      }
    )
    )
  }

  updateInputFieldValue(inputField, value) {
    const { dispatch } = this.props;
    if (inputField.id === InputFields[1]['id']) { // phone number adding dash
      if (value.length == 3 || value.length == 7) value += '-';
      if (value.length > 12) return;
    } else if (inputField.id === InputFields[2]['id']) { // zip code limitaion    
      if (value.length > 5) return;
    } else if (inputField.id === InputFields[3]['id']) { // card number adding space
      if (value.length == 4 || value.length == 9 || value.length == 14) value += ' ';
      if (value.length > 19) return;
    } else if (inputField.id === InputFields[4]['id']) { // MM / YY adding /
      if (value.length == 1 && (Number(value) > 1)) value = "0" + value;

      if (value.length == 2) {
        if (Number(value[1]) > 2) value = "01/"
        else
          value += '/';
      }
      if (value.length > 5) return;
    } else if (inputField.id === InputFields[5]['id']) { // cvv
      if (value.length > 4) return;
    }

    dispatch(updateMemberFormField({ prop: inputField.id, value })).then(() => {
      dispatch(updateInputStatus(
        {
          prop: inputField.statusId,
          value: this.validateValue(inputField.id, this.props[inputField.id]) ? ACTIVE_STATUS : SUCCESS_STATUS
        }
      )
      )
    })
  }

  updateErrorMessage(inputField) {
    const { dispatch } = this.props;
    dispatch(
      updateErrorMessage({
        prop: inputField.errorId,
        value: this.validateValue(inputField.id, this.props[inputField.id])
      })
    );
    dispatch(
      updateInputStatus({
        prop: inputField.statusId,
        value: this.validateValue(inputField.id, this.props[inputField.id]) ? ERROR_STATUS : SUCCESS_STATUS
      })
    );
  }

  validateValue(inputElementName, value) {
    if (inputElementName == InputFields[4].id) return mmyyValidator(inputElementName, value);
    return validator(inputElementName, value);
  }
  disableSaveButton() {
    const { inputStatus } = this.props;
    console.log("++++++++++", inputStatus)
    for (let inputStatu in inputStatus) {
      if (inputStatus.hasOwnProperty(inputStatu)) {
        console.log("++++++++++", inputStatus[inputStatu])
        if (inputStatus[inputStatu] != SUCCESS_STATUS) {

          return true;

        }
      }
    }
    return false;
  }

}


const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingTop: 30

  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    height: 50,
    marginTop: 10
  },
  rowSubContainerLeft: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50
  },
  rowSubContainerRight: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50
  },
  btnContainer: {
    flex: 1,
    marginTop: 50,
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 20,
    marginTop: 3,
    marginBottom: 10
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 0
  }
});

export default connect(mapStateToProps)(CreditCardForm);