import React from 'react';
import MemberInviteScreen from '../screens/MemberInviteScreen';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<MemberInviteScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
