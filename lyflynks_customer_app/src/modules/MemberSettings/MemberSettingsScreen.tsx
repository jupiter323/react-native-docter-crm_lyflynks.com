import React from "react";
import { View } from "react-native";
import Screen from "../../common/componentLib/Screen";
import MemberSettingsForm from './MemberSettingsForm/MemberSettingsForm';
import INSTRUCTIONS_FOR_REGISTRATION_FORM from './../Auth/Signup Forms/InviteOthersForm/instructions';
import CommonStyles from 'styles/CommonStyles';

class MemberSettingsScreen extends React.Component {

  renderInstructions() {

  }
  renderNextScreen() {

  }
  render() {
  
    return (
      <Screen
        navigation={this.props.navigation}
        title="MEMBER SETTINGS"
        back={true}
      >
        <View style={CommonStyles.normalPage}>
          <MemberSettingsForm
            instructions={INSTRUCTIONS_FOR_REGISTRATION_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        </View>
      </Screen>

    );
  }
}

export default MemberSettingsScreen;

