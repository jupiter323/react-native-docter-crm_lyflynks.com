import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Content } from 'native-base';
import { Screen, Input, Button } from 'componentsLib';
import Stripe from 'react-native-stripe-api'
import { STRIPE_API_KEY } from './apiKey';
import { deviceWidth } from 'styles/Theme';
import CommonStyles from 'styles/CommonStyles';
import InputFields from "./inputFieldsConfig";
import {
  UPDATE_INPUT_STATUS
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
      email: "",
      custommer_id: "test_custommer",
      firstname: "Jone",
      lastname: "Doe",
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
            <Input //name input
              style={CommonStyles.InputNormalStatus}
              placeholder="Full Name (As it appears on Card) "
            />

            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <Input
                  style={[CommonStyles.InputNormalStatus, { marginLeft: 0 }]}
                  placeholder="Phone Number"
                />
              </View>
              <View style={styles.rowSubContainerRight}>
                <Input
                  style={[CommonStyles.InputNormalStatus, { marginRight: 0 }]}
                  placeholder="Zip"
                />
              </View>
            </View>

            <View style={CommonStyles.wrapperBox} />

            <Input // card number input
              style={CommonStyles.InputNormalStatus}
              onChangeText={(number) => this.setState({ number })}
              placeholder="Card Number"
            />


            <View style={styles.rowContainer}>
              <View style={styles.rowSubContainerLeft}>
                <Input //exp month and year input
                  style={[CommonStyles.InputNormalStatus, { marginLeft: 0 }]}
                  onChangeText={(expmonth) => this.setState({ expmonth })}
                  placeholder="MM / YY"
                />

              </View>
              <View style={styles.rowSubContainerRight}>
                <Input //cvc input
                  style={[CommonStyles.InputNormalStatus, { marginRight: 0 }]}
                  onChangeText={(cvc) => this.setState({ cvc })}
                  placeholder="CVV"
                />
              </View>
            </View>


            {/* <Input style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
              onChangeText={(expyear) => this.setState({ expyear })}
              placeholder="18"
            /> */}

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
}


const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 25,
    paddingTop: 30
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    height: 50
  },
  rowSubContainerLeft: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50
  },
  rowSubContainerRight: {
    width: '40%',
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
  }
});

export default connect(mapStateToProps)(CreditCardForm);