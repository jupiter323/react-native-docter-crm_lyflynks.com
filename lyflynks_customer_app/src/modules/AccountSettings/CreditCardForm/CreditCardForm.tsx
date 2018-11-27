import React from "react";
import { View, StyleSheet } from "react-native";
import { Content } from 'native-base';
import { Screen } from 'componentsLib';

import {  TextInput, Button } from 'react-native';
import Stripe from 'react-native-stripe-api'
import { STRIPE_API_KEY } from './apiKey';

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
      console.log(res.id);
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
          <TextInput style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
            onChange={(number) => this.setState({ number })}
            placeholder="4242424242424242"
          />
          <TextInput style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
            onChange={(expmonth) => this.setState({ expmonth })}
            placeholder="09"
          />
          <TextInput style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
            onChange={(expyear) => this.setState({ expyear })}
            placeholder="18"
          />
          <TextInput style={{ margin: 25, backgroundColor: 'gray', height: 40 }}
            onChange={(cvc) => this.setState({ cvc })}
            placeholder="111"
          />
          <Button
            title="Add card"
            onPress={this.addCard.bind(this)}
          />

        </Content>

      </Screen>

    );
  }
}


const styles = StyleSheet.create({

});

export default CreditCardForm;

