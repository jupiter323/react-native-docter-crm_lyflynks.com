import React from "react";
import Screen from "../../common/componentLib/Screen";
import MemberSettingsForm from './MemberSettingsForm/MemberSettingsForm';

class MemberSettingsScreen extends React.Component {


  renderNextScreen() {

  }
  render() {

    return (
      <Screen
        navigation={this.props.navigation}
        title="MEMBER SETTINGS"
        back={true}
      >
        <MemberSettingsForm
        />
      </Screen>
    );
  }
}

export default MemberSettingsScreen;

