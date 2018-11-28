import React from "react";
import { View, StyleSheet } from "react-native";
import { Content } from 'native-base';
import { Screen, Input, Button } from 'componentsLib';
import Stripe from 'react-native-stripe-api'
import { STRIPE_API_KEY } from './apiKey';
import { deviceWidth } from 'styles/Theme';

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

        <Content>
          {/* <View style={{ width: deviceWidth, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{marginRight:25, marginLeft:0,width:deviceWidth -50}}>
              <Input style={{
                height: 50, backgroundColor: "#fff", borderWidth: 0, width: "100%", color: "#000", shadowRadius: 6, shadowOffset: {
                  width: 0,
                  height: 3
                },
                elevation: 4,
                borderRadius: 25,
              }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingRight: 25 }}>
              <Input style={{ width: deviceWidth / 3, backgroundColor: 'gray', height: 40, marginLeft: 0 }} />
              <Input style={{ width: deviceWidth / 3, backgroundColor: 'gray', height: 40, marginRight: 0 }} />
            </View>


            <View>

            </View> */}

            <Input

              style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
              onChangeText={(number) => this.setState({ number })}
              placeholder="4242424242424242"

            />

            <Input style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
              onChangeText={(expmonth) => this.setState({ expmonth })}
              placeholder="09"
            />
            <Input style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
              onChangeText={(expyear) => this.setState({ expyear })}
              placeholder="18"
            />
            <Input style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
              onChangeText={(cvc) => this.setState({ cvc })}
              placeholder="111"
            />

            <View style={styles.btnContainer}>
              <Button primary onPress={this.addCard.bind(this)} title="SAVE" btnStyle={styles.BtnStyle} txtStyle={styles.BtnTxtStyle} />
            </View>
          {/* </View> */}
        </Content>

      </Screen>

    );
  }
}


const styles = StyleSheet.create({
  btnContainer: {
    // flex: 1,
    marginTop: 20,
    marginBottom: 30
  },
  BtnStyle: {
    backgroundColor: "#00A68C",
    width: '100%',
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 25,
    zIndex: 0,
    shadowOpacity: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 1,
    elevation: 2,
  },
  BtnTxtStyle: {
    fontSize: 17,
    fontFamily: 'Avenir'
  },

});

export default CreditCardForm;

