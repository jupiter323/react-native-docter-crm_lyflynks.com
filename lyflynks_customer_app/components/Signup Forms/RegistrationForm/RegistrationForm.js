import React, { Component } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from "../../UI";
import { validator } from "../index";
import InputFields from "./inputFieldsConfig.json";
import Roles from "./rolesConfig.json";
import {
  updateMemberFormField,
  updateErrorMessage
} from "../../../actions/member_form";

import ImageButton from "../../../components/ImageButton";

const mapStateToProps = state => {
  return { ...state.member_form };
};

class RegistrationForm extends React.Component {

  async componentDidMount() {  
      
    AsyncStorage.getItem('isLogin') 
    .then((res) => { 
      if(res!=null){
        console.log('logged page');
      //  this.props.navigation.navigate("MemberLogin");
      }else{
       // this.props.navigation.navigate("MemberLogin");
        console.log('logg in page' );
      }
    }); 

  }


  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
          > 
            <Card containerStyle={styles.formFieldsContainer}>
              {this.renderInputFields()}
              <Text style={styles.pickerLabel}>Select your Role</Text>
              {this.renderPicker()}
              <ImageButton/>
                <Button
                  style={styles.nextBtn}
                  title="Next"
                  fontWeight= 'bold'
                  fontFamily='Avenir' 
                  buttonStyle={{
                    backgroundColor: "#00A68C",
                    width: '100%',
                    height: 50,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 25,
                   // elevation: 3,
                    marginBottom:5,
                    zIndex:0,
                  }}
                  textStyle={{
                    fontSize:18 ,  
                    fontFamily:'Avenir',
                    fontWeight:'bold'
                  }}
                  containerStyle={{ marginTop: 20 }}
                  onPress={proceedAhead} 
                /> 
            </Card>
          </ScrollView> 
    );
  }

  renderInputFields() {
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          <View key={input.id} style={styles.inputContainer}>
            <Input
              value={this.props[input.id]}
              placeholder={input.placeholder}
              style={styles.input}
              setReference={this.bindReferenceToInputFields.bind(this, input)}
              focusNextInput={this.focusNextInput.bind(
                this,
                InputFields,
                index
              )}
              onChangeText={this.updateInputFieldValue.bind(this, input.id)}
              onBlur={this.updateErrorMessage.bind(this, input)}
            />
            <Text style={styles.errorMessage}>
            {this.props.errors[input.errorId]}
            </Text>
          </View>
        </View>
      );
    });
  }
//{this.props.errors[input.errorId]}
  bindReferenceToInputFields(inputField, inputElement) {
    this[inputField.id] = inputElement;
  }

  getNextInputFieldReference(InputFields, indexOfCurrentFocusedElement) {
    return InputFields.length - 1 === indexOfCurrentFocusedElement
      ? null
      : InputFields[indexOfCurrentFocusedElement + 1].id;
  }

  focusNextInput(InputFields, indexOfCurrentFocusedElement) {
    const nextInputFieldReference = this.getNextInputFieldReference(
      InputFields,
      indexOfCurrentFocusedElement
    );
    nextInputFieldReference !== null
      ? this[nextInputFieldReference].focus()
      : "";
  }

  updateInputFieldValue(inputFieldId, value) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: inputFieldId, value }));
  }

  validateValue(inputElementName, value) {
    return validator(inputElementName, value);
  }

  updateErrorMessage(inputField) {
    const { dispatch } = this.props;
    dispatch(
      updateErrorMessage({
        prop: inputField.errorId,
        value: this.validateValue(inputField.id, this.props[inputField.id])
      })
    );
  }

  renderPickerItems(roles) {
    return roles.map(role => {
      return (
        <Picker.Item label={role.title} value={role.role} key={role.role} />
      );
    });
  }

  renderPicker() {
    const { dispatch, role } = this.props;
    return (
      <Picker
      style={styles.Picker}
        selectedValue={role}
        onValueChange={this.setSelectedRole.bind(this)}
      >
        {this.renderPickerItems(ROLES)}
      </Picker>
    );
  }

  setSelectedRole(selectedRole) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: "role", value: selectedRole }));
  }

  disableNextButton() {
    const { errors } = this.props;
    for (let errorId in errors) {
      if (errors.hasOwnProperty(errorId)) {
        if (errors[errorId]) {
          return true;
        }
      }
    }
    return false;
  }
}

const ROLES = Roles["roles"];

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: "center"
  },
  btnIcon:{
    position:"absolute",
    right:0
  },
  Picker:{
    marginLeft:20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  nextBtn:{
    borderRadius: 10,
    shadowOpacity: 5, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5, 
    elevation: 10,
  },
  input: {
    height: 50, 
    backgroundColor: "#fff",
    borderColor: "#00A68C",
    borderWidth: 1,
    width: "90%",
    color:"#000",
    shadowRadius: 5, 
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 2 ,
    borderRadius:25
  },
  inputContainer: {
    justifyContent: "center",
    height: 83,
    alignItems: "center"
  },
  formFieldsContainer: {
    width: "100%"
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft:20
  },
  pickerLabel: {
    textAlign: "center",
    fontSize: 18,
    color:'#000'
  }
});

// export { RegistrationForm };

export default connect(mapStateToProps)(RegistrationForm);

// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage
// } from "react-native-elements";

{
  /* <FormLabel>{input.placeholder}</FormLabel>
          <FormInput
            value={this.props[input.id]}
            ref={this.bindReferenceToInputFields.bind(this, input)}
            onChangeText={this.updateInputFieldValue.bind(this, input.id)}
            onBlur={this.updateErrorMessage.bind(this, input)}
            onSubmitEditing={this.focusNextInput.bind(this, InputFields, index)}
            shake={this.props.errors[input.errorId]}
          />
          <FormValidationMessage>
            {this.props.errors[input.errorId]}
          </FormValidationMessage> */
}
