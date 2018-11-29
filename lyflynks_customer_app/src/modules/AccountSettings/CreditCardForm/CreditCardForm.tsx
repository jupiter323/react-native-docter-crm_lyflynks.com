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
import { validator } from "util/validator";
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
      token_id: ""
    }
  }

  addCard() {
    const client = new Stripe(STRIPE_API_KEY);
    const tokenFormData = {
      number: this.state.number,
      exp_month: this.state.expmonth,
      exp_year: this.state.expyear,
      cvc: this.state.cvc
    }
    const token = client.createToken(tokenFormData).then((res) => {
      alert(JSON.stringify(res.id));
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
            <View key={InputFields.name.id} style={styles.inputContainer}>
              <View key={InputFields.name.id} style={styles.inputSubContainer}>
                <Input
                  placeholder={InputFields.name.placeholder}
                  value={this.props[InputFields.name.id]}
                  onFocus={this.updateActive.bind(this, InputFields.name)}
                  style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.name.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.name.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                  onChangeText={this.updateInputFieldValue.bind(this, InputFields.name)}
                  onBlur={this.updateErrorMessage.bind(this, InputFields.name)}
                />

                <View style={styles.inputIconContainerStyle}>
                  {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.name.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? this.props.errors[InputFields.name.errorId] : null}
                </Text>
              </View>
            </View>
            {/* name input end */}


            {/* phone and zip input start */}
            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <View key={InputFields.phone.id} style={styles.inputContainer}>
                  <View key={InputFields.phone.id} style={styles.inputSubContainer}>
                    <Input //phone number input          
                      placeholder={InputFields.phone.placeholder}
                      value={this.props[InputFields.phone.id]}
                      onFocus={this.updateActive.bind(this, InputFields.phone)}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.phone.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.phone.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields.phone)}
                      onBlur={this.updateErrorMessage.bind(this, InputFields.phone)}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.phone.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? this.props.errors[InputFields.phone.errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowSubContainerRight}>
                <View key={InputFields.phone.id} style={styles.inputContainer}>
                  <View key={InputFields.phone.id} style={styles.inputSubContainer}>
                    <Input //zip code input        
                      placeholder={InputFields.zip.placeholder}
                      value={this.props[InputFields.phone.id]}
                      onFocus={this.updateActive.bind(this, InputFields.phone)}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.phone.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.phone.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields.phone)}
                      onBlur={this.updateErrorMessage.bind(this, InputFields.phone)}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.phone.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? this.props.errors[InputFields.phone.errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* phone and zip input end */}
            <View style={CommonStyles.wrapperBox} />


            {/* card number input start */}
            <View key={InputFields.name.id} style={styles.inputContainer}>
              <View key={InputFields.name.id} style={styles.inputSubContainer}>
                <Input // card number input
                  placeholder={InputFields.card.placeholder}
                  value={this.props[InputFields.name.id]}
                  onFocus={this.updateActive.bind(this, InputFields.name)}
                  style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.name.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.name.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                  onChangeText={this.updateInputFieldValue.bind(this, InputFields.name)}
                  onBlur={this.updateErrorMessage.bind(this, InputFields.name)}
                />          

                <View style={styles.inputIconContainerStyle}>
                  {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.name.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {this.props.inputStatus[InputFields.name.statusId] == ERROR_STATUS ? this.props.errors[InputFields.name.errorId] : null}
                </Text>
              </View>
            </View>
            {/* card number input end */}


            {/* MM/YY  and CVV input start */}
            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <View key={InputFields.phone.id} style={styles.inputContainer}>
                  <View key={InputFields.phone.id} style={styles.inputSubContainer}>
                    <Input // MM/YY number input          
                      placeholder={InputFields.mmyy.placeholder}
                      value={this.props[InputFields.phone.id]}
                      onFocus={this.updateActive.bind(this, InputFields.phone)}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.phone.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.phone.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields.phone)}
                      onBlur={this.updateErrorMessage.bind(this, InputFields.phone)}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.phone.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? this.props.errors[InputFields.phone.errorId] : null}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowSubContainerRight}>
                <View key={InputFields.phone.id} style={styles.inputContainer}>
                  <View key={InputFields.phone.id} style={styles.inputSubContainer}>
                    <Input //CVV code input        
                      placeholder={InputFields.cvv.placeholder}
                      value={this.props[InputFields.phone.id]}
                      onFocus={this.updateActive.bind(this, InputFields.phone)}
                      style={[{ marginLeft: 0 }, this.props.inputStatus[InputFields.phone.statusId] == NORMAL_STATUS ? CommonStyles.InputNormalStatus : this.props.inputStatus[InputFields.phone.statusId] == ACTIVE_STATUS ? CommonStyles.InputActiveStatus : this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? CommonStyles.InputErrorStatus : CommonStyles.InputActiveStatus]}
                      onChangeText={this.updateInputFieldValue.bind(this, InputFields.phone)}
                      onBlur={this.updateErrorMessage.bind(this, InputFields.phone)}
                    />

                    <View style={styles.inputIconContainerStyle}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[InputFields.phone.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
                    </View>
                  </View>
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      {this.props.inputStatus[InputFields.phone.statusId] == ERROR_STATUS ? this.props.errors[InputFields.phone.errorId] : null}
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
    if (value.length == 3 || value.length == 7) value += '-';
    if (value.length == 13) return;
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
    return validator(inputElementName, value);
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
    height: 10,
    marginTop: 5,
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